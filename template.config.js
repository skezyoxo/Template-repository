/**
 * Configuration for the Next.js Authentication Template
 * Update these values when creating a new project from this template
 */
module.exports = {
    // Application Details
    name: 'Your App Name',
    description: 'Your application description',

    // Branding
    brandColors: {
        primary: '#0070f3', // Default Next.js blue
        secondary: '#1a1a1a',
    },

    // Features to enable/disable
    features: {
        emailPassword: true,    // Email/password authentication
        githubOAuth: true,      // GitHub OAuth
        roleBasedAccess: true,  // Role-based access control
        darkMode: true,         // Dark mode support
    },

    // Default user roles
    roles: [
        {
            id: 1,
            name: 'user',
            description: 'Default user role',
        },
        {
            id: 2,
            name: 'admin',
            description: 'Administrator role',
        },
    ],

    // Protected routes configuration
    protectedRoutes: [
        {
            path: '/dashboard',
            roles: ['user', 'admin'],
        },
        {
            path: '/admin',
            roles: ['admin'],
        },
    ],

    // Database configuration
    database: {
        provider: 'postgresql', // or 'mysql', 'sqlite'
        includeModels: {
            users: true,
            roles: true,
            permissions: true,
            sessions: true,
        },
    },
}; 