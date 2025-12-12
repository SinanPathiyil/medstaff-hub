import { Employee, Shift, AttendanceRecord, LeaveRequest, DashboardStats, ShiftAssignment } from '@/types/hr';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    employeeId: 'DOC-001',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@hospital.com',
    phone: '+91-9876543210',
    department: 'Cardiology',
    designation: 'Senior Cardiologist',
    role: 'doctor',
    status: 'active',
    joiningDate: '2015-01-10',
    contractType: 'permanent',
    qualifications: [
      { degree: 'MBBS', university: 'AIIMS', year: 2010 },
      { degree: 'MD Cardiology', university: 'AIIMS', year: 2013 }
    ],
    licenses: [
      { type: 'Medical License', licenseNo: 'IMR-2024-5678', issuedDate: '2022-06-30', expiryDate: '2026-06-30', status: 'active' }
    ]
  },
  {
    id: '2',
    employeeId: 'NUR-001',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya.singh@hospital.com',
    phone: '+91-9876543211',
    department: 'ICU',
    designation: 'Head Nurse',
    role: 'nurse',
    status: 'active',
    joiningDate: '2018-03-15',
    contractType: 'permanent',
    qualifications: [
      { degree: 'BSc Nursing', university: 'CMC Vellore', year: 2016 }
    ],
    licenses: [
      { type: 'Nursing License', licenseNo: 'NL-2024-1234', issuedDate: '2023-01-15', expiryDate: '2025-01-15', status: 'expiring' }
    ]
  },
  {
    id: '3',
    employeeId: 'DOC-002',
    firstName: 'Ananya',
    lastName: 'Sharma',
    email: 'ananya.sharma@hospital.com',
    phone: '+91-9876543212',
    department: 'Emergency',
    designation: 'Emergency Physician',
    role: 'doctor',
    status: 'active',
    joiningDate: '2019-07-01',
    contractType: 'permanent',
    qualifications: [
      { degree: 'MBBS', university: 'KMC Manipal', year: 2014 },
      { degree: 'MD Emergency Medicine', university: 'JIPMER', year: 2018 }
    ],
    licenses: [
      { type: 'Medical License', licenseNo: 'IMR-2024-9012', issuedDate: '2021-12-01', expiryDate: '2025-12-01', status: 'active' }
    ]
  },
  {
    id: '4',
    employeeId: 'TEC-001',
    firstName: 'Mohammed',
    lastName: 'Ali',
    email: 'mohammed.ali@hospital.com',
    phone: '+91-9876543213',
    department: 'Radiology',
    designation: 'Senior Radiographer',
    role: 'technician',
    status: 'on-leave',
    joiningDate: '2017-09-20',
    contractType: 'permanent',
    qualifications: [
      { degree: 'B.Sc Radiology', university: 'Delhi University', year: 2015 }
    ],
    licenses: [
      { type: 'Radiology License', licenseNo: 'RAD-2024-5678', issuedDate: '2022-03-15', expiryDate: '2024-03-15', status: 'expired' }
    ]
  },
  {
    id: '5',
    employeeId: 'NUR-002',
    firstName: 'Sarah',
    lastName: 'Thomas',
    email: 'sarah.thomas@hospital.com',
    phone: '+91-9876543214',
    department: 'Pediatrics',
    designation: 'Staff Nurse',
    role: 'nurse',
    status: 'active',
    joiningDate: '2020-02-10',
    contractType: 'fixed-term',
    qualifications: [
      { degree: 'GNM', university: 'Christian Medical College', year: 2019 }
    ],
    licenses: [
      { type: 'Nursing License', licenseNo: 'NL-2024-5678', issuedDate: '2023-06-01', expiryDate: '2026-06-01', status: 'active' }
    ]
  },
  {
    id: '6',
    employeeId: 'PAR-001',
    firstName: 'Vikram',
    lastName: 'Reddy',
    email: 'vikram.reddy@hospital.com',
    phone: '+91-9876543215',
    department: 'Emergency',
    designation: 'Senior Paramedic',
    role: 'paramedic',
    status: 'active',
    joiningDate: '2016-11-05',
    contractType: 'permanent',
    qualifications: [
      { degree: 'Diploma in Paramedicine', university: 'Apollo Institute', year: 2014 }
    ],
    licenses: [
      { type: 'Paramedic License', licenseNo: 'PMD-2024-3456', issuedDate: '2022-08-20', expiryDate: '2025-08-20', status: 'active' }
    ]
  }
];

