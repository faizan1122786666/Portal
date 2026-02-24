// Mock Leave Data

export const leaveTypes = [
  { value: 'Sick Leave', label: 'Sick Leave' },
  { value: 'Annual Leave', label: 'Annual Leave' },
  { value: 'Personal Leave', label: 'Personal Leave' },
  { value: 'Emergency Leave', label: 'Emergency Leave' },
  { value: 'Maternity Leave', label: 'Maternity Leave' },
  { value: 'Unpaid Leave', label: 'Unpaid Leave' },
]

const mockLeaveData = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'Ali Hamza',
    email: 'alihamza@gmail.com',
    leaveType: 'Sick Leave',
    startDate: '2026-02-10',
    endDate: '2026-02-12',
    days: 3,
    reason: 'Medical treatment required for fever and flu symptoms.',
    status: 'Pending',
    appliedDate: '2026-02-03',
    adminComment: ''
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: 'Ali Hamza',
    email: 'alihamza@gmail.com',
    leaveType: 'Annual Leave',
    startDate: '2026-01-15',
    endDate: '2026-01-17',
    days: 3,
    reason: 'Family vacation planned.',
    status: 'Approved',
    appliedDate: '2026-01-05',
    adminComment: 'Approved. Enjoy your vacation!'
  },
  {
    id: 3,
    employeeId: 2,
    employeeName: 'Ali Zain',
    email: 'alizain@gmail.com',
    leaveType: 'Personal Leave',
    startDate: '2026-02-05',
    endDate: '2026-02-05',
    days: 1,
    reason: 'Personal errands to attend.',
    status: 'Pending',
    appliedDate: '2026-02-01',
    adminComment: ''
  },
  {
    id: 4,
    employeeId: 3,
    employeeName: 'Khubaib',
    email: 'khubaibhamza@gmail.com',
    leaveType: 'Sick Leave',
    startDate: '2026-01-20',
    endDate: '2026-01-21',
    days: 2,
    reason: 'Doctor appointment and recovery.',
    status: 'Rejected',
    appliedDate: '2026-01-18',
    adminComment: 'Please reschedule after project deadline.'
  },
  {
    id: 5,
    employeeId: 4,
    employeeName: 'Shazain',
    email: 'shazain@gmail.com',
    leaveType: 'Emergency Leave',
    startDate: '2026-01-28',
    endDate: '2026-01-28',
    days: 1,
    reason: 'Family emergency.',
    status: 'Approved',
    appliedDate: '2026-01-28',
    adminComment: 'Hope everything is okay.'
  },
  {
    id: 6,
    employeeId: 1,
    employeeName: 'Ali Hamza',
    email: 'alihamza@gmail.com',
    leaveType: 'Personal Leave',
    startDate: '2026-01-23',
    endDate: '2026-01-23',
    days: 1,
    reason: 'Personal work.',
    status: 'Approved',
    appliedDate: '2026-01-20',
    adminComment: 'Approved.'
  },
]

// Get leaves for a specific employee
export const getEmployeeLeaves = (employeeId) => {
  return mockLeaveData.filter(leave => leave.employeeId === employeeId)
}

export default mockLeaveData