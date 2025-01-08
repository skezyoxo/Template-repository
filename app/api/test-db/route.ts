import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Attempt to connect to the database
        await prisma.$connect();

        // If we get here, the connection was successful
        return NextResponse.json({
            status: 'success',
            message: 'Successfully connected to the database'
        });
    } catch (error) {
        // If there's an error, return it
        return NextResponse.json({
            status: 'error',
            message: 'Failed to connect to the database',
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    } finally {
        // Always disconnect from the database
        await prisma.$disconnect();
    }
} 