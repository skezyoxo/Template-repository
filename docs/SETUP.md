# Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- PostgreSQL (v14 or higher)
- Git

## Development Environment Setup

### 1. Code Editor Setup
We recommend using Visual Studio Code with the following extensions:
- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- GitLens (optional)

### 2. Project Setup
1. Clone the repository
   ```bash
   git clone https://github.com/skezyoxo/second-brain-private.git
   cd second-brain-private
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### 3. Database Setup

#### PostgreSQL Installation
1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)
2. During installation:
   - Remember the password you set for the postgres user
   - Keep the default port (5432)
   - Install all offered components

#### Create Database
1. Open pgAdmin (comes with PostgreSQL)
2. Create a new database:
   - Right-click on 'Databases'
   - Select 'Create' > 'Database'
   - Name it 'second_brain_db' (or your preferred name)

### 4. Environment Configuration
1. Create a `.env` file in the project root
2. Add the following configuration:
   ```env
   # Database connection
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/second_brain_db"

   # Replace:
   # USER with your PostgreSQL username (default: postgres)
   # PASSWORD with your PostgreSQL password
   # second_brain_db with your database name
   ```

### 5. Database Migration
1. Generate Prisma Client
   ```bash
   npx prisma generate
   ```

2. Run migrations
   ```bash
   npx prisma migrate dev
   ```

3. (Optional) Seed the database
   ```bash
   npx prisma db seed
   ```

### 6. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

## Common Issues and Solutions

### Database Connection Issues
1. **Error: Connection refused**
   - Check if PostgreSQL is running
   - Verify port number
   - Check credentials in `.env`

2. **Error: Database does not exist**
   - Create the database manually in pgAdmin
   - Check database name in connection string

### Prisma Issues
1. **Schema Changes Not Reflecting**
   ```bash
   npx prisma generate
   npx prisma migrate reset
   ```

2. **Migration History Conflicts**
   ```bash
   npx prisma migrate reset
   ```

### Node.js Issues
1. **Dependencies Not Found**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Version Incompatibility**
   - Check `package.json` for required versions
   - Use nvm (Node Version Manager) to switch Node versions

## Development Workflow

### 1. Making Changes
1. Create a new branch for your feature
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test locally
4. Commit changes with meaningful messages

### 2. Database Changes
1. Modify `schema.prisma`
2. Generate migration
   ```bash
   npx prisma migrate dev --name description_of_changes
   ```

### 3. Testing Changes
1. Run linting
   ```bash
   npm run lint
   ```

2. Test the application locally
3. Check for TypeScript errors
   ```bash
   npm run build
   ```

## Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs) 