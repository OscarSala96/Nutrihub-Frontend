# NutriHub Frontend

Frontend de **NutriHub**, una plataforma web de gestión nutricional que conecta a nutricionistas con sus pacientes. La aplicación permite gestionar pacientes, consultar dietas y realizar un seguimiento de la evolución mediante una interfaz orientada a facilitar el trabajo diario del nutricionista y el acceso del paciente a su información.

Este proyecto forma parte de una aplicación Full Stack cuyo backend está desarrollado con NestJS.

## ✨ Funcionalidades

### 👨‍⚕️ Área del nutricionista
- Gestión y consulta de pacientes.
- Acceso a la información individual de cada paciente.
- Consulta y gestión de dietas.
- Seguimiento de la evolución y del progreso de los pacientes.

### 🧑‍💻 Área del paciente
- Acceso a su perfil personal.
- Consulta de las dietas asignadas.
- Registro y consulta de su evolución.
- Acceso a su información personal desde su propia cuenta.

### 🔐 Autenticación
- Registro e inicio de sesión.
- Integración con el sistema de autenticación de Supabase.
- Acceso a funcionalidades según el tipo de usuario.
- Comunicación con el backend mediante peticiones HTTP.

## 🛠️ Tecnologías

- **Next.js** — Framework de React para el desarrollo de aplicaciones web.
- **React** — Construcción de interfaces mediante componentes reutilizables.
- **TypeScript** — Tipado estático para mejorar la mantenibilidad del código.
- **REST API** — Comunicación con el backend desarrollado con NestJS.

## 🏗️ Arquitectura

La aplicación frontend se encarga de la interfaz de usuario, la navegación y la interacción con los servicios de backend.

La comunicación entre ambas partes sigue una arquitectura cliente-servidor:

- **Frontend:** interfaz web y experiencia de usuario.
- **Backend:** API REST desarrollada con NestJS, encargada de la lógica de negocio y las operaciones con los datos.
- **Autenticación:** Supabase Auth.

El backend es responsable de validar las operaciones y controlar los permisos de acceso a los datos.

## ⚙️ Instalación y ejecución

### Requisitos previos

- Node.js.
- npm.
- Acceso al backend de NutriHub.

### 1. Clonar el repositorio

```bash
git clone https://github.com/OscarSala96/Nutrihub-Frontend.git
cd Nutrihub-Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crea el archivo de entorno que utilice el proyecto (`.env.local`, por ejemplo) y configura las variables necesarias para conectar el frontend con el backend y los servicios de autenticación.

```env
# URL base de la API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Iniciar en desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000` en el navegador, siempre que el puerto predeterminado esté disponible.

### 5. Generar una compilación de producción

```bash
npm run build
npm run start
```

## 🔗 Backend

El frontend utiliza la API REST de NutriHub para gestionar la información de usuarios, pacientes, dietas y seguimiento.

Repositorio: [Nutrihub Backend](https://github.com/OscarSala96/Nutrihub-backend)

## 📌 Estado del proyecto

NutriHub es un proyecto Full Stack en desarrollo cuyo objetivo es ofrecer una plataforma de gestión nutricional con funcionalidades diferenciadas para nutricionistas y pacientes.
