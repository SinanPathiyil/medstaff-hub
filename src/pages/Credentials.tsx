import { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, FileCheck, Search, Filter, Upload, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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

const credentialsData = mockEmployees.map((emp) => ({
  ...emp,
  totalCredentials: emp.licenses.length + emp.qualifications.length,
  validCredentials: emp.licenses.filter(l => l.status === 'active').length,
  expiringCredentials: emp.licenses.filter(l => l.status === 'expiring').length,
  expiredCredentials: emp.licenses.filter(l => l.status === 'expired').length,
}));

const upcomingExpirations = [
  { employee: 'Priya Singh', credential: 'Nursing License', expiryDate: '2025-01-15', daysLeft: 34 },
  { employee: 'Mohammed Ali', credential: 'Radiology License', expiryDate: '2024-03-15', daysLeft: -273 },
  { employee: 'Rajesh Kumar', credential: 'CPR Certification', expiryDate: '2025-02-28', daysLeft: 78 },
  { employee: 'Sarah Thomas', credential: 'BLS Certification', expiryDate: '2025-03-10', daysLeft: 88 },
];

export default function Credentials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = {
    total: credentialsData.reduce((acc, emp) => acc + emp.totalCredentials, 0),
    valid: credentialsData.reduce((acc, emp) => acc + emp.validCredentials, 0),
    expiring: credentialsData.reduce((acc, emp) => acc + emp.expiringCredentials, 0),
    expired: credentialsData.reduce((acc, emp) => acc + emp.expiredCredentials, 0),
  };

  const complianceRate = Math.round((stats.valid / (stats.total || 1)) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Credentials</h1>
          <p className="text-muted-foreground">Track licenses, certifications, and compliance status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Certificate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              Total Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Valid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.valid}</p>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.expiring}</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Expired
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.expired}</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Overall Compliance Rate</span>
                <span className={cn(
                  "text-lg font-bold",
                  complianceRate >= 90 ? "text-success" : complianceRate >= 70 ? "text-warning" : "text-destructive"
                )}>{complianceRate}%</span>
              </div>
              <Progress value={complianceRate} className="h-3" />
            </div>
            <div className="text-center px-6 border-l border-border">
              <p className="text-3xl font-bold text-foreground">{stats.valid}/{stats.total}</p>
              <p className="text-sm text-muted-foreground">Credentials Valid</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Expirations */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-warning" />
              Upcoming Expirations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingExpirations.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className={cn(
                  "rounded-full p-1.5",
                  item.daysLeft < 0 ? "bg-destructive/10" : item.daysLeft < 60 ? "bg-warning/10" : "bg-success/10"
                )}>
                  {item.daysLeft < 0 ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : item.daysLeft < 60 ? (
                    <Clock className="h-4 w-4 text-warning" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.employee}</p>
                  <p className="text-xs text-muted-foreground">{item.credential}</p>
                  <p className={cn(
                    "text-xs font-medium mt-1",
                    item.daysLeft < 0 ? "text-destructive" : item.daysLeft < 60 ? "text-warning" : "text-muted-foreground"
                  )}>
                    {item.daysLeft < 0 ? `Expired ${Math.abs(item.daysLeft)} days ago` : `${item.daysLeft} days left`}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Credentials Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Employee Credentials</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-[200px]"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="valid">Valid</SelectItem>
                    <SelectItem value="expiring">Expiring</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Credentials</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {credentialsData.map((emp) => (
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
                          <p className="text-xs text-muted-foreground">{emp.designation}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {emp.validCredentials > 0 && (
                          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                            {emp.validCredentials} Valid
                          </Badge>
                        )}
                        {emp.expiringCredentials > 0 && (
                          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                            {emp.expiringCredentials} Expiring
                          </Badge>
                        )}
                        {emp.expiredCredentials > 0 && (
                          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                            {emp.expiredCredentials} Expired
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {emp.expiredCredentials > 0 ? (
                        <Badge variant="destructive">Action Required</Badge>
                      ) : emp.expiringCredentials > 0 ? (
                        <Badge className="bg-warning text-warning-foreground">Attention</Badge>
                      ) : (
                        <Badge className="bg-success text-success-foreground">Compliant</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
