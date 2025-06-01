# AI-Powered Recruitment Platform

A modern, full-stack recruitment platform built with Next.js, React, TypeScript, and GraphQL. This monorepo contains both the frontend and backend applications.

## 🚀 Features

- **Frontend**: Next.js 14 with React, TypeScript, Tailwind CSS, and Apollo Client
- **Backend**: Node.js with Express, Apollo Server (GraphQL), and TypeScript
- **Authentication**: JWT-based authentication for candidates and companies
- **Responsive Design**: Modern UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **GraphQL API**: Efficient data fetching with Apollo

## 📁 Project Structure

```
AI-Powered Recruitment Platform/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable React components
│   │   └── lib/            # Utilities and configurations
│   ├── package.json
│   └── README.md
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── index.ts        # Main server file
│   │   ├── models/         # Database models
│   │   ├── resolvers/      # GraphQL resolvers
│   │   └── schemas/        # GraphQL schemas
│   ├── package.json
│   └── README.md
└── README.md               # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd AI-Powered\ Recruitment\ Platform
```

2. **Install dependencies for both frontend and backend**
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Set up environment variables**
```bash
# Backend environment
cd backend
cp .env.example .env
# Edit .env with your configuration

# Frontend environment (if needed)
cd ../frontend
# Create .env.local if needed
```

4. **Start development servers**

In one terminal (backend):
```bash
cd backend
npm run dev
```

In another terminal (frontend):
```bash
cd frontend
npm run dev
```

The applications will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **GraphQL Playground**: http://localhost:4000/graphql

## 🔧 Development

### Frontend Development
- Built with Next.js 14 (App Router)
- Styled with Tailwind CSS
- State management with Apollo Client
- Form validation with React Hook Form and Zod

### Backend Development
- Express.js with Apollo Server
- GraphQL API
- JWT authentication
- MongoDB integration ready

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

This monorepo can be deployed as separate applications:

- **Frontend**: Deploy to Vercel, Netlify, or any static hosting
- **Backend**: Deploy to Railway, Heroku, DigitalOcean, or any Node.js hosting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details. 