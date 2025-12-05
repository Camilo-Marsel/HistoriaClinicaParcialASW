# Sistema de Gestión de Historias Clínicas - Parcial Práctico

Sistema web para la gestión de historias clínicas en hospitales, desarrollado con **GraphQL**, **React**, **MongoDB** y **Docker**.

## Características Técnicas

- ✅ **GraphQL API**: Apollo Server con queries y mutations
- ✅ **Frontend Moderno**: React 18 + Apollo Client
- ✅ **Base de Datos**: MongoDB con Mongoose ODM
- ✅ **Contenedorización**: Docker y Docker Compose
- ✅ **Formato JSON**: Respuestas en formato JSON
- ✅ **GraphQL Playground**: Interfaz para pruebas y documentación

## Estructura del Proyecto

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Configuración de MongoDB
│   │   ├── graphql/
│   │   │   ├── typeDefs.js         # Definición de tipos GraphQL
│   │   │   └── resolvers.js        # Resolvers de queries y mutations
│   │   ├── models/
│   │   │   ├── Patient.js          # Modelo de Paciente
│   │   │   ├── Doctor.js           # Modelo de Doctor
│   │   │   └── MedicalRecord.js    # Modelo de Historia Clínica
│   │   └── app.js                  # Aplicación principal con Apollo Server
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Componentes Reutilizables
│   │   │   ├── Button.jsx
│   │   │   ├── FormContainer.jsx
│   │   │   ├── FormSection.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MedicalRecordCard.jsx
│   │   │   ├── MedicalRecordForm.jsx
│   │   │   ├── MedicalRecordsList.jsx
│   │   │   ├── SearchCedulaForm.jsx
│   │   │   ├── SelectInput.jsx
│   │   │   ├── StatusMessage.jsx
│   │   │   ├── TextAreaInput.jsx
│   │   │   └── TextInput.jsx
│   │   ├── hooks/                  # Hooks Personalizados
│   │   │   └── useMedicalForm.js
│   │   ├── pages/
│   │   │   └── MedicalRecordsPage.jsx  # Página principal - Gestión de historias clínicas
│   │   ├── styles/                 # Estilos Centralizados
│   │   │   └── theme.js
│   │   ├── utils/                  # Funciones Auxiliares
│   │   │   ├── validation.js       # Validaciones
│   │   │   └── formatters.js       # Formateo de datos
│   │   ├── config/
│   │   │   └── apolloClient.js     # Cliente Apollo
│   │   ├── graphql/
│   │   │   └── queries.js          # Queries y Mutations GraphQL
│   │   ├── App.jsx                 # Componente principal
│   │   └── main.jsx                # Punto de entrada con ApolloProvider
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── docker-compose.yml              # Orquestación de contenedores
├── README.md                        # Este archivo

```
## Inicio 

### Requisitos Previos

- Node.js 18+
- Docker & Docker Compose
- MongoDB Atlas (cuenta gratuita en [mongodb.com](https://www.mongodb.com))
- Git

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd tu-proyecto
```

### 2. Configurar MongoDB Atlas

1. **Crear una cuenta en MongoDB Atlas**:
   - Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Crear un cluster**:
   - Crea un cluster M0 (gratuito)
   - Anota el nombre del cluster

3. **Crear usuario de base de datos**:
   - En "Database Access", crea un usuario
   - Guarda el usuario y contraseña

4. **Obtener la URI de conexión**:
   - En "Databases", haz clic en "Connect"
   - Selecciona "Drivers"
   - Copia la URI de conexión (MongoDB for Node.js)

### 3. Configurar Variables de Entorno

#### Backend

```bash
# Copiar archivo de ejemplo
cp backend/.env.example backend/.env

# Editar backend/.env con tu MONGO_URI
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/software-arch?retryWrites=true&w=majority
```


##  Ejecutar con Docker

```bash
# Iniciar Docker Desktop primero (Windows)

# Construir imágenes
docker-compose build

# Levantar todos los servicios (Backend, Frontend, MongoDB)
docker-compose up -d

# Ver logs
docker-compose up -d

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f mongodb

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (datos de MongoDB)
docker-compose down -v
```

**Acceso a la aplicación**:
- **Frontend**: http://localhost:3001
- **Backend GraphQL**: http://localhost:3000/graphql
- **Health Check**: http://localhost:3000/api/v1/health
- **MongoDB**: localhost:27017 (admin/admin123)
## Inicio 

### Requisitos Previos

- Node.js 18+
- Docker & Docker Compose
- MongoDB Atlas (cuenta gratuita en [mongodb.com](https://www.mongodb.com))
- Git

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd tu-proyecto
```

### 2. Configurar MongoDB Atlas

1. **Crear una cuenta en MongoDB Atlas**:
   - Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Crear un cluster**:
   - Crea un cluster M0 (gratuito)
   - Anota el nombre del cluster

3. **Crear usuario de base de datos**:
   - En "Database Access", crea un usuario
   - Guarda el usuario y contraseña

4. **Obtener la URI de conexión**:
   - En "Databases", haz clic en "Connect"
   - Selecciona "Drivers"
   - Copia la URI de conexión (MongoDB for Node.js)

### 3. Configurar Variables de Entorno

#### Backend

```bash
# Copiar archivo de ejemplo
cp backend/.env.example backend/.env

# Editar backend/.env con tu MONGO_URI
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/software-arch?retryWrites=true&w=majority
```


##  Ejecutar con Docker

```bash
# Iniciar Docker Desktop primero (Windows)

# Construir imágenes
docker-compose build

# Levantar todos los servicios (Backend, Frontend, MongoDB)
docker-compose up -d

# Ver logs
docker-compose up -d

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f mongodb

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (datos de MongoDB)
docker-compose down -v
```

**Acceso a la aplicación**:
- **Frontend**: http://localhost:3001
- **Backend GraphQL**: http://localhost:3000/graphql
- **Health Check**: http://localhost:3000/api/v1/health
- **MongoDB**: localhost:27017 (admin/admin123)

