import { mockShifts, mockShiftAssignments, mockEmployees } from '@/data/mockData';
import { Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TodayShifts() {
  const today = '2024-12-12';
  const todayAssignments = mockShiftAssignments.filter(a => a.date === today);

  const shiftGroups = mockShifts.map(shift => {
    const assignments = todayAssignments.filter(a => a.shiftId === shift.id);
    const employees = assignments.map(a => mockEmployees.find(e => e.id === a.employeeId)).filter(Boolean);
    return { shift, employees, count: employees.length };
  });

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Today's Shifts</h3>
          <p className="text-sm text-muted-foreground">Current shift assignments</p>
        </div>
        <span className="text-sm text-muted-foreground">Dec 12, 2024</span>
      </div>
      
      <div className="space-y-3">
        {shiftGroups.map(({ shift, employees, count }) => (
          <div 
            key={shift.id}
            className="rounded-lg border border-border bg-background/50 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn('rounded-lg px-3 py-1.5 text-xs font-medium', shift.color)}>
                  {shift.name}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {shift.startTime} - {shift.endTime}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-muted-foreground" />
                {count}
              </div>
            </div>
            
            {employees.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {employees.map(emp => emp && (
                  <div 
                    key={emp.id}
                    className="flex items-center gap-2 rounded-md bg-muted/50 px-2.5 py-1.5"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium text-foreground">{emp.firstName} {emp.lastName}</span>
                      <span className="text-muted-foreground ml-1">• {emp.designation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
