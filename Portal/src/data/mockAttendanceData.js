// Mock Attendance Data for all employees

const mockAttendanceData = [
  // Employee 1 - Ali Hamza
  { id: 1, employeeId: 1, date: '2026-01-27', checkIn: '09:02 AM', checkOut: '06:15 PM', status: 'Present', workHours: '9h 13m' },
  { id: 2, employeeId: 1, date: '2026-01-26', checkIn: '08:55 AM', checkOut: '05:48 PM', status: 'Present', workHours: '8h 53m' },
  { id: 3, employeeId: 1, date: '2026-01-25', checkIn: '09:10 AM', checkOut: '06:00 PM', status: 'Present', workHours: '8h 50m' },
  { id: 4, employeeId: 1, date: '2026-01-24', checkIn: '09:00 AM', checkOut: '06:05 PM', status: 'Present', workHours: '9h 5m' },
  { id: 5, employeeId: 1, date: '2026-01-23', checkIn: '------', checkOut: '------', status: 'Leave', workHours: '------' },
  { id: 6, employeeId: 1, date: '2026-01-22', checkIn: '09:15 AM', checkOut: '06:20 PM', status: 'Present', workHours: '9h 5m' },
  { id: 7, employeeId: 1, date: '2026-01-21', checkIn: '------', checkOut: '------', status: 'Absent', workHours: '------' },
  { id: 8, employeeId: 1, date: '2026-01-20', checkIn: '08:50 AM', checkOut: '05:55 PM', status: 'Present', workHours: '9h 5m' },
  { id: 9, employeeId: 1, date: '2026-01-19', checkIn: '09:05 AM', checkOut: '06:10 PM', status: 'Present', workHours: '9h 5m' },
  { id: 10, employeeId: 1, date: '2026-01-18', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', workHours: '9h 0m' },

  // Employee 2 - Ali Zain
  { id: 11, employeeId: 2, date: '2026-01-27', checkIn: '09:10 AM', checkOut: '06:05 PM', status: 'Present', workHours: '8h 55m' },
  { id: 12, employeeId: 2, date: '2026-01-26', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', workHours: '9h 0m' },
  { id: 13, employeeId: 2, date: '2026-01-25', checkIn: '------', checkOut: '------', status: 'Absent', workHours: '------' },
  { id: 14, employeeId: 2, date: '2026-01-24', checkIn: '08:45 AM', checkOut: '05:50 PM', status: 'Present', workHours: '9h 5m' },
  { id: 15, employeeId: 2, date: '2026-01-23', checkIn: '09:20 AM', checkOut: '06:15 PM', status: 'Present', workHours: '8h 55m' },

  // Employee 3 - Khubaib
  { id: 16, employeeId: 3, date: '2026-01-27', checkIn: '08:58 AM', checkOut: '06:02 PM', status: 'Present', workHours: '9h 4m' },
  { id: 17, employeeId: 3, date: '2026-01-26', checkIn: '------', checkOut: '------', status: 'Leave', workHours: '------' },
  { id: 18, employeeId: 3, date: '2026-01-25', checkIn: '09:05 AM', checkOut: '06:10 PM', status: 'Present', workHours: '9h 5m' },
  { id: 19, employeeId: 3, date: '2026-01-24', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', workHours: '9h 0m' },

  // Employee 4 - Shazain
  { id: 20, employeeId: 4, date: '2026-01-27', checkIn: '09:00 AM', checkOut: '06:00 PM', status: 'Present', workHours: '9h 0m' },
  { id: 21, employeeId: 4, date: '2026-01-26', checkIn: '09:10 AM', checkOut: '06:05 PM', status: 'Present', workHours: '8h 55m' },
  { id: 22, employeeId: 4, date: '2026-01-25', checkIn: '------', checkOut: '------', status: 'Absent', workHours: '------' },
  { id: 23, employeeId: 4, date: '2026-01-24', checkIn: '08:55 AM', checkOut: '05:58 PM', status: 'Present', workHours: '9h 3m' },
]

// Get attendance records for a specific employee
export const getEmployeeRecords = (employeeId) => {
  return mockAttendanceData.filter(record => record.employeeId === employeeId)
}

// Get today's attendance summary
export const getTodaysSummary = () => {
  const today = new Date().toISOString().split('T')[0]
  const todayRecords = mockAttendanceData.filter(r => r.date === today)
  return {
    present: todayRecords.filter(r => r.status === 'Present').length,
    absent: todayRecords.filter(r => r.status === 'Absent').length,
    onLeave: todayRecords.filter(r => r.status === 'Leave').length,
  }
}

export default mockAttendanceData