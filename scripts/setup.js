#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query) => new Promise((resolve) => readline.question(query, resolve));

async function setup() {
    console.log('🚀 Setting up your new project from the Next.js Authentication Template\n');

    // Get project details
    const projectName = await question('Project name: ');
    const description = await question('Project description: ');
    const databaseUrl = await question('Database URL (leave empty for default): ');

    // Update package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.name = projectName.toLowerCase().replace(/\s+/g, '-');
    packageJson.description = description;
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

    // Update template.config.js
    const config = require('../template.config.js');
    config.name = projectName;
    config.description = description;
    fs.writeFileSync(
        'template.config.js',
        `module.exports = ${JSON.stringify(config, null, 2)};`
    );

    // Update .env
    const envExample = fs.readFileSync('.env.example', 'utf8');
    const env = envExample.replace(
        /DATABASE_URL=".*"/,
        `DATABASE_URL="${databaseUrl || 'postgresql://user:password@localhost:5432/db'}"`
    );
    fs.writeFileSync('.env', env);

    // Initialize git repository
    try {
        execSync('git init');
        execSync('git add .');
        execSync('git commit -m "Initial commit from Next.js Authentication Template"');
    } catch (error) {
        console.error('Error initializing git repository:', error.message);
    }

    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });

    // Setup database if URL is provided
    if (databaseUrl) {
        console.log('\n🗄️ Setting up database...');
        try {
            execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
            execSync('npx prisma db seed', { stdio: 'inherit' });
        } catch (error) {
            console.error('Error setting up database:', error.message);
        }
    }

    console.log(`
✅ Setup complete! Get started with:

  1. Update your environment variables in .env
  2. Set up your GitHub OAuth application
  3. Run 'npm run dev' to start the development server

Need help? Check the README.md for detailed instructions.
  `);

    readline.close();
}

setup().catch(console.error); 