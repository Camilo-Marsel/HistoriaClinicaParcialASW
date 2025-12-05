const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
require('dotenv').config();

const connectDB = require('./config/database');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

// Middleware básico
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Crear Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // Habilitar introspección para GraphQL Playground
  playground: true, // Habilitar playground
});

// Iniciar Apollo Server
async function startServer() {
  await server.start();
  
  // Aplicar middleware de Apollo Server
  app.use('/graphql', expressMiddleware(server));

  // Health check endpoint
  app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Backend GraphQL is running',
      timestamp: new Date().toISOString(),
      graphqlEndpoint: '/graphql',
      documentation: 'Access /graphql for GraphQL Playground'
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found. Use /graphql for GraphQL endpoint',
      graphqlEndpoint: '/graphql'
    });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`Health check: http://localhost:${PORT}/api/v1/health`);
  });
}

startServer();

module.exports = app;
