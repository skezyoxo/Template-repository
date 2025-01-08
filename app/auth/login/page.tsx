'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
                return;
            }

            router.push(callbackUrl);
        } catch (error) {
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
            <div className="w-full max-w-md space-y-8 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Sign in to your account
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/auth/signup"
                            className="font-medium text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="grid gap-6">
                    <form onSubmit={onSubmit}>
                        <div className="grid gap-4">
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
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button disabled={isLoading}>
                                {isLoading ? 'Signing in...' : 'Sign in'}
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
                        onClick={() => signIn('github', { callbackUrl })}
                    >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
}
