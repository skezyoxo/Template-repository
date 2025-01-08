# Next.js Authentication Template

A modern, production-ready template for Next.js applications with built-in authentication, user management, and role-based access control.

## Features

- 🔐 **Authentication**
  - Email/Password authentication
  - OAuth (GitHub) integration
  - Session management
  - Protected routes
  - Role-based access control

- 🎨 **UI/UX**
  - Modern, responsive design
  - Dark mode support
  - Loading states
  - Error handling
  - Toast notifications
  - Form validation

- 🛠 **Technical Stack**
  - Next.js 14 (App Router)
  - TypeScript
  - Prisma (Database ORM)
  - NextAuth.js (Authentication)
  - Tailwind CSS (Styling)
  - Zod (Validation)

- 🔧 **Development**
  - ESLint configuration
  - Prettier formatting
  - Husky pre-commit hooks
  - Jest testing setup
  - VSCode configuration

## Getting Started

1. Clone this template:
   ```bash
   git clone https://github.com/skezyoxo/Template-repository
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your values:
   - Generate AUTH_SECRET: `openssl rand -base64 32`
   - Set up GitHub OAuth (see below)
   - Configure your database URL

4. Set up the database:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## GitHub OAuth Setup

1. Go to GitHub Developer Settings
2. Create a new OAuth App
3. Set Homepage URL to `http://localhost:3000`
4. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
5. Copy Client ID and Client Secret to your `.env` file

## Environment Variables

Required environment variables:
- \`DATABASE_URL\`: Your PostgreSQL database URL
- \`AUTH_SECRET\`: Random string for session encryption
- \`GITHUB_ID\`: GitHub OAuth Client ID
- \`GITHUB_SECRET\`: GitHub OAuth Client Secret

## Database Schema

The template includes:
- User management
- Role-based access control
- Session handling
- OAuth account linking

See \`prisma/schema.prisma\` for the complete schema.

## Authentication Flows

1. **Email/Password**
   - Sign up with email, password, and name
   - Sign in with email and password
   - Password hashing with bcryptjs

2. **OAuth (GitHub)**
   - One-click sign in
   - Account linking
   - Profile synchronization

## Customization

1. **Branding**
   - Update app name in \`app/layout.tsx\`
   - Modify theme in \`tailwind.config.js\`
   - Replace icons and logos

2. **Database**
   - Modify \`prisma/schema.prisma\` for your models
   - Update seed data in \`prisma/seed.ts\`

3. **Authentication**
   - Add more OAuth providers in \`app/auth.ts\`
   - Modify user roles in database seed
   - Customize protected routes in middleware

## Project Structure

```
├── app/                  # Next.js app router
│   ├── api/             # API routes
│   ├── auth/            # Auth pages
│   └── dashboard/       # Protected routes
├── components/          # React components
├── lib/                 # Utilities
├── prisma/             # Database setup
└── public/             # Static files
```

## Contributing

Contributions are welcome! Please read our contributing guidelines.

## License

MIT License - feel free to use this template for any project.

## Support

If you find this template helpful, please give it a star ⭭
