# oFraud - Web 

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Coverage](https://img.shields.io/badge/coverage-85%25-yellowgreen)
---

## Descripción

Este repositorio contiene todo lo relacionado con la página **web** del proyecto **oFraud**, una plataforma web y móvil enfocada en la **seguridad de los usuarios**, permitiendo realizar **reportes de fraude** en sitios y páginas web.

![Login page](https://raw.githubusercontent.com/EmmanuelLopz/admin-ofraud/main/readme_images/login.png)

![Dashboard page](https://raw.githubusercontent.com/EmmanuelLopz/admin-ofraud/main/readme_images/dashboard.png)

![Reports page](https://raw.githubusercontent.com/EmmanuelLopz/admin-ofraud/main/readme_images/reports.png)


En este repositorio nos enfocamos en la cosntrucción de una página web para los adminsitradores, en la cuál podrán ver todos los reportes dentro de la aplicación, revisar la información de todos los usuarios, tener acceso a datos y gráficas relevantes dentro de la aplicación, ver y crear categorías, así como la posibilidad de aceptar o rechazar reportes. 

El repositorio incluye:
* **Frontend**: represenación grafica de los datos dentro de la aplicación así como la posibilidad de interactuar con los mismos mediante la integración con el backend.
* **Arquitectura por componentes**: se decidió realizar una arquitectura por componentes para salvar código dentro de la aplicación.

---

## Tecnologías y versiones recomendadas
- **Next.js**: v16.0.0
- **React**: v19.2.0
- **Tailwind CSS**: v4.1
- **Node.js**: >=18.x
- **npm**: >=9.x
> Todas estas dependencias se instalan usando npm.

---

## Instalación

Sigue estos pasos para poner en marcha la aplicación localmente:

```bash
# Clonar el repositorio
git clone https://github.com/etxsA/backend-ofraud.git
cd backend-ofraud

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales y configuraciones

# Instalar paquetes necesarios
npm install

```
---

## Ejecución
```bash
$ npm run dev

# or
$ yarn dev

# or
$ pnpm dev

# or
$ bun dev

# Abrir / acceder a la aplicación - puerto por defecto: 3000
- http://localhost:3001/
```
----

## Uso

Pasa su uso se debe tener el [`backend`](https://github.com/etxsA/backend-ofraud$0)  de esta aplicación funcionando, y corriendo de forma local en la computadora en la cual se intentará correr este proyecto. 

Cuando se intente correr este proyecto la primera pantalla será el inicio de sesión de administrador, se pueden referir a la documentación de nuestro proyecto para obtener acceso a las credenciales del administrador. 

Posterior a haber iniciado sesión se podrá realizar lo siguientes:
- Consultar graficás y datos relevantes
- Consultar Usuarios de la aplicación
- Consultar Reportes subídos a la aplicación
- Aceptar o Rechazar reportes de la aplicación
- Consultar herramientas extra para administradores

---

## Estructura del Proyecto

```bash
admin-ofraud/
│
├── README.md               # Readme de la app
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── src/                    # Ruta principal del sistema
│   │  
│   ├── app/                # Clases de frontend principales
│   │   
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── wrappers/           # Clase de autenticación
│
├── tailwind.config.ts      # Extención de estilos
└── tsconfig.json
```

---

## Variables de Entorno

| Variable        | Descripción | Valor de ejemplo / Notas |
| --------------- | ----------- | ------------------------ |
| NEXT_PUBLIC_GEMINI_API_KEY | Api Key a utilizar para modelos de Gemini |       AIzaSyABCDEFGH1234567890abcdefghijklmno            |
| NEXT_PUBLIC_API_URL | Url utilizada para el Backend | http://localhost:3001|

Puedes copiar el ejemplo, asegurate de utilizar el API Key de Gemini. (La implementación del agente no es segura para un entorno de producción).

```bash
cp .env.example .env
```

---

## Contribución

Instrucciones para contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit (`git commit -m 'Descripción del cambio'`)
4. Push (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

---
## Fuentes de información
- Visit the [NEXT Documentation](https://nextjs.org/docs) to learn more about the framework.
- Visit the [React Documentation](https://react.dev/) to learn more about the framework.
- Visit the [tawilwind Documentation](https://tailwindcss.com/) to learn more about the framework.

---
## Colaboradores
- https://github.com/etxsA
- https://github.com/David-Brnb
- https://github.com/EmmanuelLopz

