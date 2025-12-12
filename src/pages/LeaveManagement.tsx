import { useState } from 'react';
import { Plus, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockLeaveRequests, mockEmployees } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusConfig = {
  pending: { icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10 border-warning/20' },
  approved: { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10 border-success/20' },
  rejected: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/20' },
};

const leaveTypeColors = {
  casual: 'bg-info/10 text-info border-info/20',
  earned: 'bg-success/10 text-success border-success/20',
  sick: 'bg-destructive/10 text-destructive border-destructive/20',
  maternity: 'bg-primary/10 text-primary border-primary/20',
  paternity: 'bg-primary/10 text-primary border-primary/20',
  study: 'bg-secondary/10 text-secondary border-secondary/20',
};

export default function LeaveManagement() {
  const [activeTab, setActiveTab] = useState('pending');

  const requestsWithEmployees = mockLeaveRequests.map(req => ({
    ...req,
    employee: mockEmployees.find(e => e.id === req.employeeId),
  }));

  const pendingRequests = requestsWithEmployees.filter(r => r.status === 'pending');
  const approvedRequests = requestsWithEmployees.filter(r => r.status === 'approved');
  const rejectedRequests = requestsWithEmployees.filter(r => r.status === 'rejected');

  const getDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const LeaveRequestCard = ({ request }: { request: typeof requestsWithEmployees[0] }) => {
    const status = statusConfig[request.status];
    const StatusIcon = status.icon;

    return (
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {request.employee?.firstName[0]}{request.employee?.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {request.employee?.firstName} {request.employee?.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {request.employee?.designation} • {request.employee?.department}
                </p>
              </div>
            </div>
            <Badge variant="outline" className={cn('gap-1 capitalize', status.bg, status.color)}>
              <StatusIcon className="h-3.5 w-3.5" />
              {request.status}
            </Badge>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="outline" className={cn('capitalize', leaveTypeColors[request.leaveType])}>
                {request.leaveType} Leave
              </Badge>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(request.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(request.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {getDuration(request.startDate, request.endDate)} days
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{request.reason}</p>
          </div>

          {request.status === 'pending' && (
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1">Approve</Button>
              <Button size="sm" variant="outline" className="flex-1">Reject</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests and balances</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Leave Request
        </Button>
      </div>

      {/* Leave Balance Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-warning" />
              <span className="text-2xl font-bold text-foreground">{pendingRequests.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold text-foreground">{approvedRequests.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-info/20 bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Staff on Leave Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-info" />
              <span className="text-2xl font-bold text-foreground">8</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            Pending
            {pendingRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingRequests.map(request => (
              <LeaveRequestCard key={request.id} request={request} />
            ))}
            {pendingRequests.length === 0 && (
              <div className="col-span-full text-center py-12">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">All caught up!</p>
                <p className="text-sm text-muted-foreground">No pending leave requests</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approvedRequests.map(request => (
              <LeaveRequestCard key={request.id} request={request} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rejectedRequests.map(request => (
              <LeaveRequestCard key={request.id} request={request} />
            ))}
            {rejectedRequests.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-lg font-medium text-foreground">No rejected requests</p>
                <p className="text-sm text-muted-foreground">Rejected leave requests will appear here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <Card className="border-border">
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">Calendar View Coming Soon</p>
              <p className="text-sm text-muted-foreground">View all leaves on a calendar interface</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
