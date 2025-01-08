import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth/password';
import { z } from 'zod';

// Validation schema
const SignupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    name: z.string().min(2, 'Name must be at least 2 characters'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const result = SignupSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: 'Validation failed', issues: result.error.issues },
                { status: 400 }
            );
        }

        const { email, password, name } = result.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password_hash: hashedPassword,
                role_id: 1, // Default role
            },
        });

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 }
        );
    }
} 