# Deployment Guide

This document outlines the process for deploying the Second Brain application to different environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Deployment Options](#deployment-options)
- [Database Migration](#database-migration)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- Git
- Vercel CLI (optional, for Vercel deployment)
- react-hook-form (for form handling)

### Access Requirements
- GitHub repository access
- Database credentials
- Deployment platform credentials
- Environment variables

## Environment Setup

### 1. Environment Variables
Copy `.env.example` and configure for your environment:
```bash
# Production database
DATABASE_URL=postgresql://user:password@production-host:5432/db_name

# API Configuration
NEXT_PUBLIC_API_URL=https://your-domain.com/api

# JWT Configuration
JWT_SECRET=your-secure-secret
JWT_EXPIRES_IN=86400

# Other configurations
NODE_ENV=production
```

### 2. Production Build
```bash
# Install dependencies
npm install --production

# Build the application
npm run build
```

## Deployment Options

### 1. Vercel (Recommended)

#### Initial Setup
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." > "Project"
3. Import your GitHub repository (`second-brain-private`)
4. Configure the following settings:
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

#### Environment Variables Setup
1. In the Vercel dashboard, go to Project Settings > Environment Variables
2. Add the following variables from your `.env` file:
   - `DATABASE_URL` (Production database connection string)
   - `JWT_SECRET` (Generate a new secure secret for production)
   - `NODE_ENV` (Set to "production")
   - Any other variables from your `.env` file

#### Database Setup
1. Create a production PostgreSQL database using Neon (https://neon.tech)
   - Sign up for a Neon account
   - Create a new project
   - Create a new database
   - Get the connection string from the dashboard
2. Update `DATABASE_URL` in Vercel environment variables with the Neon connection string
   Format: `postgresql://user:password@endpoint/database?sslmode=require`
3. Run migrations:
   ```bash
   # Locally, using production URL
   npx prisma generate
   npx prisma migrate deploy
   ```

#### Domain Setup (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` in environment variables

#### Deployment
Vercel will automatically deploy:
- When you push to `main` branch
- When you create a PR (preview deployment)
- When you manually trigger a deployment

Manual deployment options:
```bash
# Using Vercel CLI
vercel

# Production deployment
vercel --prod
```

#### Post-Deployment Checks
1. Verify environment variables are set correctly
2. Check database connection
3. Test authentication flow
4. Verify API endpoints
5. Check application logs in Vercel dashboard

#### Monitoring and Analytics
1. Enable Vercel Analytics in Project Settings
2. Set up Error Monitoring (Vercel supports Sentry integration)
3. Configure Status Alerts for downtime notification

#### Rollback Process
1. In Vercel dashboard, go to Deployments
2. Find the last working deployment
3. Click "..." > "Promote to Production"

### 2. Docker Deployment

#### Build Docker Image
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

```bash
# Build image
docker build -t second-brain .

# Run container
docker run -p 3000:3000 second-brain
```

### 3. Traditional VPS/Server

#### Server Setup
1. Install Node.js and PM2
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pm2
   ```

2. Clone and Setup
   ```bash
   git clone https://github.com/skezyoxo/second-brain-private.git
   cd second-brain-private
   npm install
   npm run build
   ```

3. Run with PM2
   ```bash
   pm2 start npm --name "second-brain" -- start
   pm2 save
   ```

## Database Migration

### 1. Before Deployment
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

### 2. Backup Strategy
- Take database snapshot
- Document current schema version
- Have rollback plan ready

## Monitoring

### 1. Application Monitoring
- Set up error tracking (e.g., Sentry)
- Configure performance monitoring
- Set up uptime monitoring

### 2. Log Management
- Configure application logs
- Set up log rotation
- Implement error alerting

### 3. Database Monitoring
- Monitor connection pool
- Track query performance
- Set up backup monitoring

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check database connectivity
   npx prisma db pull
   
   # Reset database (if needed)
   npx prisma migrate reset
   ```

2. **Build Failures**
   - Clear `.next` directory
   - Rebuild node_modules
   - Check for TypeScript errors

3. **Runtime Errors**
   - Check logs: `pm2 logs`
   - Verify environment variables
   - Check database migrations

### Health Checks

1. **API Health**
   - Endpoint: `/api/health`
   - Check database connectivity
   - Verify JWT functionality

2. **Database Health**
   - Connection pool status
   - Migration status
   - Backup status

## Rollback Procedures

### 1. Code Rollback
```bash
# Revert to previous version
git checkout previous-tag
npm install
npm run build
```

### 2. Database Rollback
```bash
# Revert last migration
npx prisma migrate reset
```

## Security Considerations

1. **SSL/TLS**
   - Enable HTTPS
   - Configure SSL certificates
   - Set up auto-renewal

2. **Security Headers**
   - Configure CSP
   - Enable HSTS
   - Set up XSS protection

3. **Access Control**
   - Secure database access
   - Configure firewalls
   - Set up IP whitelisting

## Performance Optimization

1. **Caching Strategy**
   - Configure CDN
   - Implement Redis (if needed)
   - Set up API caching

2. **Resource Optimization**
   - Optimize images
   - Configure compression
   - Enable code splitting

## Maintenance

### Regular Tasks
1. Update dependencies
2. Rotate logs
3. Monitor disk space
4. Check backup integrity

### Emergency Procedures
1. Document incident
2. Execute rollback if needed
3. Update status page
4. Notify stakeholders 