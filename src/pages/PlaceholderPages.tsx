import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <Card className="border-border">
        <CardContent className="flex flex-col items-center justify-center py-24">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Construction className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground text-center max-w-md">
            This module is under development. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function PayrollPage() {
  return <PlaceholderPage title="Payroll" description="Manage salary, deductions, and performance-linked incentives" />;
}

export function CredentialsPage() {
  return <PlaceholderPage title="Credentials" description="Track licenses, certifications, and compliance status" />;
}

export function TrainingPage() {
  return <PlaceholderPage title="Training" description="Manage mandatory trainings and certification tracking" />;
}

export function ReportsPage() {
  return <PlaceholderPage title="Reports & Analytics" description="Generate HR analytics and custom reports" />;
}

export function CompliancePage() {
  return <PlaceholderPage title="Compliance" description="HIPAA compliance and audit logs" />;
}

export function SettingsPage() {
  return <PlaceholderPage title="Settings" description="System configuration and preferences" />;
}
