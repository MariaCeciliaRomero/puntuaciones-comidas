# Puntuaciones de Comidas — Backend

API REST desarrollada con Node.js, Express y MongoDB, utilizando el patrón de arquitectura MVC (Modelo-Vista-Controlador).

El proyecto permite gestionar locales gastronómicos, registrar comidas y consultar las puntuaciones realizadas por los usuarios.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- dotenv

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión con autenticación JWT.
- Consulta y registro de locales gastronómicos.
- Consulta y registro de comidas.
- Registro de puntuaciones de 1 a 5 estrellas.
- Consulta de opiniones y puntuaciones.
- Cálculo del promedio de puntuación de cada comida.
- Modificación y eliminación de puntuaciones propias.
- Prevención de puntuaciones duplicadas por usuario y comida.

## Estructura del proyecto

```text
puntuaciones-comidas/
├── config/
│   └── db.js
├── controllers/
│   ├── comidaController.js
│   ├── localController.js
│   ├── puntuacionController.js
│   └── usuarioController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── Comida.js
│   ├── Local.js
│   ├── Puntuacion.js
│   └── Usuario.js
├── routes/
│   ├── comidaRoutes.js
│   ├── localRoutes.js
│   ├── puntuacionRoutes.js
│   └── usuarioRoutes.js
├── .env.example
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js y npm.
- MongoDB Community Server, o una instancia compatible de MongoDB.
- Git.

MongoDB Compass es opcional y permite visualizar los datos mediante una interfaz gráfica.

## Instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/MariaCeciliaRomero/puntuaciones-comidas.git
```

**2. Ingresar al proyecto**

```bash
cd puntuaciones-comidas
```

**3. Instalar las dependencias**

```bash
npm install
```

**4. Configurar las variables de entorno**

Crear un archivo `.env` en la raíz del proyecto utilizando `.env.example` como referencia.

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/puntuaciones_comidas
JWT_SECRET=REEMPLAZAR_CON_UNA_CLAVE_SECRETA_SEGURA
```

Generar una clave JWT aleatoria y reemplazar el valor de ejemplo.

La clave secreta no debe publicarse en GitHub.

### Generar una clave secreta JWT

Para que la autenticación funcione, es necesario configurar `JWT_SECRET` con una clave secreta segura.

Podés generar una clave aleatoria desde la terminal con Node.js:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

El comando genera una cadena hexadecimal aleatoria de 64 caracteres.

Copiá el resultado y utilizalo como valor de `JWT_SECRET` dentro del archivo `.env`:

```dotenv
JWT_SECRET=TU_CLAVE_GENERADA
```

**Importante:** nunca compartas la clave real ni subas el archivo `.env` a GitHub. El archivo `.env.example` solamente debe contener valores de ejemplo.

**5. Iniciar MongoDB**

Comprobar que MongoDB esté funcionando y que el servidor pueda conectarse mediante la URL configurada.

**6. Ejecutar el backend**

### Ejecutar el backend

Para ejecutar el proyecto en modo desarrollo, con reinicio automático del servidor:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

El servidor estará disponible en:

```text
http://localhost:3000
```

Antes de ejecutarlo, asegurate de que MongoDB esté funcionando y de haber configurado las variables de entorno.

## Endpoints de la API

### Locales

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/locales` | Consultar locales |
| POST | `/api/locales` | Registrar un local |

### Comidas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/comidas` | Consultar comidas |
| POST | `/api/comidas` | Registrar una comida |

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/usuarios/registro` | Registrar un usuario |
| POST | `/api/usuarios/login` | Iniciar sesión |
| GET | `/api/usuarios/perfil` | Probar una ruta protegida |

### Puntuaciones

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/puntuaciones` | Consultar puntuaciones |
| GET | `/api/puntuaciones/promedio/:comidaId` | Consultar promedio de una comida |
| POST | `/api/puntuaciones` | Registrar una puntuación |
| PUT | `/api/puntuaciones/:id` | Modificar una puntuación propia |
| DELETE | `/api/puntuaciones/:id` | Eliminar una puntuación propia |

Las operaciones POST, PUT y DELETE de puntuaciones requieren autenticación mediante JWT.

El cliente debe incluir el token en la cabecera:

```http
Authorization: Bearer TOKEN_JWT
```

## Ejemplo de puntuación

```json
{
  "comida": "ID_DE_LA_COMIDA",
  "valor": 5,
  "comentario": "Muy rica"
}
```

El identificador del usuario se obtiene del token JWT validado por el servidor.

## Base de datos

MongoDB utiliza cuatro colecciones principales:

- `usuarios`: información de las cuentas.
- `locales`: establecimientos gastronómicos.
- `comidas`: comidas asociadas a locales.
- `puntuaciones`: calificaciones y comentarios asociados a usuarios y comidas.

Los documentos se relacionan mediante identificadores `ObjectId`.

La base de datos local no está incluida en el repositorio. Para probar las consultas es necesario cargar datos propios a través de la API o MongoDB Compass.

## Estado del proyecto

Backend en desarrollo.

Pendiente de completar: validaciones adicionales, permisos de administración, documentación más detallada y mejoras de seguridad antes del despliegue público.

## Autor

[MariaCeciliaRomero](https://github.com/MariaCeciliaRomero)