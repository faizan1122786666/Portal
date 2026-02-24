import { useEffect, useState } from 'react'
import mockAttendanceData from '../../data/mockAttendanceData'
import { CgProfile } from 'react-icons/cg'
import { FaEye } from 'react-icons/fa'
import EmployeeAttendanceModal from './EmployeeAttendanceModal'

// Mock employees list
const mockEmployees = [
  { employeeId: 1, name: 'Ali Hamza', email: 'alihamza@gmail.com', role: 'employee' },
  { employeeId: 2, name: 'Ali Zain', email: 'alizain@gmail.com', role: 'employee' },
  { employeeId: 3, name: 'Khubaib', email: 'khubaib@gmail.com', role: 'employee' },
  { employeeId: 4, name: 'Shazain', email: 'shazain@gmail.com', role: 'employee' },
]

function AdminAttendance({ setTitle }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setTitle('Attendance Management')
  }, [setTitle])

  const filteredEmployees = mockEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Get attendance summary for each employee
  const getEmployeeSummary = (employeeId) => {
    const records = mockAttendanceData.filter(r => r.employeeId === employeeId)
    return {
      present: records.filter(r => r.status === 'Present').length,
      absent: records.filter(r => r.status === 'Absent').length,
      leave: records.filter(r => r.status === 'Leave').length,
      total: records.length
    }
  }

  const viewEmployee = (employee) => {
    setSelectedEmployee(employee)
    setShowModal(true)
  }

  // Today's summary stats
  const todayStats = {
    total: mockEmployees.length,
    present: 3,
    absent: 1,
    onLeave: 0,
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284] mb-6">
        Attendance Management
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border-l-4 border-[#2C5284] shadow-sm">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="text-2xl font-bold text-[#365F8D]">{todayStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
          <p className="text-sm text-gray-600">Present Today</p>
          <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
          <p className="text-sm text-gray-600">Absent Today</p>
          <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border-l-4 border-yellow-500 shadow-sm">
          <p className="text-sm text-gray-600">On Leave</p>
          <p className="text-2xl font-bold text-yellow-600">{todayStats.onLeave}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <input
          type="text"
          placeholder="Search employee by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-[#365F8D] focus:border-transparent outline-none"
        />
      </div>

      {/* Employee Table - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#365F8D]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Present Days</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Absent Days</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Leave Days</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => {
              const summary = getEmployeeSummary(employee.employeeId)
              return (
                <tr key={employee.employeeId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center">
                        <CgProfile size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {summary.present} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                      {summary.absent} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {summary.leave} days
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => viewEmployee(employee)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <FaEye size={18} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Employee Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredEmployees.map((employee) => {
          const summary = getEmployeeSummary(employee.employeeId)
          return (
            <div key={employee.employeeId} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center">
                    <CgProfile size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => viewEmployee(employee)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <FaEye size={18} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-green-50 rounded-lg p-2">
                  <p className="text-green-800 font-bold text-lg">{summary.present}</p>
                  <p className="text-green-600">Present</p>
                </div>
                <div className="bg-red-50 rounded-lg p-2">
                  <p className="text-red-800 font-bold text-lg">{summary.absent}</p>
                  <p className="text-red-600">Absent</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-2">
                  <p className="text-yellow-800 font-bold text-lg">{summary.leave}</p>
                  <p className="text-yellow-600">Leave</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {showModal && selectedEmployee && (
        <EmployeeAttendanceModal
          employee={selectedEmployee}
          onClose={() => { setShowModal(false); setSelectedEmployee(null) }}
          isAdmin={true}
        />
      )}
    </div>
  )
}

export default AdminAttendance









