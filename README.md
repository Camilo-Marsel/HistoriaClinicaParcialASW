# Sistema de Gestión de Historias Clínicas - Parcial Práctico

Sistema web para la gestión de historias clínicas en hospitales, desarrollado con **GraphQL**, **React**, **MongoDB** y **Docker**.

## Características Técnicas

- **GraphQL API**: Apollo Server con queries y mutations
- **Frontend Moderno**: React 18 + Apollo Client
- **Base de Datos**: MongoDB local con Mongoose ODM
- **Contenedorización**: Docker y Docker Compose
- **Formato JSON**: Respuestas en formato JSON
- **GraphQL Playground**: Interfaz para pruebas y documentación

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
│   │   ├── components/
│   │   │   └── Header.jsx          # Componente de encabezado
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Página principal
│   │   │   └── MedicalRecordsPage.jsx  # Gestión de historias clínicas
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
├── docker-compose.yml              # Orquestación de contenedores (Backend, Frontend, MongoDB)
└── README.md                        # Este archivo
```

## Requisitos Previos

- Node.js 18+
- Docker Desktop
- Docker Compose
- Git

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd HistoriaClinicaParcialASW
```

### 2. Configuración del Backend

El backend se conecta automáticamente a la base de datos MongoDB que se ejecuta en Docker. La configuración está definida en el archivo `docker-compose.yml`.

**Credenciales de MongoDB (ya configuradas):**
- Usuario: `admin`
- Contraseña: `admin123`
- Base de datos: `arch`
- Puerto: `27017`

### 3. Ejecutar con Docker

**Iniciar todos los servicios:**

```bash
# Iniciar Docker Desktop primero

# Construir las imágenes
docker-compose build

# Levantar todos los servicios (Backend, Frontend, MongoDB)
docker-compose up -d
```

**Verificar que los servicios estén corriendo:**

```bash
# Ver estado de los contenedores
docker-compose ps

# Ver logs del backend
docker-compose logs -f backend

# Ver logs de MongoDB
docker-compose logs -f mongodb

# Ver logs del frontend
docker-compose logs -f frontend
```

**Detener los servicios:**

```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (elimina los datos de la BD)
docker-compose down -v
```

## Acceso a la Aplicación

Una vez que los servicios estén ejecutándose, puedes acceder a:

- **Frontend**: http://localhost:3001
- **Backend GraphQL Playground**: http://localhost:3000/graphql
- **Health Check API**: http://localhost:3000/api/v1/health
- **MongoDB**: localhost:27017

## Uso de GraphQL Playground

### Acceder al Playground

Abre tu navegador y visita: http://localhost:3000/graphql

### Queries Disponibles

**Buscar historia clínica por cédula:**

```graphql
query {
  medicalHistoryByCedula(cedula: "123456789") {
    id
    motivoConsulta
    diagnostico
    tratamiento
    fecha
    patient {
      cedula
      nombre
      apellido
      edad
      genero
    }
    doctor {
      cedulaProfesional
      nombre
      especialidad
    }
  }
}
```

### Mutations Disponibles

**Crear un nuevo paciente:**

```graphql
mutation {
  createPatient(input: {
    cedula: "123456789"
    nombre: "Juan"
    apellido: "Pérez"
    edad: 35
    genero: "M"
  }) {
    id
    cedula
    nombre
    apellido
  }
}
```

**Crear un nuevo doctor:**

```graphql
mutation {
  createDoctor(input: {
    cedulaProfesional: "MED123456"
    nombre: "Dr. Carlos García"
    especialidad: "Medicina General"
  }) {
    id
    cedulaProfesional
    nombre
    especialidad
  }
}
```

**Crear una nueva historia clínica:**

```graphql
mutation {
  createMedicalHistory(input: {
    patientCedula: "123456789"
    doctorCedulaProfesional: "MED123456"
    motivoConsulta: "Dolor de cabeza"
    diagnostico: "Migraña"
    tratamiento: "Ibuprofeno 400mg cada 8 horas"
  }) {
    id
    motivoConsulta
    diagnostico
    tratamiento
    fecha
  }
}
```

## Conexión a MongoDB con MongoDB Compass

Para visualizar los datos en MongoDB Compass:

**Opción 1 - Conexión sin autenticación (desarrollo):**

```
mongodb://localhost:27017/arch
```

**Opción 2 - Conexión con autenticación:**

Usar el formulario manual en MongoDB Compass:
- Hostname: `localhost`
- Port: `27017`
- Authentication: Username/Password
- Username: `admin`
- Password: `admin123`
- Authentication Database: `admin`

## Arquitectura del Sistema

### Backend (Node.js + Express + Apollo Server)

El backend implementa una API GraphQL que expone:
- **Queries**: Para consultar información
- **Mutations**: Para crear y modificar datos
- **Resolvers**: Lógica de negocio que conecta con MongoDB

### Frontend (React + Apollo Client)

Interfaz de usuario que consume la API GraphQL para:
- Buscar historias clínicas por cédula
- Registrar nuevos pacientes
- Registrar nuevos doctores
- Crear historias clínicas

### Base de Datos (MongoDB)

Estructura de colecciones:
- **patients**: Información de pacientes
- **doctors**: Información de doctores
- **medicalhistories**: Historias clínicas con referencias a pacientes y doctores

## Solución de Problemas

### El puerto 3000 está en uso

```bash
# Detener todos los contenedores
docker-compose down

# O encontrar y detener el proceso usando el puerto
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### Los contenedores no inician correctamente

```bash
# Ver logs detallados
docker-compose logs

# Reconstruir las imágenes desde cero
docker-compose build --no-cache
docker-compose up -d
```

### MongoDB no muestra datos

```bash
# Verificar que MongoDB esté corriendo
docker-compose ps

# Ver logs de MongoDB
docker-compose logs mongodb

# Conectarse a MongoDB desde terminal
docker exec -it arch-mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

# Verificar bases de datos disponibles
show dbs

# Usar la base de datos del proyecto
use arch

# Ver colecciones
show collections

# Ver documentos en una colección
db.patients.find().pretty()
```

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, Apollo Server, GraphQL, Mongoose
- **Frontend**: React 18, Apollo Client, Vite
- **Base de Datos**: MongoDB
- **Contenedorización**: Docker, Docker Compose
- **Lenguaje**: JavaScript/JSX

## Autores

- Camilo Marsel Céspedes Areiza
- Claudia María Rocha Hernández

## Equipo

Equipo 6 - Parcial Práctico Arquitectura de Software

Universidad de Antioquia - 2024
