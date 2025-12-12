import { useState } from 'react';
import { GraduationCap, Calendar, Clock, CheckCircle, AlertTriangle, Users, Play, FileCheck, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const trainings = [
  {
    id: '1',
    name: 'HIPAA Compliance Training',
    description: 'Healthcare privacy and security regulations',
    type: 'mandatory',
    duration: '2 hours',
    dueDate: '2024-12-31',
    completedBy: 142,
    totalStaff: 156,
    status: 'active',
  },
  {
    id: '2',
    name: 'Fire Safety & Emergency Procedures',
    description: 'Annual fire safety certification',
    type: 'mandatory',
    duration: '1.5 hours',
    dueDate: '2024-12-20',
    completedBy: 98,
    totalStaff: 156,
    status: 'active',
  },
  {
    id: '3',
    name: 'Infection Control Protocol',
    description: 'Updated infection prevention guidelines',
    type: 'mandatory',
    duration: '1 hour',
    dueDate: '2025-01-15',
    completedBy: 156,
    totalStaff: 156,
    status: 'completed',
  },
  {
    id: '4',
    name: 'CPR & Basic Life Support',
    description: 'Biennial BLS certification renewal',
    type: 'certification',
    duration: '4 hours',
    dueDate: '2025-02-28',
    completedBy: 45,
    totalStaff: 120,
    status: 'active',
  },
  {
    id: '5',
    name: 'Patient Communication Skills',
    description: 'Improving patient interaction',
    type: 'optional',
    duration: '1 hour',
    dueDate: null,
    completedBy: 67,
    totalStaff: 156,
    status: 'active',
  },
];

const recentCompletions = [
  { name: 'Dr. Rajesh Kumar', training: 'HIPAA Compliance', completedAt: '2 hours ago' },
  { name: 'Priya Singh', training: 'Fire Safety', completedAt: '5 hours ago' },
  { name: 'Ananya Sharma', training: 'Infection Control', completedAt: 'Yesterday' },
  { name: 'Sarah Thomas', training: 'CPR & BLS', completedAt: 'Yesterday' },
  { name: 'Vikram Reddy', training: 'Patient Communication', completedAt: '2 days ago' },
];

const upcomingTrainings = [
  { name: 'Advanced Cardiac Life Support', date: 'Dec 18, 2024', time: '09:00 AM', instructor: 'Dr. Suresh Menon' },
  { name: 'New Equipment Training', date: 'Dec 22, 2024', time: '02:00 PM', instructor: 'Tech Team' },
  { name: 'Quality Improvement Workshop', date: 'Jan 05, 2025', time: '10:00 AM', instructor: 'Quality Dept' },
];

export default function Training() {
  const [activeTab, setActiveTab] = useState('all');

  const stats = {
    totalTrainings: trainings.length,
    mandatory: trainings.filter(t => t.type === 'mandatory').length,
    overdue: 2,
    completionRate: 87,
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mandatory': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'certification': return 'bg-primary/10 text-primary border-primary/20';
      case 'optional': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training</h1>
          <p className="text-muted-foreground">Manage mandatory trainings and certification tracking</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Training
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Total Trainings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.totalTrainings}</p>
          </CardContent>
        </Card>
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Mandatory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.mandatory}</p>
          </CardContent>
        </Card>
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.overdue}</p>
          </CardContent>
        </Card>
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">{stats.completionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Training List */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Trainings</TabsTrigger>
              <TabsTrigger value="mandatory">Mandatory</TabsTrigger>
              <TabsTrigger value="certification">Certifications</TabsTrigger>
              <TabsTrigger value="optional">Optional</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4 space-y-4">
              {trainings
                .filter(t => activeTab === 'all' || t.type === activeTab)
                .map((training) => {
                  const completionPercent = Math.round((training.completedBy / training.totalStaff) * 100);
                  return (
                    <Card key={training.id}>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{training.name}</h3>
                              <Badge variant="outline" className={cn('capitalize', getTypeColor(training.type))}>
                                {training.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{training.description}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {training.duration}
                              </div>
                              {training.dueDate && (
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  Due: {new Date(training.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                              )}
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {training.completedBy}/{training.totalStaff} completed
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-muted-foreground">Progress</span>
                                <span className="text-xs font-medium text-foreground">{completionPercent}%</span>
                              </div>
                              <Progress value={completionPercent} className="h-2" />
                            </div>
                          </div>
                          
                          <Button variant="outline" size="sm" className="gap-1.5 flex-shrink-0">
                            <Play className="h-4 w-4" />
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upcoming Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTrainings.map((session, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{session.name}</p>
                    <p className="text-xs text-muted-foreground">{session.date} at {session.time}</p>
                    <p className="text-xs text-muted-foreground">Instructor: {session.instructor}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Completions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Completions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCompletions.map((completion, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-success/10 text-success text-xs">
                      {completion.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{completion.name}</p>
                    <p className="text-xs text-muted-foreground">{completion.training}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{completion.completedAt}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
