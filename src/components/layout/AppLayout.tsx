
import { ReactNode } from 'react';
import Header from './Header';
import { Toaster } from '@/components/ui/toaster';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MathWiz AI Solver - Advanced Mathematics Problem Solver
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default AppLayout;
