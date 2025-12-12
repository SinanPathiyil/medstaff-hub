import { 
  Users, 
  UserCheck, 
  CalendarDays, 
  Clock, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Briefcase
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { TodayShifts } from '@/components/dashboard/TodayShifts';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { mockDashboardStats } from '@/data/mockData';

export default function Dashboard() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          trend={{ value: 3.2, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Present Today"
          value={stats.presentToday}
          icon={UserCheck}
          trend={{ value: 1.5, isPositive: true }}
          variant="success"
        />
        <StatCard
          title="On Leave"
          value={stats.onLeave}
          icon={CalendarDays}
          variant="warning"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingApprovals}
          icon={Clock}
          variant="destructive"
        />
      </div>

      {/* Second Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Shifts Today"
          value={stats.shiftsToday}
          icon={Calendar}
        />
        <StatCard
          title="Overtime (hrs)"
          value={stats.overtimeThisMonth}
          icon={TrendingUp}
          trend={{ value: 8.4, isPositive: false }}
        />
        <StatCard
          title="Expiring Credentials"
          value={stats.expiringCredentials}
          icon={AlertCircle}
        />
        <StatCard
          title="Open Positions"
          value={stats.openPositions}
          icon={Briefcase}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart />
        <DepartmentChart />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodayShifts />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
