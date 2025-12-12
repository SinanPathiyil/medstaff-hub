import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import ShiftRoster from "@/pages/ShiftRoster";
import Attendance from "@/pages/Attendance";
import LeaveManagement from "@/pages/LeaveManagement";
import Payroll from "@/pages/Payroll";
import Credentials from "@/pages/Credentials";
import Training from "@/pages/Training";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import { CompliancePage } from "@/pages/PlaceholderPages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/roster" element={<ShiftRoster />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/training" element={<Training />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
