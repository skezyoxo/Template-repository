import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
            <div className="w-full max-w-md space-y-8 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Create an account
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your details below to create your account
                    </p>
                </div>

                <SignupForm />
            </div>
        </div>
    );
} 