# Second Brain Private

A personal knowledge management system built with Next.js, TypeScript, and PostgreSQL.

## Overview

Second Brain Private is a secure and efficient personal knowledge management system that helps you organize, store, and retrieve your digital information. Built with modern web technologies and following best practices for security and scalability.

## Features

- 🔐 Secure user authentication and authorization
- 👥 Role-based access control
- 🌐 Modern, responsive interface
- 🎨 Dark/Light theme support
- 🚀 Built with performance in mind
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth
- **Deployment**: Vercel (recommended)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/skezyoxo/second-brain-private.git
   cd second-brain-private
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Update .env with your database credentials and other configurations
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Documentation

Comprehensive documentation is available in the [docs](./docs) directory:

- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [API Documentation](./docs/API.md) - API endpoints and usage
- [Database Documentation](./docs/DATABASE.md) - Database schema and relationships
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deployment instructions
- [Contributing Guidelines](./docs/CONTRIBUTING.md) - How to contribute

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/CONTRIBUTING.md) for details.

## License

[MIT License](LICENSE)

## Support

If you encounter any issues or have questions, please:
1. Check the [documentation](./docs)
2. Create an issue in the repository

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
