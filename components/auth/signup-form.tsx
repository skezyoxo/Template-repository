'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

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

export function SignupForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setErrors({});

        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
        };

        try {
            // Validate input
            SignupSchema.parse(data);

            // Submit to API
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                setErrors(
                    result.issues?.reduce(
                        (acc: Record<string, string>, issue: { path: string[]; message: string }) => {
                            acc[issue.path[0]] = issue.message;
                            return acc;
                        },
                        {}
                    ) || { form: result.error }
                );
                return;
            }

            // Sign in after successful signup
            const signInResult = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (signInResult?.error) {
                setErrors({ form: 'Failed to sign in after signup' });
                return;
            }

            router.push('/dashboard');
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors(
                    error.errors.reduce((acc: Record<string, string>, issue) => {
                        acc[issue.path[0]] = issue.message;
                        return acc;
                    }, {})
                );
            } else {
                setErrors({ form: 'Something went wrong' });
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="grid gap-6">
            <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            type="text"
                            disabled={isLoading}
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            disabled={isLoading}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">{errors.email}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            disabled={isLoading}
                            required
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password}</p>
                        )}
                    </div>
                    {errors.form && (
                        <p className="text-sm text-red-500">{errors.form}</p>
                    )}
                    <Button disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={() => signIn('github')}
            >
                <Github className="mr-2 h-4 w-4" />
                GitHub
            </Button>
        </div>
    );
} 