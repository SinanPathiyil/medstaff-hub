import { Clock, UserCheck, Calendar, AlertTriangle, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'attendance',
    icon: UserCheck,
    title: 'Dr. Rajesh Kumar checked in',
    time: '2 min ago',
    color: 'text-success bg-success/10',
  },
  {
    id: 2,
    type: 'leave',
    icon: Calendar,
    title: 'Leave request from Priya Singh',
    time: '15 min ago',
    color: 'text-info bg-info/10',
  },
  {
    id: 3,
    type: 'credential',
    icon: AlertTriangle,
    title: 'License expiring: Mohammed Ali',
    time: '1 hour ago',
    color: 'text-warning bg-warning/10',
  },
  {
    id: 4,
    type: 'shift',
    icon: Clock,
    title: 'Shift swap approved: Sarah Thomas',
    time: '2 hours ago',
    color: 'text-primary bg-primary/10',
  },
  {
    id: 5,
    type: 'training',
    icon: FileCheck,
    title: 'Training completed: CPR Certification',
    time: '3 hours ago',
    color: 'text-success bg-success/10',
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest updates and notifications</p>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={cn('rounded-lg p-2', activity.color)}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.title}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
