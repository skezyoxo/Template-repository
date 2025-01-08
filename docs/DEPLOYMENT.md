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
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up automatic deployments

#### Deploy
```bash
# Using Vercel CLI
vercel

# Production deployment
vercel --prod
```

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