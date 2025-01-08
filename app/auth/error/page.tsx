'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Check if all environment variables are set correctly.';
      case 'AccessDenied':
        return 'Access denied. You may not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      case 'OAuthSignin':
        return 'Error in constructing an authorization URL. Check the server configuration.';
      case 'OAuthCallback':
        return 'Error in handling the response from OAuth provider.';
      case 'OAuthCreateAccount':
        return 'Could not create OAuth provider user in the database.';
      case 'EmailCreateAccount':
        return 'Could not create email provider user in the database.';
      case 'Callback':
        return 'Error in the OAuth callback handler route.';
      case 'OAuthAccountNotLinked':
        return 'Email on the account already exists with different provider.';
      case 'EmailSignin':
        return 'Check if your email is correct.';
      case 'CredentialsSignin':
        return 'Sign in failed. Check the details you provided are correct.';
      case 'SessionRequired':
        return 'Please sign in to access this page.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-red-600">Authentication Error</h1>
          <p className="mt-2 text-sm text-muted-foreground">{getErrorMessage(error)}</p>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
