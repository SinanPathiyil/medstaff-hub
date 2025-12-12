export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: 'doctor' | 'nurse' | 'paramedic' | 'technician' | 'admin' | 'support';
  status: 'active' | 'on-leave' | 'inactive';
  joiningDate: string;
  contractType: 'permanent' | 'fixed-term' | 'temporary' | 'on-call';
  avatar?: string;
  qualifications: Qualification[];
  licenses: License[];
}

export interface Qualification {
  degree: string;
  university: string;
  year: number;
}

export interface License {
  type: string;
  licenseNo: string;
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'expiring' | 'expired';
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: 'morning' | 'evening' | 'night' | 'on-call';
  color: string;
}

export interface ShiftAssignment {
  id: string;
  date: string;
  shiftId: string;
  employeeId: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'absent';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  punchIn?: string;
  punchOut?: string;
  workingHours: number;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  overtimeHours: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveType: 'casual' | 'earned' | 'sick' | 'maternity' | 'paternity' | 'study';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingApprovals: number;
  shiftsToday: number;
  overtimeThisMonth: number;
  expiringCredentials: number;
  openPositions: number;
}
