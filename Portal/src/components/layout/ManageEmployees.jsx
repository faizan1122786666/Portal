import { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { 
  FaPlus, FaEdit, FaTrash, FaTimes, FaSun, FaMoon, 
  FaUserTie, FaRegCheckCircle, FaBuilding, FaRegEdit,
  FaChevronLeft, FaChevronRight 
} from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { MdBadge } from 'react-icons/md'
import Loader from '../common/Loader'
import TableSkeleton from '../common/TableSkeleton'
import Skeleton from '../common/Skeleton'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { 
  apiGetEmployees, 
  apiAddEmployee, 
  apiUpdateEmployee, 
  apiDeleteEmployee 
} from '../../api/employeeAPI'
import Pagination from '../common/Pagination';

// ── Configuration Constants ──────────────────────────────────────────────────
const DEPARTMENTS = [
  "Development", "Design", "Marketing", "Human Resources", "Management", "Sales", "Operations"
]

const DESIGNATIONS = [
  "Senior Developer", "Junior Developer", "UI/UX Designer", "Graphics Designer",
  "HR Manager", "Project Manager", "Team Lead", "Marketing Head", "Sales Executive"
]

const DESIGNATION_COLORS = {
  "Senior Developer": "bg-blue-100 text-blue-700",
  "Junior Developer": "bg-sky-100 text-sky-700",
  "UI/UX Designer": "bg-purple-100 text-purple-700",
  "Graphics Designer": "bg-pink-100 text-pink-700",
  "HR Manager": "bg-emerald-100 text-emerald-700",
  "Project Manager": "bg-amber-100 text-amber-700",
  "Team Lead": "bg-orange-100 text-orange-700",
  "Marketing Head": "bg-indigo-100 text-indigo-700",
  "Sales Executive": "bg-rose-100 text-rose-700",
  "Management": "bg-slate-100 text-slate-700"
}

/**
 * Component: ManageEmployees
 * Description: A comprehensive administrative interface for managing employee records, including adding, editing, and deleting users.
 * Why: To provide administrators with a centralized system for employee lifecycle management and data organization.
 */
function DesignationBadge({ designation }) {
  if (!designation) return <span className="text-gray-300 italic text-xs">—</span>
  const color = DESIGNATION_COLORS[designation] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      <MdBadge size={11} />
      {designation}
    </span>
  )
}

// ── Shift config
const SHIFTS = [
  {
    value: 'Morning',
    label: 'Morning',
    time: '9:00 AM – 6:00 PM',
    icon: <FaSun size={13} />,
    active: 'border-[#2C5284] bg-[#2C5284] text-white',
    hover: 'border-gray-200 hover:border-[#2C5284]/50 text-gray-600',
    badge: 'bg-[#2C5284] text-white',
  },
  {
    value: 'Evening',
    label: 'Evening',
    time: '6:00 PM – 3:00 AM',
    icon: <FaMoon size={13} />,
    active: 'border-[#2C5284] bg-[#2C5284] text-white',
    hover: 'border-gray-200 hover:border-[#2C5284]/50 text-gray-600',
    badge: 'bg-[#2C5284] text-white',
  },
]

