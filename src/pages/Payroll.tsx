import { useState } from 'react';
import { DollarSign, Download, Calendar, Users, TrendingUp, Calculator, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockEmployees } from '@/data/mockData';
import { cn } from '@/lib/utils';

const payrollData = mockEmployees.slice(0, 5).map((emp, index) => ({
  ...emp,
  baseSalary: [150000, 85000, 120000, 65000, 55000][index],
  allowances: [45000, 25000, 35000, 18000, 15000][index],
  deductions: [35000, 18000, 28000, 12000, 10000][index],
  netSalary: [160000, 92000, 127000, 71000, 60000][index],
  status: ['processed', 'processed', 'pending', 'processed', 'pending'][index] as 'processed' | 'pending',
}));

const months = [
  'January 2024', 'February 2024', 'March 2024', 'April 2024', 
  'May 2024', 'June 2024', 'July 2024', 'August 2024',
  'September 2024', 'October 2024', 'November 2024', 'December 2024'
];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  const totalPayroll = payrollData.reduce((acc, emp) => acc + emp.netSalary, 0);
  const processedCount = payrollData.filter(p => p.status === 'processed').length;
  const pendingCount = payrollData.filter(p => p.status === 'pending').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payroll</h1>
          <p className="text-muted-foreground">Manage salary, deductions, and performance incentives</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Calculator className="h-4 w-4" />
            Generate Payroll
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(totalPayroll)}</p>
            <p className="text-xs text-muted-foreground mt-1">For {selectedMonth}</p>
          </CardContent>
        </Card>
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Processed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{processedCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Salaries processed</p>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card className="border-info/20 bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Avg Salary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(totalPayroll / payrollData.length)}</p>
            <p className="text-xs text-muted-foreground mt-1">Per employee</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Payroll Register - {selectedMonth}</CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Base Salary</TableHead>
                <TableHead className="text-right">Allowances</TableHead>
                <TableHead className="text-right">Deductions</TableHead>
                <TableHead className="text-right">Net Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrollData.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {emp.firstName[0]}{emp.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-muted-foreground">{emp.employeeId}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">{emp.department}</TableCell>
                  <TableCell className="text-right text-foreground">{formatCurrency(emp.baseSalary)}</TableCell>
                  <TableCell className="text-right text-success">+{formatCurrency(emp.allowances)}</TableCell>
                  <TableCell className="text-right text-destructive">-{formatCurrency(emp.deductions)}</TableCell>
                  <TableCell className="text-right font-semibold text-foreground">{formatCurrency(emp.netSalary)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        emp.status === 'processed' 
                          ? 'bg-success/10 text-success border-success/20' 
                          : 'bg-warning/10 text-warning border-warning/20'
                      )}
                    >
                      {emp.status === 'processed' ? 'Processed' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Payslip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Salary Components Breakdown */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Salary Components</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Basic Salary', amount: 150000, percentage: 50 },
              { label: 'Dearness Allowance (DA)', amount: 30000, percentage: 10 },
              { label: 'House Rent Allowance (HRA)', amount: 45000, percentage: 15 },
              { label: 'Medical Allowance', amount: 15000, percentage: 5 },
              { label: 'Shift Premium', amount: 10000, percentage: 3.3 },
            ].map((component) => (
              <div key={component.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{component.label}</p>
                  <p className="text-xs text-muted-foreground">{component.percentage}% of CTC</p>
                </div>
                <p className="font-semibold text-foreground">{formatCurrency(component.amount)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deductions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Provident Fund (PF)', amount: 15000, description: 'Employee contribution 12%' },
              { label: 'ESI', amount: 3654, description: '1.75% of gross' },
              { label: 'Professional Tax', amount: 200, description: 'State tax' },
              { label: 'Income Tax (TDS)', amount: 45000, description: 'Based on tax slab' },
            ].map((deduction) => (
              <div key={deduction.label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{deduction.label}</p>
                  <p className="text-xs text-muted-foreground">{deduction.description}</p>
                </div>
                <p className="font-semibold text-destructive">-{formatCurrency(deduction.amount)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
