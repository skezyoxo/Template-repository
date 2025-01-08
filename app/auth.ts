import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '@/lib/auth/password';

export const { auth, handlers: authHandler } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password_hash) {
                    return null;
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password_hash
                );

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    session: {
        strategy: 'database',
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('Sign in callback:', { user, account, profile });
            return true;
        },
        async session({ session, user }) {
            console.log('Session callback:', { session, user });
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            console.log('Authorization check:', { auth, url: nextUrl.toString() });
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    debug: true,
});
