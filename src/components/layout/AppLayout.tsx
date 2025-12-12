import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TooltipProvider } from '@/components/ui/tooltip';

export function AppLayout() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64 transition-all duration-300">
          <Header />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