function ShiftBadge({ shift }) {
  const cfg = SHIFTS.find(s => s.value === shift)
  if (!cfg) return <span className="text-gray-300 italic text-xs">—</span>
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.badge}`}>
      {cfg.icon} {cfg.label}
    </span>
  )
}

// ── Add / Edit Modal ──────────────────────────────────────────────────────────
function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
  const [form, setForm] = useState({
    name: editingEmployee?.name || '',
    email: editingEmployee?.email || '',
    password: '',
    role: editingEmployee?.role || 'employee',
    department: editingEmployee?.department || '',
    designation: editingEmployee?.designation || '',
    shift: editingEmployee?.shift || '',
    salary: editingEmployee?.salary || 0,
  })
  const [error, setError] = useState('')

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleRoleChange = (e) => {
    const newRole = e.target.value
    setForm(prev => ({ ...prev, role: newRole, shift: newRole === 'admin' ? '' : prev.shift }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.email.trim()) { setError('Email is required.'); return }
    if (!editingEmployee && !form.password.trim()) { setError('Password is required for new employees.'); return }
    if (form.name.length > 14) { setError('Full name cannot exceed 14 characters.'); return }
    onSubmit(form)
  }

  const nameCount = form.name.length
  const nameAtLimit = nameCount >= 14
  const isEmployee = form.role === 'employee'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#292c35] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto  dark:border-white/10">

        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#2C5284] dark:bg-white/10 rounded-t-2xl">
          <h2 className="text-lg font-bold text-white">
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <button type="button" onClick={onClose}
            className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
            <FaTimes size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">{error}</div>
          )}

          {/* Full Name */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
              <span className={`text-xs font-medium transition-colors ${nameAtLimit ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>
                {nameCount}/14
              </span>
            </div>
            <input
              type="text" name="name" value={form.name} onChange={handle}
              maxLength={14} placeholder="e.g. Ali Hassan"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 focus:border-transparent outline-none text-sm transition-colors
                ${nameAtLimit
                  ? 'border-orange-300 bg-orange-50 dark:bg-orange-500/10'
                  : 'border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white'
                }`}
            />
            {nameAtLimit && <p className="text-xs text-orange-500 mt-1">Maximum 14 characters reached</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email" name="email" value={form.email} onChange={handle} required
              placeholder="employee@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 focus:border-transparent outline-none text-sm dark:bg-white/5 dark:text-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Password{' '}
              {editingEmployee
                ? <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(leave blank to keep current)</span>
                : <span className="text-red-500">*</span>
              }
            </label>
            <input
              type="password" name="password" value={form.password} onChange={handle}
              placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 focus:border-transparent outline-none text-sm dark:bg-white/5 dark:text-white"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {['employee', 'admin'].map((r) => (
                <label key={r}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
                    ${form.role === r
                      ? 'border-[#2C5284] bg-[#2C5284] dark:border-blue-500 dark:bg-blue-600 text-white'
                      : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-[#2C5284]/40 dark:hover:border-blue-500/40 bg-white dark:bg-white/5'
                    }`}
                >
                  <input type="radio" name="role" value={r} checked={form.role === r}
                    onChange={handleRoleChange} className="sr-only" />
                  {r === 'admin' ? <FaUserTie size={13} /> : <CgProfile size={13} />}
                  <span className="capitalize">{r}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Department</label>
            <select name="department" value={form.department} onChange={handle}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 focus:border-transparent outline-none text-sm bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200"
            >
              <option value="" className="dark:bg-[#292c35]">— Select Department —</option>
              {DEPARTMENTS.map((dept) => <option key={dept} value={dept} className="dark:bg-[#292c35]">{dept}</option>)}
            </select>
          </div>

          {/* ── Designation dropdown ── */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Designation</label>
            <select name="designation" value={form.designation} onChange={handle}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 focus:border-transparent outline-none text-sm bg-white dark:bg-white/5 text-gray-700 dark:text-gray-200"
            >
              <option value="" className="dark:bg-[#292c35]">— Select Designation —</option>
              {DESIGNATIONS.map((d) => <option key={d} value={d} className="dark:bg-[#292c35]">{d}</option>)}
            </select>
            {/* Live badge preview */}
            {form.designation && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">Preview:</span>
                <DesignationBadge designation={form.designation} />
              </div>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm">$</span>
              <input
                type="number" name="salary" value={form.salary} onChange={handle}
                placeholder="0.00"
                className="w-full pl-7 pr-4 py-2.5 border border-gray-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-[#2C5284] dark:focus:ring-blue-500/50 focus:border-transparent outline-none text-sm dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          {/* Shift — only for employees */}
          {isEmployee && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Work Shift{' '}
                <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">(optional)</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {SHIFTS.map(({ value, label, time, icon, active, hover }) => (
                  <label key={value}
                    className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none flex-1 min-w-[90px]
                      ${form.shift === value ? active : `bg-white dark:bg-white/5 ${hover}`}`}
                  >
                    <input type="radio" name="shift" value={value}
                      checked={form.shift === value} onChange={handle} className="sr-only" />
                    <span className="flex items-center gap-1.5">{icon} {label}</span>
                    <span className={`text-[10px] font-normal leading-tight text-center ${form.shift === value ? 'opacity-80' : 'text-gray-400 dark:text-gray-500'
                      }`}>
                      {time}
                    </span>
                  </label>
                ))}
                {form.shift && (
                  <button type="button"
                    onClick={() => setForm({ ...form, shift: '' })}
                    className="px-3 py-2.5 text-xs text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-colors self-stretch flex items-center"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Admin notice */}
          {!isEmployee && (
            <div className="bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20 rounded-lg px-4 py-3 text-xs text-yellow-700 dark:text-yellow-200 flex items-center gap-2">
              <FaUserTie size={12} />
              Admin accounts are not assigned to shifts.
            </div>
          )}

          {/* Live preview */}
          {(form.name || form.email || form.department) && (
            <div className="bg-blue-50 dark:bg-white/5 border border-blue-100 dark:border-white/10 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2C5284] dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {form.name
                    ? form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                    : <CgProfile size={16} />
                  }
                </span>
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{form.name || form.email || '—'}</p>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {form.role}{form.department ? ` · ${form.department}` : ''}
                  </p>
                  {form.designation && <DesignationBadge designation={form.designation} />}
                  {form.shift && isEmployee && <ShiftBadge shift={form.shift} />}
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm cursor-pointer">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-3 bg-[#2C5284] dark:bg-blue-600 cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] dark:hover:bg-blue-700 transition-colors text-sm">
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function ManageEmployees({ setTitle }) {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingEmp, setEditingEmp] = useState(null)
  const [search, setSearch] = useState('')
  const [filterDept, setFilterDept] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterShift, setFilterShift] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      // Fetch a large number to handle filtering and pagination client-side for better UX
      const res = await apiGetEmployees(1, 1000) 
      setEmployees(res.employees || [])
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitle('Manage Employees')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTitle])

  useEffect(() => {
    fetchEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async (form) => {
    try {
      if (editingEmp) {
        const payload = {
          email: form.email,
          role: form.role,
          department: form.department,
          designation: form.designation,
          name: form.name,
          salary: form.salary,
          shift: form.role === 'employee' ? form.shift : '',
        }
        if (form.password) payload.password = form.password
        await apiUpdateEmployee(editingEmp._id, payload)
        toast.success('Employee updated successfully!')
      } else {
        await apiAddEmployee({
          email: form.email,
          password: form.password,
          role: form.role,
          department: form.department,
          designation: form.designation,
          name: form.name,
          salary: form.salary,
          shift: form.role === 'employee' ? form.shift : '',
        })
        toast.success('Employee added successfully!')
      }
      fetchEmployees()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed')
    } finally {
      setShowModal(false)
      setEditingEmp(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    try {
      await apiDeleteEmployee(id)
      setEmployees(prev => prev.filter(e => e._id !== id))
      toast.success('Employee deleted.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete employee')
    }
  }

  const openEdit = (emp) => { setEditingEmp(emp); setShowModal(true) }

  const roleOptions = [
    { value: 'employee', label: 'Employee' },
    { value: 'admin', label: 'Admin' },
  ];

  const shiftOptions = SHIFTS.map(s => ({
    value: s.value,
    label: `${s.label} (${s.time})`
  }));

  const filtered = employees.filter(e => {
    const q = search.toLowerCase()
    const matchSearch = e.email?.toLowerCase().includes(q) || e.name?.toLowerCase().includes(q) || e.designation?.toLowerCase().includes(q)
    const matchDept = !filterDept ? true : e.department === filterDept.value
    const matchRole = !filterRole ? true : e.role === filterRole.value
    const matchShift = !filterShift ? true : e.shift === filterShift.value
    return matchSearch && matchDept && matchRole && matchShift
  })

  // Reset to page 1 when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterDept, filterRole, filterShift]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const stats = {
    total: employees.length,
    admins: employees.filter(e => e.role === 'admin').length,
    staff: employees.filter(e => e.role === 'employee').length,
  }

  const activeDepts = [...new Set(employees.map(e => e.department).filter(Boolean))]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-[#2C5284] dark:text-blue-300">Manage Employees</h1>
        <button
          onClick={() => { setEditingEmp(null); setShowModal(true) }}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-xl font-semibold hover:bg-[#1e3a5f] transition-all hover:shadow-md active:scale-[0.97] text-sm shadow"
        >
          <FaPlus size={12} />
          Add Employee
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {loading
          ? [...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-gray-100 dark:border-white/5 flex items-center justify-between shadow transition duration-300">
              <div className="space-y-2 flex-1">
                <Skeleton height="0.6rem" width="40%" />
                <Skeleton height="1.5rem" width="20%" />
              </div>
              <Skeleton variant="circular" width="2.5rem" height="2.5rem" className="shrink-0" />
            </div>
          ))
          : <>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition-all duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Total Users</p>
                <p className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <CgProfile size={20} className="text-white" />
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition-all duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Admins</p>
                <p className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-white">{stats.admins}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <FaUserTie size={20} className="text-white" />
              </div>
            </div>
            <div className="bg-white dark:bg-white/5 p-4 rounded-xl border-l-4 border-[#2C5284] dark:border-[#365F8D] flex items-center justify-between shadow hover:shadow-xl transition-all duration-300">
              <div>
                <p className="text-xs text-[#2C5284] dark:text-gray-300">Employees</p>
                <p className="text-xl sm:text-2xl font-bold text-[#365F8D] dark:text-white">{stats.staff}</p>
              </div>
              <div className="bg-[#365F8D] dark:bg-[#2C5282] w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                <FaRegCheckCircle size={20} className="text-white" />
              </div>
            </div>
          </>
        }
      </div>

      {/* Search + Filter bar */}
      <div className="bg-white dark:bg-white/5 rounded-xl shadow-sm p-4 mb-6 border border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Search Employee
            </label>
            <div className="relative">
              <input
                type="text" placeholder="Name, email, designation..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-white rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-xs"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2C5284]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Department
            </label>
            <Select
              value={filterDept}
              onChange={setFilterDept}
              options={activeDepts.map(d => ({ value: d, label: d }))}
              isClearable
              placeholder="All Departments"
              className="react-select-container text-xs"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
                  borderRadius: '0.5rem',
                  minHeight: '38px',
                  boxShadow: state.isFocused ? '0 0 0 1px #2C5284' : 'none',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer',
                  '&:active': { backgroundColor: '#2C5284' }
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Role
            </label>
            <Select
              value={filterRole}
              onChange={setFilterRole}
              options={roleOptions}
              isClearable
              placeholder="All Roles"
              className="react-select-container text-xs"
              classNamePrefix="react-select"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
                  borderRadius: '0.5rem',
                  minHeight: '38px',
                  boxShadow: state.isFocused ? '0 0 0 1px #2C5284' : 'none',
                  '&:hover': { borderColor: '#2C5284' },
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                  color: state.isSelected ? 'white' : 'inherit',
                  cursor: 'pointer',
                  '&:active': { backgroundColor: '#2C5284' }
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">
              Shift
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Select
                  value={filterShift}
                  onChange={setFilterShift}
                  options={shiftOptions}
                  isClearable
                  placeholder="All Shifts"
                  className="react-select-container text-xs"
                  classNamePrefix="react-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: 'transparent',
                      borderColor: state.isFocused ? '#2C5284' : '#d1d5db',
                      borderRadius: '0.5rem',
                      minHeight: '38px',
                      boxShadow: state.isFocused ? '0 0 0 1px #2C5284' : 'none',
                      '&:hover': { borderColor: '#2C5284' },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#2C5284' : state.isFocused ? 'rgba(44,82,132,0.08)' : 'transparent',
                      color: state.isSelected ? 'white' : 'inherit',
                      cursor: 'pointer',
                      '&:active': { backgroundColor: '#2C5284' }
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>
              {(search || filterDept || filterRole || filterShift) && (
                <button
                  onClick={() => { setSearch(''); setFilterDept(null); setFilterRole(null); setFilterShift(null); }}
                  className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-1 transition-colors"
                  title="Clear Filters"
                >
                  <FaPlus className="rotate-45" size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3 px-1">
        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {employees.length} users
      </p>

      {loading ? (
        <TableSkeleton rows={8} cols={7} />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white dark:bg-white/5 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-white/5">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/5">
              <thead className="bg-[#2C5284] dark:bg-white/10">
                <tr>
                  {['Employee', 'Designation', 'Department', 'Shift', 'Salary', 'Role', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-white dark:text-gray-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-[#292c35]">
                {paginated.length > 0 ? paginated.map(emp => (
                  <tr key={emp._id} className="hover:bg-blue-50/20 transition-colors">
                    {/* Employee */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                          {emp.profileImage ? (
                            <img
                              src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
                              alt={emp.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = emp.name
                                  ? `<span class="text-white text-xs font-bold">${emp.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}</span>`
                                  : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="20" width="20" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M858.5 763.6l-66.9-149.8C770.8 565.3 731.5 533 686 533h-10c-18.4 0-35.3 5.3-49.7 14.5a160 160 0 1 0-252.6 0A101.4 101.4 0 0 0 348 533h-10c-45.5 0-84.8 32.3-95.6 70.8l-66.9 149.8C162.7 782.9 178.5 811 202.9 811h618.2c24.4 0 40.2-28.1 27.4-47.4z"></path></svg>`;
                              }}
                            />
                          ) : (
                            emp.name
                              ? <span className="text-white text-xs font-bold">
                                {emp.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                              </span>
                              : <CgProfile size={20} className="text-white" />
                          )}
                        </div>
                        <div>
                          {emp.name && <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{emp.name}</p>}
                          <p className={`text-xs ${emp.name ? 'text-gray-500 dark:text-gray-400' : 'text-sm font-medium text-gray-900 dark:text-gray-100'}`}>{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Designation */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DesignationBadge designation={emp.designation} />
                    </td>
                    {/* Department */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {emp.department
                        ? <span className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300"><FaBuilding size={11} className="text-gray-400" />{emp.department}</span>
                        : <span className="text-gray-300 dark:text-gray-600 italic text-sm">—</span>
                      }
                    </td>
                    {/* Shift */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {emp.role === 'employee' ? <ShiftBadge shift={emp.shift} /> : <span className="text-gray-300 italic text-xs">N/A</span>}
                    </td>
                    {/* Salary */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {emp.salary ? `$${Number(emp.salary).toLocaleString()}` : <span className="text-gray-300 italic">—</span>}
                    </td>
                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {emp.role === 'admin' ? <FaUserTie size={10} /> : <CgProfile size={10} />}
                        <span className="capitalize">{emp.role}</span>
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(emp)}
                          className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          {/* <FaEdit size={15} /> */}
                           <FaRegEdit size={16} />
                        </button>
                        <button onClick={() => handleDelete(emp._id)}
                          className="p-1.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer" title="Delete">
                          {/* <FaTrash size={15} /> */}
                          <AiOutlineDelete size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-14 text-center text-gray-500">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {paginated.length > 0 ? paginated.map(emp => (
              <div key={emp._id} className="bg-white dark:bg-white/5 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-[#2C5284] dark:bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-white dark:border-white/10 shadow-sm">
                      {emp.profileImage ? (
                        <img
                          src={emp.profileImage.startsWith('http') ? emp.profileImage : `http://localhost:3000/uploads/profile/${emp.profileImage}`}
                          alt={emp.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = emp.name
                              ? `<span class="text-white text-xs font-bold">${emp.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}</span>`
                              : `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="24" width="24" xmlns="http://www.w3.org/2000/svg" class="text-white"><path d="M858.5 763.6l-66.9-149.8C770.8 565.3 731.5 533 686 533h-10c-18.4 0-35.3 5.3-49.7 14.5a160 160 0 1 0-252.6 0A101.4 101.4 0 0 0 348 533h-10c-45.5 0-84.8 32.3-95.6 70.8l-66.9 149.8C162.7 782.9 178.5 811 202.9 811h618.2c24.4 0 40.2-28.1 27.4-47.4z"></path></svg>`;
                          }}
                        />
                      ) : (
                        emp.name
                          ? <span className="text-white text-sm font-bold">
                            {emp.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                          </span>
                          : <CgProfile size={24} className="text-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      {emp.name && <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{emp.name}</p>}
                      <p className={`text-xs text-gray-500 dark:text-gray-400 truncate ${!emp.name ? 'font-semibold text-sm text-gray-900 dark:text-gray-100' : ''}`}>{emp.email}</p>
                      {emp.designation && <div className="mt-1"><DesignationBadge designation={emp.designation} /></div>}
                      {emp.department && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 mt-0.5">
                          <FaBuilding size={10} /> {emp.department}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize
                      ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {emp.role}
                    </span>
                    {emp.role === 'employee' && <ShiftBadge shift={emp.shift} />}
                  </div>
                </div>
                <div className="px-4 pb-3 flex justify-end gap-2 border-t border-gray-100 dark:border-white/5 pt-3">
                  <button onClick={() => openEdit(emp)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C5284] dark:text-blue-300 bg-blue-50 dark:bg-white/5 rounded-lg">
                    <FaEdit size={11} /> Edit
                  </button>
                  <button onClick={() => handleDelete(emp._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-lg">
                    <FaTrash size={11} /> Delete
                  </button>
                </div>
              </div>
            )) : (
              <div className="bg-white rounded-xl p-12 text-center text-gray-700 border border-gray-100">
                No employees found.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* Modal */}
      {showModal && (
        <EmployeeModal
          editingEmployee={editingEmp}
          onClose={() => { setShowModal(false); setEditingEmp(null) }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}

export default ManageEmployees