export const mockShifts: Shift[] = [
  { id: 'SHIFT-1', name: 'Morning', startTime: '06:00', endTime: '14:00', type: 'morning', color: 'bg-info/20 text-info' },
  { id: 'SHIFT-2', name: 'Evening', startTime: '14:00', endTime: '22:00', type: 'evening', color: 'bg-warning/20 text-warning' },
  { id: 'SHIFT-3', name: 'Night', startTime: '22:00', endTime: '06:00', type: 'night', color: 'bg-secondary/20 text-secondary' },
  { id: 'SHIFT-4', name: 'On-Call', startTime: '00:00', endTime: '23:59', type: 'on-call', color: 'bg-destructive/20 text-destructive' }
];

export const mockShiftAssignments: ShiftAssignment[] = [
  { id: '1', date: '2024-12-12', shiftId: 'SHIFT-1', employeeId: '1', status: 'confirmed' },
  { id: '2', date: '2024-12-12', shiftId: 'SHIFT-1', employeeId: '2', status: 'confirmed' },
  { id: '3', date: '2024-12-12', shiftId: 'SHIFT-2', employeeId: '3', status: 'scheduled' },
  { id: '4', date: '2024-12-12', shiftId: 'SHIFT-2', employeeId: '5', status: 'confirmed' },
  { id: '5', date: '2024-12-12', shiftId: 'SHIFT-3', employeeId: '6', status: 'scheduled' },
  { id: '6', date: '2024-12-13', shiftId: 'SHIFT-1', employeeId: '3', status: 'scheduled' },
  { id: '7', date: '2024-12-13', shiftId: 'SHIFT-2', employeeId: '1', status: 'scheduled' },
  { id: '8', date: '2024-12-13', shiftId: 'SHIFT-3', employeeId: '2', status: 'scheduled' },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: '1', employeeId: '1', date: '2024-12-12', punchIn: '05:55', punchOut: '14:10', workingHours: 8.25, status: 'present', overtimeHours: 0.25 },
  { id: '2', employeeId: '2', date: '2024-12-12', punchIn: '06:02', punchOut: '14:05', workingHours: 8.05, status: 'present', overtimeHours: 0 },
  { id: '3', employeeId: '3', date: '2024-12-12', punchIn: '14:00', status: 'present', workingHours: 0, overtimeHours: 0 },
  { id: '4', employeeId: '4', date: '2024-12-12', status: 'leave', workingHours: 0, overtimeHours: 0 },
  { id: '5', employeeId: '5', date: '2024-12-12', punchIn: '13:55', status: 'present', workingHours: 0, overtimeHours: 0 },
  { id: '6', employeeId: '6', date: '2024-12-12', status: 'present', punchIn: '21:50', workingHours: 0, overtimeHours: 0 },
];

export const mockLeaveRequests: LeaveRequest[] = [
  { id: '1', employeeId: '4', leaveType: 'sick', startDate: '2024-12-10', endDate: '2024-12-14', status: 'approved', reason: 'Medical treatment' },
  { id: '2', employeeId: '2', leaveType: 'casual', startDate: '2024-12-20', endDate: '2024-12-22', status: 'pending', reason: 'Family function' },
  { id: '3', employeeId: '5', leaveType: 'earned', startDate: '2024-12-25', endDate: '2024-12-31', status: 'pending', reason: 'Year-end vacation' },
];

export const mockDashboardStats: DashboardStats = {
  totalEmployees: 156,
  presentToday: 142,
  onLeave: 8,
  pendingApprovals: 12,
  shiftsToday: 48,
  overtimeThisMonth: 245,
  expiringCredentials: 5,
  openPositions: 8
};

export const departments = [
  'Cardiology',
  'Emergency',
  'ICU',
  'Pediatrics',
  'Radiology',
  'Orthopedics',
  'Neurology',
  'Oncology',
  'Surgery',
  'OPD'
];

export const attendanceTrendData = [
  { date: 'Mon', present: 145, absent: 8, leave: 3 },
  { date: 'Tue', present: 148, absent: 5, leave: 3 },
  { date: 'Wed', present: 142, absent: 10, leave: 4 },
  { date: 'Thu', present: 150, absent: 4, leave: 2 },
  { date: 'Fri', present: 144, absent: 6, leave: 6 },
  { date: 'Sat', present: 138, absent: 12, leave: 6 },
  { date: 'Sun', present: 140, absent: 10, leave: 6 },
];

export const departmentStaffData = [
  { name: 'Emergency', doctors: 12, nurses: 24, staff: 8 },
  { name: 'ICU', doctors: 8, nurses: 20, staff: 6 },
  { name: 'Cardiology', doctors: 10, nurses: 15, staff: 5 },
  { name: 'Pediatrics', doctors: 8, nurses: 18, staff: 4 },
  { name: 'Surgery', doctors: 15, nurses: 22, staff: 10 },
];
