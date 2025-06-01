# AI-Powered Recruitment Platform - Backend

This is the backend API for the AI-Powered Recruitment Platform, built with Node.js, Express, Apollo Server (GraphQL), and TypeScript.

## Features

- 🚀 GraphQL API with Apollo Server
- 🔐 JWT Authentication
- 📊 TypeScript for type safety
- 🛡️ Security middleware (Helmet, CORS)
- 🗄️ MongoDB integration ready
- 📧 Email notifications ready
- 🤖 AI/ML integration ready

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration values.

4. Start development server:
```bash
npm run dev
```

The server will start at `http://localhost:4000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## API Endpoints

### GraphQL Endpoint
- **URL**: `http://localhost:4000/graphql`
- **Playground**: Available in development mode

### REST Endpoints
- **Health Check**: `GET /health`

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/recruitment-platform
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts          # Main server file
│   ├── models/           # Database models
│   ├── resolvers/        # GraphQL resolvers
│   ├── schemas/          # GraphQL schemas
│   ├── middleware/       # Custom middleware
│   └── utils/           # Utility functions
├── dist/                # Compiled JavaScript
├── package.json
└── tsconfig.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 