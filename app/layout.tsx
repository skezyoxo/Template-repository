import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { ThemeProvider } from '@/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Application Template',
  description: 'Your application description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          themes={['light', 'dark', 'rose', 'blue', 'green', 'purple', 'orange']}
        >
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
