# 🐌 Sistema de Carreras de Caracoles, Dashboard & Pasarela SnailPay (Full Stack)

<div align="center">

  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zustand-20232A?style=for-the-badge&logo=redux&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Recharts" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />

</div>

<br/>

Aplicación web **Full Stack** modular diseñada para la gestión de usuarios, visualización de estadísticas de apuestas con gráficas analíticas, panel de control interactivo, historial de transacciones y simulación de procesamiento de pagos mediante la pasarela **SnailPay**. El sistema cuenta con autenticación persistente, control de saldo inicializado en $0, gestión de estado global con **Zustand**, alternancia de temas (Modo Claro/Oscuro) y un backend robusto en **Express** con **Express-Validator** que maneja múltiples escenarios transaccionales de forma segura.

---

## ✨ Características Principales

- 🔐 **Autenticación y Gestión de Sesión:** Registro e inicio de sesión de usuarios con persistencia local gestionada mediante LocalStorage y Zustand.
- 💰 **Panel de Control Financiero ($0 Inicial):** Visualización en tiempo real del saldo del usuario, perfil y acceso directo a recargas de saldo.
- 📊 **Gráficas Analíticas Avanzadas (Recharts):**
  - **Gráfica Donut:** Visualización interactiva de apuestas ganadas vs. perdidas.
  - **Gráfica de Barras:** Histórico de victorias de los 6 caracoles compitiendo en carreras diarias.
- 💳 **Pasarela de Pago Simulada (SnailPay Mock):** Endpoints en el backend que simulan tres escenarios de pago obligatorios:
  - **Cobro exitoso** con emisión de códigos de autorización y referencias únicas.
  - **Error de transacción** por fondos insuficientes o tarjeta rechazada.
  - **Error del sistema** para simulación de fallas internas de servidor (Código 500).
- 📜 **Historial de Recargas en Tiempo Real:** Registro detallado y ordenado de transacciones asociadas al usuario activo.
- 🎨 **Soporte Completo de Modo Claro / Oscuro:** Sistema de diseño responsivo basado en Tailwind CSS v4, gestionado mediante `ThemeContext` y el componente modular `ThemeToggle`.
- 🛡️ **Validación Estricta de Datos:** Middleware backend con `express-validator` para prevenir peticiones mal formadas y validaciones locales en frontend con respuestas de usuario mediante **SweetAlert2**.

---

## 📂 Arquitectura del Proyecto

Este proyecto está estructurado como un monorepo dividido en cliente y servidor:

```text
fernando-1987/
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                     # Punto de entrada del servidor Express
│       ├── controllers/
│       │   └── snailPayController.ts    # Lógica transaccional de SnailPay (3 escenarios)
│       ├── interfaces/
│       │   └── snailPay.ts              # Contratos de tipos del backend
│       ├── middlewares/
│       │   └── validators/
│       │       └── snailPayValidator.ts # Reglas de validación con express-validator
│       └── routes/
│           └── snailPayRoutes.ts        # Rutas y endpoints para pagos SnailPay
│
├── frontend/
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── public/
│   │   └── icono.svg
│   └── src/
│       ├── main.tsx                     # Inicialización de React
│       ├── index.css                    # Estilos globales y tokens de tema Tailwind CSS v4
│       ├── Router.tsx                   # Rutas públicas, protegidas y página no encontrada (404)
│       ├── api/
│       │   └── axios.ts                 # Cliente Axios configurado para la API REST
│       ├── components/                  # Componentes de UI reutilizables
│       │   ├── ChartsSection.tsx        # Sección modular de gráficas analíticas
│       │   ├── Footer.css               # Estilos específicos para el pie de página
│       │   ├── Footer.tsx               # Pie de página de la aplicación
│       │   ├── Menu.tsx                 # Menú de navegación principal
│       │   ├── ProtectedRoute.tsx       # Guardián de rutas protegidas
│       │   ├── SnailPayModal.tsx        # Modal interactivo para recargas SnailPay
│       │   └── ThemeToggle.tsx          # Botón reutilizable de alternancia Claro/Oscuro
│       ├── context/
│       │   └── ThemeContext.tsx         # Gestión del tema global (Light/Dark)
│       ├── data/
│       │   └── charts.ts                # Dataset estático para renderizado de gráficas
│       ├── interfaces/                  # Contratos de tipos estrictos en TypeScript
│       │   ├── snailPay.ts
│       │   └── user.ts
│       ├── layouts/
│       │   └── Layout.tsx               # Layout base de la interfaz de usuario
│       ├── pages/                       # Vistas principales de la aplicación
│       │   ├── Dashboard.tsx            # Panel de control principal con resumen y saldo
│       │   ├── Login.tsx                # Vista de inicio de sesión
│       │   ├── NotFound.tsx             # Vista de manejo de rutas no encontradas (404)
│       │   ├── RechargesHistory.tsx     # Historial completo de recargas del usuario
│       │   └── Register.tsx             # Vista de registro de usuario
│       ├── stores/                      # Estado global con Zustand
│       │   ├── useRechargeStore.ts      # Historial persistente de recargas
│       │   └── useUserStore.ts          # Gestión de sesión, usuario y saldo
│       └── utils/
│           └── formUtils.ts             # Regex y funciones de validación de formularios
└── README.md
```

