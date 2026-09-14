export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') ||
  'http://localhost:3000';

const TOKEN_KEYS = ['supabase_access_token', 'access_token', 'token'];

export type StoredUser = {
  id?: string;
  nombre?: string;
  name?: string;
  email?: string;
  role?: 'NUTRICIONISTA' | 'PACIENTE';
  [key: string]: unknown;
};

export type AuthResponse = {
  user: Record<string, unknown> | null;
  session: { access_token?: string; [key: string]: unknown } | null;
};

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;

  for (const key of TOKEN_KEYS) {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  }

  const savedSession = window.localStorage.getItem('session');
  if (savedSession) {
    try {
      const session = JSON.parse(savedSession) as { access_token?: string };
      return session.access_token ?? null;
    } catch {
      return null;
    }
  }

  return null;
}

export function saveAuthSession(
  response: AuthResponse,
  user: StoredUser,
): void {
  if (typeof window === 'undefined') return;

  const token = response.session?.access_token;
  if (token) {
    window.localStorage.setItem('supabase_access_token', token);
    window.localStorage.setItem('access_token', token);
    window.localStorage.setItem('session', JSON.stringify(response.session));
  }

  window.localStorage.setItem('user', JSON.stringify(user));
  window.dispatchEvent(new Event('user:login'));
}

export function clearAuthSession(): void {
  if (typeof window === 'undefined') return;

  ['user', 'session', ...TOKEN_KEYS].forEach((key) =>
    window.localStorage.removeItem(key),
  );
  window.dispatchEvent(new Event('user:logout'));
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAccessToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Error ${response.status}`;
    try {
      const payload = (await response.json()) as {
        message?: string | string[];
        error?: string;
      };
      if (Array.isArray(payload.message)) {
        message = payload.message.join(', ');
      } else if (payload.message || payload.error) {
        message = payload.message || payload.error || message;
      }
    } catch {
      // Keep the HTTP status when the backend does not return JSON.
    }
    throw new Error(message);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function getUserDisplayName(user: StoredUser | null): string {
  return user?.nombre || user?.name || user?.email || 'Usuario';
}
