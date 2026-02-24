// import React from 'react'
// import { useEffect } from 'react'


// function Attendance({setTitle}) {
//  useEffect(() => {
//     setTitle('Attendance Page')
//   }, [setTitle])
  
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Attendance








import { useEffect, useState } from 'react'
import { getEmployeeRecords } from '../../data/mockAttendanceData'
import { FaEye } from 'react-icons/fa'
import EmployeeAttendanceModal from './EmployeeAttendanceModal'
import { useAuthContext } from '../../context'

function UserAttendance({ setTitle }) {
  const { user } = useAuthContext()
  const [records, setRecords] = useState([])
  const [showModal, setShowModal] = useState(false)

  // Use employeeId from user context, fallback to 1 for mock
  const currentEmployee = {
    employeeId: user?.employeeId || 1,
    name: user?.name || 'Employee',
    email: user?.email || ''
  }

  useEffect(() => {
    setTitle('My Attendance')
    const empRecords = getEmployeeRecords(currentEmployee.employeeId)
    setRecords(empRecords.sort((a, b) => new Date(b.date) - new Date(a.date)))
  }, [setTitle])

  // Monthly summary
  const summary = {
    present: records.filter(r => r.status === 'Present').length,
    absent: records.filter(r => r.status === 'Absent').length,
    leave: records.filter(r => r.status === 'Leave').length,
  }

  const getStatusColor = (status) => {
    if (status === 'Present') return 'bg-green-100 text-green-800'
    if (status === 'Absent') return 'bg-red-100 text-red-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">My Attendance</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2C5284] text-white rounded-lg 
            hover:bg-[#365F8D] transition-colors font-medium"
        >
          <FaEye size={16} />
          View Details
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm text-center">
          <p className="text-2xl font-bold text-green-600">{summary.present}</p>
          <p className="text-sm text-gray-600">Present</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm text-center">
          <p className="text-2xl font-bold text-red-600">{summary.absent}</p>
          <p className="text-sm text-gray-600">Absent</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm text-center">
          <p className="text-2xl font-bold text-yellow-600">{summary.leave}</p>
          <p className="text-sm text-gray-600">Leave</p>
        </div>
      </div>

      {/* Attendance Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-[#2C5284]">
          <h2 className="text-lg font-semibold text-white">Attendance Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Work Hours</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{record.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.checkOut}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.workHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        <div className="p-4 bg-[#2C5284] rounded-t-xl">
          <h2 className="text-lg font-semibold text-white">Attendance Records</h2>
        </div>
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-gray-900">{record.date}</span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div>In: <span className="text-gray-900">{record.checkIn}</span></div>
              <div>Out: <span className="text-gray-900">{record.checkOut}</span></div>
              <div className="col-span-2">Hours: <span className="text-gray-900">{record.workHours}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showModal && (
        <EmployeeAttendanceModal
          employee={currentEmployee}
          onClose={() => setShowModal(false)}
          isAdmin={false}
        />
      )}
    </div>
  )
}

export default UserAttendance