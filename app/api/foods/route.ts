import { NextResponse } from 'next/server';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

type FatSecretFood = {
  food_id?: string;
  food_name?: string;
  food_description?: string;
};

type FoodResult = {
  id: string;
  label: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
};

function parseMacro(description: string | undefined, labels: string[]): number {
  if (!description) return 0;
  const pattern = `(?:${labels.join('|')}):\\s*([\\d.,]+)`;
  const match = description.match(new RegExp(pattern, 'i'));
  if (!match) return 0;
  return Number(match[1].replace(',', '.')) || 0;
}

function normalizeFood(food: FatSecretFood): FoodResult {
  const description = food.food_description ?? '';
  return {
    id: food.food_id ? `fs-${food.food_id}` : (food.food_name ?? crypto.randomUUID()),
    label: food.food_name ?? 'Alimento sin nombre',
    kcal: Math.round(parseMacro(description, ['Calorías', 'Calories'])),
    protein: parseMacro(description, ['Proteína', 'Protein']),
    carbs: parseMacro(description, ['Carbs', 'Carbohydrate']),
    fat: parseMacro(description, ['Grasa', 'Fat']),
  };
}

async function getFatSecretToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedToken && tokenExpiresAt > now + 30000) return cachedToken;

  const clientId = process.env.FATSECRET_CLIENT_ID;
  const clientSecret = process.env.FATSECRET_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  try {
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenResponse = await fetch('https://oauth.fatsecret.com/connect/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=basic',
    });

    if (!tokenResponse.ok) return null;
    const tokenData = await tokenResponse.json();
    cachedToken = tokenData.access_token;
    tokenExpiresAt = Date.now() + tokenData.expires_in * 1000;
    return cachedToken;
  } catch {
    return null;
  }
}

function getMockFoods(query: string): FoodResult[] {
  const mockDatabase: FoodResult[] = [
    { id: 'mock-1', label: 'Pechuga de Pollo Hacendado (Mercadona)', kcal: 111, protein: 23, carbs: 0, fat: 2.1 },
    { id: 'mock-2', label: 'Pan de Molde Integral 100% Hacendado', kcal: 235, protein: 8.5, carbs: 41, fat: 2.5 },
    { id: 'mock-3', label: 'Claras de Huevo Pasteurizadas Hacendado', kcal: 49, protein: 11, carbs: 0.6, fat: 0 },
    { id: 'mock-4', label: 'Pollo Asado Genérico', kcal: 164, protein: 25, carbs: 0, fat: 6.5 },
    { id: 'mock-5', label: 'Arroz Integral Hacendado', kcal: 350, protein: 7.5, carbs: 72, fat: 2.8 },
    { id: 'mock-6', label: 'Queso Batido 0% Hacendado', kcal: 46, protein: 8, carbs: 3.5, fat: 0.1 }
  ];

  return mockDatabase.filter(food => 
    food.label.toLowerCase().includes(query.toLowerCase())
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');

  if (!query) {
    return NextResponse.json({ error: 'Falta el parámetro search' }, { status: 400 });
  }

  const cleanQuery = query.toLowerCase().trim().replace(/\s+/g, ' ');

  try {
    const accessToken = await getFatSecretToken();

    if (!accessToken) {
      console.log('⚠️ Sin token. Tirando de base de datos local.');
      return NextResponse.json(getMockFoods(cleanQuery));
    }

    const bodyParams = new URLSearchParams({
      method: 'foods.search',
      search_expression: cleanQuery,
      format: 'json',
      max_results: '10',
      region: 'ES',    
      language: 'es'   
    });

    const apiResponse = await fetch(`https://platform.fatsecret.com/rest/server.api?${bodyParams.toString()}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: ''
    });

    if (!apiResponse.ok) {
      console.log('⚠️ Servidor FatSecret inaccesible. Usando local.');
      return NextResponse.json(getMockFoods(cleanQuery));
    }

    const data = await apiResponse.json();

    if (data?.error) {
      console.warn(`🔒 Bloqueo o restricción de FatSecret (Código ${data.error.code}): ${data.error.message}. Usando local.`);
      return NextResponse.json(getMockFoods(cleanQuery));
    }

    const rawFoods = data?.foods?.food;
    const foods: FatSecretFood[] = Array.isArray(rawFoods) ? rawFoods : rawFoods ? [rawFoods] : [];

  
    const normalizedResults = foods.map(normalizeFood);
    
    
    const isAmericanDominant = normalizedResults.some(f => 
      f.label.toLowerCase().includes('walmart') || 
      f.label.toLowerCase().includes('goya') ||
      f.id.includes('us')
    );

    if (normalizedResults.length === 0 || (cleanQuery.includes('hacendado') && isAmericanDominant)) {
      console.log('Bypass activado: Se detectaron resultados de US en una búsqueda local. Sirviendo mockDatabase.');
      return NextResponse.json(getMockFoods(cleanQuery));
    }

    return NextResponse.json(normalizedResults);
  } catch (error) {
    console.error('Error en pasarela FatSecret, usando base local:', error);
    return NextResponse.json(getMockFoods(cleanQuery));
  }
}
