# Tienda Antiestrés (CalmaPlus): Backend

API REST de una tienda en línea de productos antiestrés, con registro e inicio de sesión, catálogo de productos, mensajes de soporte y roles de usuario y administrador.

El frontend está en [Frontend-Tienda-Antiestres](https://github.com/Jorgelopez04/Frontend-Tienda-Antiestres).

<!-- Agrega aquí una captura de la API en Postman o un GIF de la tienda funcionando -->

## Tecnologías

- **Node.js**, **Express** y **TypeScript**
- **Clean Architecture**: capas de dominio, aplicación, infraestructura e interfaz
- **PostgreSQL** con **Prisma ORM**
- Autenticación con **JWT** y contraseñas cifradas con **bcrypt**
- Validación de datos con **Zod**
- Seguridad con **Helmet**, **CORS** y limitación de peticiones (**express-rate-limit**)
- Pruebas con **Jest** y **Supertest**

## Arquitectura

```
domain/           Entidades (User, Product, SupportMessage) y contratos de repositorio
application/      Casos de uso (registrar, iniciar sesión, CRUD de productos y mensajes)
infrastructure/   Repositorios con Prisma, JWT y cliente de base de datos
interface/        Rutas, controladores, middlewares y validaciones (Express)
prisma/           Esquema de la base de datos
scripts/          Crear administrador y cargar productos de ejemplo
```

## Endpoints

Todas las rutas usan el prefijo `/api/v1`.

| Recurso | Rutas | Notas |
| --- | --- | --- |
| Autenticación | `POST /auth/register`, `POST /auth/login` | Límite de 20 intentos cada 15 minutos |
| Productos | `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id` | Consultar es público; crear, editar y eliminar requieren rol `ADMIN` |
| Soporte | `POST /support`, `GET /support`, `GET /support/:id`, `PUT /support/:id`, `PUT /support/:id/read`, `DELETE /support/:id` | Cualquier visitante puede enviar un mensaje; leerlo, editarlo, marcarlo como leído y eliminarlo requiere rol `ADMIN` |
| Usuarios | `GET /users`, `GET /users/profile`, `PUT /users/:id/role` | Listar usuarios y cambiar roles requiere rol `ADMIN`; el perfil requiere sesión |
| Salud | `GET /health` | Estado del servicio |

Existen dos roles: `USER` y `ADMIN`. Hay un límite general de 100 peticiones cada 15 minutos.

## Cómo ejecutarlo

### Requisitos

- Node.js 20 o superior
- PostgreSQL

### Configuración

Copia `.env.example` a `.env` y completa los valores:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/calmaplus
JWT_SECRET=una_clave_larga_y_aleatoria
PORT=3000
```

### Instalación

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

Las migraciones están en `prisma/migrations/`. En un servidor de producción usa `npx prisma migrate deploy`.

### Desarrollo

```bash
npm run dev
```

La API queda en `http://localhost:3000`.

### Scripts útiles

```bash
npm run seed:products   # carga productos de ejemplo
npm run create:admin    # crea un administrador (usa ADMIN_EMAIL, ADMIN_NAME y ADMIN_PASS del entorno)
npm run build           # compila a JavaScript
npm start               # ejecuta la versión compilada
```

## Pruebas

```bash
npm test
```

Incluye pruebas de integración de la API con Jest y Supertest.

## Autor

[Jorge Steven López Arenas](https://github.com/Jorgelopez04)
