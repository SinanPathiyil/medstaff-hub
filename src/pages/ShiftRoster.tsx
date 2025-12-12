import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Users, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockShifts, mockShiftAssignments, mockEmployees, departments } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function ShiftRoster() {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date('2024-12-09'));
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');

  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getAssignmentsForDateAndShift = (date: Date, shiftId: string) => {
    const dateStr = formatDate(date);
    return mockShiftAssignments
      .filter(a => a.date === dateStr && a.shiftId === shiftId)
      .map(a => {
        const employee = mockEmployees.find(e => e.id === a.employeeId);
        return { ...a, employee };
      })
      .filter(a => a.employee);
  };

  const isToday = (date: Date) => {
    const today = new Date('2024-12-12'); // Mock today
    return formatDate(date) === formatDate(today);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shift Roster</h1>
          <p className="text-muted-foreground">Manage 24/7 staffing and shift schedules</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Roster
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium text-foreground min-w-[200px] text-center">
              {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setCurrentWeekStart(new Date('2024-12-09'))}>
            Today
          </Button>
        </div>
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
      </div>

      {/* Shift Legend */}
      <div className="flex flex-wrap gap-3">
        {mockShifts.map(shift => (
          <div key={shift.id} className="flex items-center gap-2">
            <div className={cn('rounded px-2 py-1 text-xs font-medium', shift.color)}>
              {shift.name}
            </div>
            <span className="text-xs text-muted-foreground">
              {shift.startTime} - {shift.endTime}
            </span>
          </div>
        ))}
      </div>

      {/* Roster Grid */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-8 border-b border-border">
          {/* Shift Column Header */}
          <div className="p-4 bg-muted/50 border-r border-border">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Shift
            </div>
          </div>
          {/* Day Headers */}
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={cn(
                'p-4 text-center border-r border-border last:border-r-0',
                isToday(day) ? 'bg-primary/10' : 'bg-muted/50'
              )}
            >
              <div className="text-xs text-muted-foreground">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={cn(
                'text-lg font-semibold',
                isToday(day) ? 'text-primary' : 'text-foreground'
              )}>
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Shift Rows */}
        {mockShifts.map(shift => (
          <div key={shift.id} className="grid grid-cols-8 border-b border-border last:border-b-0">
            {/* Shift Label */}
            <div className="p-4 border-r border-border bg-background">
              <div className={cn('rounded px-2 py-1 text-xs font-medium inline-block', shift.color)}>
                {shift.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {shift.startTime} - {shift.endTime}
              </div>
            </div>

            {/* Day Cells */}
            {weekDays.map((day, dayIndex) => {
              const assignments = getAssignmentsForDateAndShift(day, shift.id);
              return (
                <div 
                  key={dayIndex}
                  className={cn(
                    'p-2 border-r border-border last:border-r-0 min-h-[100px]',
                    isToday(day) ? 'bg-primary/5' : 'bg-background'
                  )}
                >
                  {assignments.length > 0 ? (
                    <div className="space-y-1.5">
                      {assignments.map(({ id, employee, status }) => employee && (
                        <div 
                          key={id}
                          className={cn(
                            'rounded-md px-2 py-1.5 text-xs',
                            status === 'confirmed' 
                              ? 'bg-success/10 border border-success/20' 
                              : 'bg-muted border border-border'
                          )}
                        >
                          <div className="font-medium text-foreground truncate">
                            {employee.firstName} {employee.lastName[0]}.
                          </div>
                          <div className="text-muted-foreground truncate">
                            {employee.designation}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <button className="w-full h-full flex items-center justify-center rounded-md border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors">
                      <Plus className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-sm text-muted-foreground">Total Shifts This Week</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2.5">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">42</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2.5">
              <Users className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground">Pending Confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
