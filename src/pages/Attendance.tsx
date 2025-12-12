import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, MinusCircle, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { mockAttendance, mockEmployees, departments } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusConfig = {
  present: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Present' },
  absent: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Absent' },
  'half-day': { icon: MinusCircle, color: 'text-warning', bg: 'bg-warning/10', label: 'Half Day' },
  leave: { icon: Calendar, color: 'text-info', bg: 'bg-info/10', label: 'On Leave' },
};

export default function Attendance() {
  const [dateFilter, setDateFilter] = useState('2024-12-12');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const attendanceWithEmployees = mockAttendance.map(record => ({
    ...record,
    employee: mockEmployees.find(e => e.id === record.employeeId),
  })).filter(record => record.employee);

  const filteredAttendance = attendanceWithEmployees.filter(record => {
    const matchesDepartment = departmentFilter === 'all' || record.employee?.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesDepartment && matchesStatus;
  });

  const stats = {
    present: filteredAttendance.filter(r => r.status === 'present').length,
    absent: filteredAttendance.filter(r => r.status === 'absent').length,
    leave: filteredAttendance.filter(r => r.status === 'leave').length,
    halfDay: filteredAttendance.filter(r => r.status === 'half-day').length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance</h1>
          <p className="text-muted-foreground">Track daily attendance and working hours</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-success/20 bg-success/10 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-success" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.present}</p>
              <p className="text-sm text-muted-foreground">Present</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
          <div className="flex items-center gap-3">
            <XCircle className="h-8 w-8 text-destructive" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.absent}</p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-info/20 bg-info/10 p-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-info" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.leave}</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-warning/20 bg-warning/10 p-4">
          <div className="flex items-center gap-3">
            <MinusCircle className="h-8 w-8 text-warning" />
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.halfDay}</p>
              <p className="text-sm text-muted-foreground">Half Day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dept => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="leave">On Leave</SelectItem>
            <SelectItem value="half-day">Half Day</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Attendance Table */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[280px]">Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Punch In</TableHead>
              <TableHead>Punch Out</TableHead>
              <TableHead>Working Hours</TableHead>
              <TableHead>Overtime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAttendance.map((record) => {
              const status = statusConfig[record.status];
              const StatusIcon = status.icon;
              return (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {record.employee?.firstName[0]}{record.employee?.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {record.employee?.firstName} {record.employee?.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.employee?.employeeId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-foreground">{record.employee?.department}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('gap-1.5', status.bg, status.color, 'border-transparent')}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {record.punchIn ? (
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {record.punchIn}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {record.punchOut ? (
                      <div className="flex items-center gap-1.5 text-sm text-foreground">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {record.punchOut}
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium text-foreground">
                      {record.workingHours > 0 ? `${record.workingHours.toFixed(1)} hrs` : '—'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {record.overtimeHours > 0 ? (
                      <Badge variant="outline" className="bg-warning/10 text-warning border-transparent">
                        +{record.overtimeHours.toFixed(1)} hrs
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