---

## 🛠️ Stack Tecnológico

### 🖥️ Frontend
* **Core:** React 19, TypeScript, Vite
* **Enrutamiento:** React Router DOM
* **Gestión de Estado:** Zustand (middleware `persist` para LocalStorage) y React Context API (`ThemeContext`)
* **Visualización de Datos:** Recharts (Gráficas tipo Donut y Barras)
* **Estilos & UI:** Tailwind CSS v4, Lucide React (Iconografía), SweetAlert2 (Alertas modales)
* **Peticiones HTTP:** Axios

### ⚙️ Backend
* **Entorno de Ejecución:** Node.js
* **Framework:** Express.js con TypeScript (`tsx`, `nodemon`)
* **Validación de Payload:** Express Validator
* **Seguridad & Middleware:** CORS, Dotenv

---

## 🚀 Guía de Instalación y Ejecución Local

Sigue estos pasos para poner en marcha el proyecto en tu máquina de desarrollo:

### Prerrequisitos
Asegúrate de contar con las siguientes herramientas instaladas:
* **Node.js** (v18.0.0 o superior)
* **npm** o **yarn**

---

### 1. Clonar el repositorio
```bash
git clone https://github.com/182day/fernando-1987.git
cd fernando-1987
```

### 2. Configurar y Ejecutar el Backend

```bash
# Entrar a la carpeta del servidor
cd backend

# Instalar dependencias
npm install
```

Edita el archivo `.env` en `backend/` con el puerto que deseas que se ejecute la api:
```env
PORT=5000
```

```bash
# Iniciar el backend en modo desarrollo con nodemon + tsx:
npm run dev
```

### 3. Configurar y Ejecutar el Frontend

Abre una **nueva terminal** y navega a la carpeta del frontend:

```bash
# Entrar a la carpeta del cliente
cd frontend

# Instalar dependencias
npm install
```

Edita el archivo `.env` en `frontend/` para conectar con el backend:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Iniciar el servidor de desarrollo del frontend:
npm run dev
```

Accede a la aplicación desde tu navegador en:
```bash
http://localhost:5173
```

---

## 💡 Decisiones Técnicas Destacadas

1. **Simulación Completa de Pasarela SnailPay:**
   Desarrollo de controladores dedicados (`snailPayController.ts`) que evalúan montos y números de tarjeta para retornar dinámicamente respuestas de **éxito**, **rechazo de transacción** o **error de sistema (500)**, cumpliendo con la estructura exacta exigida por el requerimiento.

2. **Diseño Modular y Principio DRY:**
   Creación de componentes reutilizables como `ThemeToggle.tsx` para abstraer la lógica de cambio de tema entre distintas vistas, y desacoplamiento de validaciones a middlewares independientes (`snailPayValidator.ts`).

3. **Arquitectura de Estado Global con Zustand:**
   Implementación de stores independientes para autenticación (`useAuthStore`), usuarios (`useUserStore`) e historial de transacciones (`useRechargeStore`), eliminando re-renders innecesarios y garantizando la persistencia limpia en LocalStorage.

4. **Experiencia de Usuario Interactiva (UX):**
   Formateo automático en tiempo real para campos del formulario (como auto-insertar la barra `/` en la fecha de vencimiento `MM/YY`) e integración de alertas modales con **SweetAlert2** para confirmaciones previas y retroalimentación de transacciones.

5. **Integración Nativa con Tailwind CSS v4:**
   Uso directo de la directiva `@theme` en `index.css` para el registro de tokens de diseño y variables CSS semánticas, facilitando una alternancia instantánea entre el modo Claro y Oscuro.

---

## 📬 Contacto

¿Te interesa mi perfil o quieres discutir sobre este proyecto? ¡Hablemos!

* 💼 **LinkedIn:** [Fernando Contreras de la Garza](https://www.linkedin.com/in/fernando-contreras-de-la-garza-11a0a1242/)
* ✉️ **Email:** fers.delagarza@gmail.com
* 🌐 **Portafolio:** [fer.agc.com.mx](https://fer.agc.com.mx)
* 🐙 **GitHub:** [182day](https://github.com/182day)

---
<div align="center">
  Hecho con 🐌 y mucho café por Fernando Contreras de la Garza
</div>