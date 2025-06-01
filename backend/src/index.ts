import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4000;

// Basic GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
  
  type User {
    id: ID!
    email: String!
    userType: UserType!
    createdAt: String!
  }
  
  enum UserType {
    CANDIDATE
    COMPANY
  }
`;

// Basic resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello from AI-Powered Recruitment Platform API!',
  },
};

async function startServer() {
  // Create Express app
  const app = express();

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));

  // CORS configuration
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  }));

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // Apply Apollo GraphQL middleware
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Add authentication context here later
      return {
        user: req.headers.authorization ? 'authenticated-user' : null,
      };
    },
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
    console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

// Start the server
startServer().catch((error) => {
  console.error('Error starting server:', error);
  process.exit(1);
}); 