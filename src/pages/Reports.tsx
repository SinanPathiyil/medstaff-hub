import { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown, Users, Clock, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const attendanceData = [
  { month: 'Jul', present: 145, absent: 8, leave: 3 },
  { month: 'Aug', present: 148, absent: 5, leave: 3 },
  { month: 'Sep', present: 142, absent: 10, leave: 4 },
  { month: 'Oct', present: 150, absent: 4, leave: 2 },
  { month: 'Nov', present: 144, absent: 6, leave: 6 },
  { month: 'Dec', present: 142, absent: 8, leave: 6 },
];

const payrollTrendData = [
  { month: 'Jul', amount: 4500000 },
  { month: 'Aug', amount: 4650000 },
  { month: 'Sep', amount: 4700000 },
  { month: 'Oct', amount: 4800000 },
  { month: 'Nov', amount: 4950000 },
  { month: 'Dec', amount: 5100000 },
];

const departmentDistribution = [
  { name: 'Emergency', value: 44, color: 'hsl(var(--chart-1))' },
  { name: 'ICU', value: 34, color: 'hsl(var(--chart-2))' },
  { name: 'Cardiology', value: 30, color: 'hsl(var(--chart-3))' },
  { name: 'Pediatrics', value: 28, color: 'hsl(var(--chart-4))' },
  { name: 'Others', value: 20, color: 'hsl(var(--chart-5))' },
];

const overtimeData = [
  { dept: 'Emergency', hours: 120 },
  { dept: 'ICU', hours: 95 },
  { dept: 'Surgery', hours: 85 },
  { dept: 'Cardiology', hours: 60 },
  { dept: 'Pediatrics', hours: 45 },
];

const reports = [
  { name: 'Monthly Attendance Register', type: 'attendance', lastGenerated: '2024-12-01' },
  { name: 'Payroll Summary Report', type: 'payroll', lastGenerated: '2024-12-05' },
  { name: 'Staff Directory', type: 'employees', lastGenerated: '2024-12-10' },
  { name: 'Leave Balance Report', type: 'leave', lastGenerated: '2024-12-08' },
  { name: 'Overtime Analysis', type: 'overtime', lastGenerated: '2024-12-09' },
  { name: 'Credential Compliance Report', type: 'credentials', lastGenerated: '2024-12-07' },
];

export default function Reports() {
  const [period, setPeriod] = useState('6months');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate HR analytics and custom reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold text-foreground">156</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+3.2%</span>
                </div>
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Attendance</p>
                <p className="text-2xl font-bold text-foreground">94.2%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+1.5%</span>
                </div>
              </div>
              <div className="rounded-lg bg-success/10 p-3">
                <Clock className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold text-foreground">₹51L</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-warning" />
                  <span className="text-xs text-warning">+4.8%</span>
                </div>
              </div>
              <div className="rounded-lg bg-warning/10 p-3">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Turnover Rate</p>
                <p className="text-2xl font-bold text-foreground">2.1%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">-0.8%</span>
                </div>
              </div>
              <div className="rounded-lg bg-info/10 p-3">
                <BarChart3 className="h-5 w-5 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={attendanceData}>
                  <defs>
                    <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--popover-foreground))'
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="present" stroke="hsl(var(--chart-2))" fill="url(#presentGrad)" strokeWidth={2} name="Present" />
                  <Area type="monotone" dataKey="absent" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.1} strokeWidth={2} name="Absent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payroll Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Trend</CardTitle>
            <CardDescription>Monthly payroll expenditure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payrollTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--popover-foreground))'
                    }}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Payroll" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Staff by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--popover-foreground))'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Overtime by Department */}
        <Card>
          <CardHeader>
            <CardTitle>Overtime by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overtimeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis dataKey="dept" type="category" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--popover-foreground))'
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} name="Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Reports</CardTitle>
            <CardDescription>Generate and download reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{report.name}</p>
                    <p className="text-xs text-muted-foreground">Last: {new Date(report.lastGenerated).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
