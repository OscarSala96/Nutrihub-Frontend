export interface FoodResult {
  id: string;
  label: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  quantity?: number;
}

export const ESPANA_MOCK_FOODS: FoodResult[] = [
  // ==========================================
  // --- MOCKS ORIGINALES (BÁSICOS) -----------
  // ==========================================
  { id: 'esp-1', label: 'Arroz Integral', kcal: 350, protein: 7.5, carbs: 74, fat: 2.6 },
  { id: 'esp-2', label: 'Arroz Blanco', kcal: 360, protein: 6.8, carbs: 79, fat: 0.6 },
  { id: 'esp-3', label: 'Pasta Integral (Macarrones/Espaguetis)', kcal: 340, protein: 12, carbs: 65, fat: 2.5 },
  { id: 'esp-4', label: 'Pan Integral de Trigo', kcal: 250, protein: 9, carbs: 43, fat: 2.1 },
  { id: 'esp-5', label: 'Copos de Avena Integral', kcal: 365, protein: 13.5, carbs: 58.5, fat: 7 },
  { id: 'esp-6', label: 'Patatas / Papas Cocidas', kcal: 85, protein: 2, carbs: 19, fat: 0.1 },
  { id: 'esp-7', label: 'Boniato / Camote Asado', kcal: 100, protein: 1.6, carbs: 23, fat: 0.2 },
  { id: 'esp-8', label: 'Pechuga de Pollo a la plancha', kcal: 145, protein: 31, carbs: 0, fat: 2.2 },
  { id: 'esp-9', label: 'Tacos de Ternera Magra', kcal: 130, protein: 22, carbs: 0, fat: 4.5 },
  { id: 'esp-10', label: 'Lomo de Cerdo Adobado', kcal: 150, protein: 20, carbs: 1, fat: 6.5 },
  { id: 'esp-11', label: 'Salmón a la plancha', kcal: 200, protein: 22, carbs: 0, fat: 12 },
  { id: 'esp-12', label: 'Lomo de Merluza al horno', kcal: 90, protein: 18, carbs: 0, fat: 1.8 },
  { id: 'esp-13', label: 'Lomo de Bacalao Noruego', kcal: 80, protein: 17.5, carbs: 0, fat: 0.8 },
  { id: 'esp-14', label: 'Huevo Entero (Hervido/Cocido)', kcal: 155, protein: 13, carbs: 1.1, fat: 11 },
  { id: 'esp-15', label: 'Lata de Atún al Natural', kcal: 100, protein: 23, carbs: 0, fat: 0.6 },
  { id: 'esp-16', label: 'Queso Fresco de Burgos', kcal: 100, protein: 10, carbs: 3.5, fat: 4.5 },
  { id: 'esp-17', label: 'Yogur Griego Natural (Sin azúcar)', kcal: 115, protein: 4, carbs: 3.2, fat: 10 },
  { id: 'esp-18', label: 'Leche Entera Vaca', kcal: 62, protein: 3.2, carbs: 4.7, fat: 3.5 },
  { id: 'esp-19', label: 'Leche Semidesnatada Vaca', kcal: 45, protein: 3.3, carbs: 4.8, fat: 1.6 },
  { id: 'esp-20', label: 'Queso Batido 0% Hacendado', kcal: 46, protein: 8, carbs: 3.5, fat: 0.1 },
  { id: 'esp-21', label: 'Aceite de Oliva Virgen Extra (AOVE)', kcal: 884, protein: 0, carbs: 0, fat: 100 },
  { id: 'esp-22', label: 'Aguacate Fresco', kcal: 160, protein: 2, carbs: 8.5, fat: 15 },
  { id: 'esp-23', label: 'Nueces Peladas', kcal: 650, protein: 15, carbs: 14, fat: 65 },
  { id: 'esp-24', label: 'Almendras Al natural', kcal: 580, protein: 21, carbs: 22, fat: 49 },
  { id: 'esp-25', label: 'Garbanzos Pedrosillanos Cocidos', kcal: 140, protein: 8.5, carbs: 20, fat: 2.5 },
  { id: 'esp-26', label: 'Lentejas Pardinas Cocidas', kcal: 116, protein: 9, carbs: 20, fat: 0.4 },
  { id: 'esp-27', label: 'Manzana Golden', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  { id: 'esp-28', label: 'Plátano de Canarias', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  { id: 'esp-29', label: 'Fresas de Huelva', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
  { id: 'esp-30', label: 'Espinacas Frescas', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: 'esp-31', label: 'Tomate de Ensalada', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },

  // ==========================================
  // --- PRODUCTOS HACENDADO (MERCADONA) ------
  // ==========================================
  { id: 'hac-01', label: 'Yogur Proteínas +Proteínas Fresa (Hacendado)', kcal: 57, protein: 10, carbs: 4, fat: 0.1 },
  { id: 'hac-02', label: 'Yogur Proteínas +Proteínas Arándanos (Hacendado)', kcal: 58, protein: 10, carbs: 4.1, fat: 0.1 },
  { id: 'hac-03', label: 'Natillas Proteínas Sabor Vainilla +Proteínas (Hacendado)', kcal: 78, protein: 10, carbs: 7, fat: 1.1 },
  { id: 'hac-04', label: 'Gelatina 0% de Frutos Rojos (Hacendado)', kcal: 39, protein: 1.8, carbs: 7.8, fat: 0.1 },
  { id: 'hac-05', label: 'Claras de Huevo Pasteurizadas (Hacendado)', kcal: 44, protein: 11, carbs: 0.5, fat: 0 },
  { id: 'hac-06', label: 'Cereal Copos de Trigo Integral y Arroz (Hacendado)', kcal: 377, protein: 9.3, carbs: 77, fat: 2.1 },
  { id: 'hac-07', label: 'Cereal Avena Crunchy +Proteínas (Hacendado)', kcal: 390, protein: 30, carbs: 47, fat: 5.3 },
  { id: 'hac-08', label: 'Crema de Cacahuete 100% Crunchy o Suave (Hacendado)', kcal: 618, protein: 25, carbs: 13, fat: 50 },
  { id: 'hac-09', label: 'Tiras de Pechuga de Pollo al Natural (Hacendado)', kcal: 107, protein: 23, carbs: 1.2, fat: 1.1 },
  { id: 'hac-10', label: 'Tiras de Pollo Asado (Hacendado)', kcal: 141, protein: 25.2, carbs: 0.8, fat: 4.1 },
  { id: 'hac-11', label: 'Salmón Ahumado Noruego (Hacendado)', kcal: 174, protein: 22.4, carbs: 0.5, fat: 9.3 },
  { id: 'hac-12', label: 'Pan de Molde Integral 100% Sin Azúcares (Hacendado)', kcal: 224, protein: 9.5, carbs: 38, fat: 2.2 },
  { id: 'hac-13', label: 'Pan Tostado Fibra y Sésamo (Hacendado)', kcal: 391, protein: 13, carbs: 59, fat: 8.5 },
  { id: 'hac-14', label: 'Leche Desnatada Calcio (Hacendado)', kcal: 36, protein: 3.4, carbs: 4.8, fat: 0.1 },
  { id: 'hac-15', label: 'Queso Rallado Light Mozzarella (Hacendado)', kcal: 218, protein: 28, carbs: 2, fat: 11 },
  { id: 'hac-16', label: 'Pechuga de Pavo Bajo en Sal 92% (Hacendado)', kcal: 92, protein: 19, carbs: 1, fat: 1.2 },
  { id: 'hac-17', label: 'Jamón Cocido Extra 92% (Hacendado)', kcal: 105, protein: 20, carbs: 0.8, fat: 2.4 },
  { id: 'hac-18', label: 'Tortitas de Arroz Integral (Hacendado)', kcal: 385, protein: 7.9, carbs: 80, fat: 2.8 },
  { id: 'hac-19', label: 'Tortitas de Maíz (Hacendado)', kcal: 387, protein: 6.7, carbs: 82, fat: 2.8 },
  { id: 'hac-20', label: 'Edamame Congelado en Vaina (Hacendado)', kcal: 132, protein: 11, carbs: 9.2, fat: 4.6 },
  { id: 'hac-21', label: 'Arándanos Congelados (Hacendado)', kcal: 50, protein: 0.6, carbs: 10.1, fat: 0.6 },
  { id: 'hac-22', label: 'Mezcla de Setas Congeladas (Hacendado)', kcal: 24, protein: 2, carbs: 1.8, fat: 0.4 },
  { id: 'hac-23', label: 'Garbanzos en conserva Lavados (Hacendado)', kcal: 101, protein: 5.6, carbs: 12.8, fat: 1.9 },
  { id: 'hac-24', label: 'Gnoquis de Patata Frescos (Hacendado)', kcal: 154, protein: 3.5, carbs: 32.6, fat: 0.4 },
  { id: 'hac-25', label: 'Hummus de Garbanzos Clásico (Hacendado)', kcal: 231, protein: 6.9, carbs: 13, fat: 16 },

  // ==========================================
  // --- LÁCTEOS Y PROTEICOS FITNESS ---------
  // ==========================================
  { id: 'fit-01', label: 'Queso Protein Cottage Cheese (Arla)', kcal: 90, protein: 14, carbs: 1.8, fat: 3 },
  { id: 'fit-02', label: 'Pudding Proteico Chocolate High Protein (Ehrmann)', kcal: 76, protein: 10, carbs: 5.5, fat: 1.5 },
  { id: 'fit-03', label: 'Pudding Proteico Vainilla High Protein (Ehrmann)', kcal: 76, protein: 10, carbs: 5.5, fat: 1.5 },
  { id: 'fit-04', label: 'Bebida Láctea Proteica Chocolate (Ypro / Danone)', kcal: 59, protein: 10, carbs: 4.6, fat: 0.1 },
  { id: 'fit-05', label: 'Yogur Líquido Pro目標 Sabor Stracciatella (Nestlé)', kcal: 65, protein: 9, carbs: 6.1, fat: 0.5 },

  // ==========================================
  // --- VEGETALES, PLANT-BASED Y VEGANO ------
  // ==========================================
  { id: 'veg-01', label: 'Tofu Firme Bio (Hacendado)', kcal: 116, protein: 12.5, carbs: 1.5, fat: 6.2 },
  { id: 'veg-02', label: 'Heura Bocados Originales (Plant-Based)', kcal: 126, protein: 18, carbs: 1.9, fat: 3.1 },
  { id: 'veg-03', label: 'Bebida de Almedras Sin Azúcar (Alpro)', kcal: 13, protein: 0.4, carbs: 0, fat: 1.1 },
  { id: 'veg-04', label: 'Bebida de Soja Alta en Proteína (Alpro)', kcal: 42, protein: 3.8, carbs: 2.5, fat: 1.5 },
  { id: 'veg-05', label: 'Bebida de Avena Sin Azúcar (Alpro)', kcal: 40, protein: 0.2, carbs: 7.3, fat: 0.8 },
  { id: 'veg-06', label: 'Soja Texturizada Fina (Hacendado)', kcal: 364, protein: 50, carbs: 15, fat: 4 },
  { id: 'veg-07', label: 'Seitán Biológico Soria Natural', kcal: 120, protein: 24, carbs: 2.3, fat: 1.3 },

  // ==========================================
  // --- EMBUTIDOS FINOS Y CONSERVAS ESPAÑA ---
  // ==========================================
  { id: 'con-01', label: 'Jamón Serrano Gran Reserva Curado', kcal: 230, protein: 31, carbs: 0.5, fat: 11 },
  { id: 'con-02', label: 'Lomo Embuchado de Cerdo Cebo', kcal: 215, protein: 36, carbs: 1, fat: 7.5 },
  { id: 'con-03', label: 'Pechuga de Pollo en Lata al Natural (Frinsa)', kcal: 121, protein: 27, carbs: 0, fat: 1.4 },
  { id: 'con-04', label: 'Berberechos al Natural en Conserva', kcal: 78, protein: 16, carbs: 1, fat: 1 },
  { id: 'con-05', label: 'Mejillones en Escabeche Bajos en Sal', kcal: 154, protein: 14, carbs: 4, fat: 9 },

  // ==========================================
  // --- SUPLEMENTACIÓN DEPORTIVA ------------
  // ==========================================
  { id: 'sup-01', label: 'Proteína de Suero Whey 100% (Sabor Chocolate)', kcal: 390, protein: 78, carbs: 5.5, fat: 6 },
  { id: 'sup-02', label: 'Proteína de Suero Whey 100% (Sabor Vainilla)', kcal: 395, protein: 80, carbs: 4.8, fat: 5.2 },
  { id: 'sup-03', label: 'Harina de Avena Saborizada (Gofre Chocolate)', kcal: 360, protein: 12.5, carbs: 62, fat: 6.3 },
  { id: 'sup-04', label: 'Barrita Proteica BARR-Ex Low Carb', kcal: 350, protein: 32, carbs: 25, fat: 11 },


  // ==========================================
  // --- AVES Y HUEVOS (AMPLIADO) -------------
  // ==========================================
  { id: 'pro-01', label: 'Pechuga de Pavo fresca', kcal: 105, protein: 24, carbs: 0, fat: 1 },
  { id: 'pro-02', label: 'Solomillo de Pollo', kcal: 110, protein: 23, carbs: 0, fat: 1.2 },
  { id: 'pro-03', label: 'Contramuslo de Pollo (Sin piel)', kcal: 120, protein: 20, carbs: 0, fat: 4 },
  { id: 'pro-04', label: 'Muslo de Pollo (Con piel)', kcal: 184, protein: 17, carbs: 0, fat: 13 },
  { id: 'pro-05', label: 'Pechuga de Pollo rellena de queso (Hacendado)', kcal: 165, protein: 18, carbs: 2, fat: 9 },
  { id: 'pro-06', label: 'Pavo a la brasa (Lonchas Hacendado)', kcal: 98, protein: 21, carbs: 1, fat: 1.2 },
  { id: 'pro-07', label: 'Huevo de Gallina (Talla L)', kcal: 143, protein: 12.6, carbs: 0.7, fat: 9.5 },
  { id: 'pro-08', label: 'Clara de Huevo líquida (Hacendado)', kcal: 48, protein: 11, carbs: 0.7, fat: 0.1 },
  { id: 'pro-09', label: 'Yema de Huevo', kcal: 322, protein: 16, carbs: 0.3, fat: 26.5 },
  { id: 'pro-10', label: 'Huevo de Codorniz', kcal: 158, protein: 13, carbs: 0.4, fat: 11 },

  // ==========================================
  // --- CARNES ROJAS Y MAGRAS (AMPLIADO) ----
  // ==========================================
  { id: 'pro-11', label: 'Solomillo de Ternera', kcal: 115, protein: 21, carbs: 0, fat: 3.5 },
  { id: 'pro-12', label: 'Entrecot de Ternera', kcal: 165, protein: 20, carbs: 0, fat: 9.5 },
  { id: 'pro-13', label: 'Carne Picada de Vacuno 5% grasa', kcal: 125, protein: 21, carbs: 0, fat: 5 },
  { id: 'pro-14', label: 'Burger Meat Ternera (Hacendado)', kcal: 180, protein: 17, carbs: 2, fat: 12 },
  { id: 'pro-15', label: 'Solomillo de Cerdo', kcal: 112, protein: 22, carbs: 0, fat: 2.8 },
  { id: 'pro-16', label: 'Cinta de Lomo de Cerdo', kcal: 145, protein: 21, carbs: 0, fat: 6.8 },
  { id: 'pro-17', label: 'Filete de Hígado de Ternera', kcal: 135, protein: 20, carbs: 4, fat: 4.5 },
  { id: 'pro-18', label: 'Conejo troceado fresco', kcal: 133, protein: 22, carbs: 0, fat: 5 },

  // ==========================================
  // --- PESCADOS Y MARISCOS (AMPLIADO) -------
  // ==========================================
  { id: 'pro-19', label: 'Salmón Noruego (Corte lomo)', kcal: 208, protein: 20, carbs: 0, fat: 13 },
  { id: 'pro-20', label: 'Atún Claro fresco', kcal: 108, protein: 24, carbs: 0, fat: 1.1 },
  { id: 'pro-21', label: 'Emperador / Pez Espada', kcal: 115, protein: 19, carbs: 0, fat: 4.5 },
  { id: 'pro-22', label: 'Dorada a la plancha', kcal: 130, protein: 19, carbs: 0, fat: 6 },
  { id: 'pro-23', label: 'Lubina al horno', kcal: 98, protein: 18, carbs: 0, fat: 2.5 },
  { id: 'pro-24', label: 'Bacalao Desmigado Salado', kcal: 75, protein: 17, carbs: 0, fat: 0.7 },
  { id: 'pro-25', label: 'Langostinos Cocidos (Hacendado)', kcal: 95, protein: 21, carbs: 0, fat: 1.2 },
  { id: 'pro-26', label: 'Gambas Peladas Congeladas', kcal: 70, protein: 15, carbs: 0, fat: 1 },
  { id: 'pro-27', label: 'Pulpo Cocido (Hacendado)', kcal: 86, protein: 18, carbs: 0, fat: 1 },
  { id: 'pro-28', label: 'Sepia a la plancha', kcal: 80, protein: 17, carbs: 0.8, fat: 0.9 },
  { id: 'pro-29', label: 'Calamar troceado', kcal: 92, protein: 16, carbs: 0.7, fat: 1.4 },
  { id: 'pro-30', label: 'Gula del Norte (Anguriñas)', kcal: 165, protein: 10, carbs: 11, fat: 9 },

  // ==========================================
  // --- PROTEÍNA EN CONSERVA Y FIAMBRE ------
  // ==========================================
  { id: 'pro-31', label: 'Pechuga de Pollo en lata (Hacendado)', kcal: 121, protein: 26, carbs: 0.5, fat: 1.5 },
  { id: 'pro-32', label: 'Atún claro en aceite de oliva (Escurrido)', kcal: 190, protein: 26, carbs: 0, fat: 10 },
  { id: 'pro-33', label: 'Caballa en aceite de oliva (Hacendado)', kcal: 210, protein: 22, carbs: 0, fat: 14 },
  { id: 'pro-34', label: 'Sardinas en tomate (Hacendado)', kcal: 160, protein: 19, carbs: 1, fat: 9 },
  { id: 'pro-35', label: 'Queso fresco batido +Proteínas (Hacendado)', kcal: 54, protein: 10, carbs: 3.5, fat: 0.1 },
  { id: 'pro-36', label: 'Fiambre de Lomo de Pavo (Hacendado)', kcal: 85, protein: 17, carbs: 2, fat: 1 },
  { id: 'pro-37', label: 'Jamón Cocido Extra Lonchas (Hacendado)', kcal: 105, protein: 19, carbs: 1, fat: 3 },
  { id: 'pro-38', label: 'Cecina de León (Lonchas)', kcal: 250, protein: 38, carbs: 1, fat: 10 },
  { id: 'pro-39', label: 'Paleta Curada (Hacendado)', kcal: 240, protein: 29, carbs: 1, fat: 14 },
  { id: 'pro-40', label: 'Filete de Pechuga de Pollo al ajillo (Hacendado)', kcal: 130, protein: 22, carbs: 1, fat: 4 },
  { id: 'pro-41', label: 'Hamburguesa de Pollo y Espinacas (Hacendado)', kcal: 145, protein: 18, carbs: 2, fat: 7.5 }
];