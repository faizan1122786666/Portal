// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const ManageEmployees = () => {
// //     const [employees, setEmployees] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [success, setSuccess] = useState('');
// //     const [showAddModal, setShowAddModal] = useState(false);
// //     const [showEditModal, setShowEditModal] = useState(false);
// //     const [selectedEmployee, setSelectedEmployee] = useState(null);
// //     const [formData, setFormData] = useState({
// //         email: '',
// //         password: ''
// //     });

// //     // Fetch all employees
// //     const fetchEmployees = async () => {
// //         setLoading(true);
// //         try {
// //             const response = await axios.get('http://localhost:3000/api/admin/employees', {
// //                 withCredentials: true
// //             });
// //             setEmployees(response.data.employees);
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to fetch employees');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchEmployees();
// //     }, []);

// //     // Handle form input change
// //     const handleChange = (e) => {
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value
// //         });
// //     };

// //     // Add new employee
// //     const handleAddEmployee = async (e) => {
// //         e.preventDefault();
// //         setError('');
// //         setSuccess('');

// //         if (!formData.email || !formData.password) {
// //             setError('All fields are required');
// //             return;
// //         }

// //         try {
// //             const response = await axios.post(
// //                 'http://localhost:3000/api/admin/employees',
// //                 formData,
// //                 { withCredentials: true }
// //             );

// //             setSuccess(response.data.message);
// //             setFormData({ email: '', password: '' });
// //             setShowAddModal(false);
// //             fetchEmployees(); // Refresh the list
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to add employee');
// //         }
// //     };

// //     // Update employee
// //     const handleUpdateEmployee = async (e) => {
// //         e.preventDefault();
// //         setError('');
// //         setSuccess('');

// //         try {
// //             const response = await axios.put(
// //                 `http://localhost:3000/api/admin/employees/${selectedEmployee._id}`,
// //                 formData,
// //                 { withCredentials: true }
// //             );

// //             setSuccess(response.data.message);
// //             setFormData({ email: '', password: '' });
// //             setShowEditModal(false);
// //             setSelectedEmployee(null);
// //             fetchEmployees(); // Refresh the list
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to update employee');
// //         }
// //     };

// //     // Delete employee
// //     const handleDeleteEmployee = async (id) => {
// //         if (!window.confirm('Are you sure you want to delete this employee?')) {
// //             return;
// //         }

// //         try {
// //             const response = await axios.delete(
// //                 `http://localhost:3000/api/admin/employees/${id}`,
// //                 { withCredentials: true }
// //             );

// //             setSuccess(response.data.message);
// //             fetchEmployees(); // Refresh the list
// //         } catch (err) {
// //             setError(err.response?.data?.message || 'Failed to delete employee');
// //         }
// //     };

// //     // Open edit modal with employee data
// //     const openEditModal = (employee) => {
// //         setSelectedEmployee(employee);
// //         setFormData({
// //             email: employee.email,
// //             password: '' // Don't prefill password
// //         });
// //         setShowEditModal(true);
// //     };

// //     return (
// //         <div className="p-6">
// //             {/* Header */}
// //             <div className="flex justify-between items-center mb-6">
// //                 <h1 className="text-3xl font-bold text-gray-800">Manage Employees</h1>
// //                 <button
// //                     onClick={() => {
// //                         setFormData({ email: '', password: '' });
// //                         setShowAddModal(true);
// //                         setError('');
// //                         setSuccess('');
// //                     }}
// //                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
// //                 >
// //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
// //                     </svg>
// //                     Add Employee
// //                 </button>
// //             </div>

// //             {/* Messages */}
// //             {error && (
// //                 <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
// //                     <p className="text-sm">{error}</p>
// //                 </div>
// //             )}

// //             {success && (
// //                 <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
// //                     <p className="text-sm">{success}</p>
// //                 </div>
// //             )}

// //             {/* Employee Table */}
// //             {loading ? (
// //                 <div className="flex justify-center items-center h-64">
// //                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //                 </div>
// //             ) : employees.length === 0 ? (
// //                 <div className="text-center py-12 bg-gray-50 rounded-lg">
// //                     <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //                     </svg>
// //                     <h3 className="mt-2 text-sm font-medium text-gray-900">No employees</h3>
// //                     <p className="mt-1 text-sm text-gray-500">Get started by adding a new employee.</p>
// //                 </div>
// //             ) : (
// //                 <div className="bg-white shadow-md rounded-lg overflow-hidden">
// //                     <table className="min-w-full divide-y divide-gray-200">
// //                         <thead className="bg-gray-50">
// //                             <tr>
// //                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Email
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Role
// //                                 </th>
// //                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Employee ID
// //                                 </th>
// //                                 <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                                     Actions
// //                                 </th>
// //                             </tr>
// //                         </thead>
// //                         <tbody className="bg-white divide-y divide-gray-200">
// //                             {employees.map((employee) => (
// //                                 <tr key={employee._id} className="hover:bg-gray-50 transition-colors">
// //                                     <td className="px-6 py-4 whitespace-nowrap">
// //                                         <div className="text-sm font-medium text-gray-900">{employee.email}</div>
// //                                     </td>
// //                                     <td className="px-6 py-4 whitespace-nowrap">
// //                                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
// //                                             {employee.role}
// //                                         </span>
// //                                     </td>
// //                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                                         {employee._id}
// //                                     </td>
// //                                     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
// //                                         <button
// //                                             onClick={() => openEditModal(employee)}
// //                                             className="text-blue-600 hover:text-blue-900 mr-4"
// //                                         >
// //                                             Edit
// //                                         </button>
// //                                         <button
// //                                             onClick={() => handleDeleteEmployee(employee._id)}
// //                                             className="text-red-600 hover:text-red-900"
// //                                         >
// //                                             Delete
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 </div>
// //             )}

// //             {/* Add Employee Modal */}
// //             {showAddModal && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
// //                         <div className="flex justify-between items-center mb-6">
// //                             <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
// //                             <button
// //                                 onClick={() => setShowAddModal(false)}
// //                                 className="text-gray-400 hover:text-gray-600 transition-colors"
// //                             >
// //                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
// //                                 </svg>
// //                             </button>
// //                         </div>

// //                         <form onSubmit={handleAddEmployee} className="space-y-4">
// //                             <div>
// //                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                                     Email
// //                                 </label>
// //                                 <input
// //                                     type="email"
// //                                     id="email"
// //                                     name="email"
// //                                     value={formData.email}
// //                                     onChange={handleChange}
// //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// //                                     placeholder="employee@example.com"
// //                                     required
// //                                 />
// //                             </div>

// //                             <div>
// //                                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
// //                                     Password
// //                                 </label>
// //                                 <input
// //                                     type="password"
// //                                     id="password"
// //                                     name="password"
// //                                     value={formData.password}
// //                                     onChange={handleChange}
// //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// //                                     placeholder="Enter password"
// //                                     required
// //                                 />
// //                             </div>

// //                             <div className="flex gap-3 pt-4">
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowAddModal(false)}
// //                                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button
// //                                     type="submit"
// //                                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
// //                                 >
// //                                     Add Employee
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}

// //             {/* Edit Employee Modal */}
// //             {showEditModal && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 m-4">
// //                         <div className="flex justify-between items-center mb-6">
// //                             <h2 className="text-2xl font-bold text-gray-800">Edit Employee</h2>
// //                             <button
// //                                 onClick={() => setShowEditModal(false)}
// //                                 className="text-gray-400 hover:text-gray-600 transition-colors"
// //                             >
// //                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
// //                                 </svg>
// //                             </button>
// //                         </div>

// //                         <form onSubmit={handleUpdateEmployee} className="space-y-4">
// //                             <div>
// //                                 <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700 mb-2">
// //                                     Email
// //                                 </label>
// //                                 <input
// //                                     type="email"
// //                                     id="edit-email"
// //                                     name="email"
// //                                     value={formData.email}
// //                                     onChange={handleChange}
// //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// //                                     placeholder="employee@example.com"
// //                                 />
// //                             </div>

// //                             <div>
// //                                 <label htmlFor="edit-password" className="block text-sm font-medium text-gray-700 mb-2">
// //                                     New Password (leave empty to keep current)
// //                                 </label>
// //                                 <input
// //                                     type="password"
// //                                     id="edit-password"
// //                                     name="password"
// //                                     value={formData.password}
// //                                     onChange={handleChange}
// //                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
// //                                     placeholder="Enter new password (optional)"
// //                                 />
// //                             </div>

// //                             <div className="flex gap-3 pt-4">
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowEditModal(false)}
// //                                     className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
// //                                 >
// //                                     Cancel
// //                                 </button>
// //                                 <button
// //                                     type="submit"
// //                                     className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
// //                                 >
// //                                     Update Employee
// //                                 </button>
// //                             </div>
// //                         </form>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default ManageEmployees;
























// import { useState, useEffect } from 'react'
// import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { FaUserTie } from 'react-icons/fa'
// import { FaRegCheckCircle } from 'react-icons/fa'
// import axios from 'axios'



//  // Axios instance (sends JWT cookie on every request) 

//  const api = await axios.create({
//      baseURL : 'http://localhost:3000/api/admin',
//      withCredentials : true
//  })



// // ── Add / Edit Modal ──────────────────────────────────────────────────────────
// function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
//   const [form, setForm] = useState({
//     name:       editingEmployee?.name       || '',
//     email:      editingEmployee?.email      || '',
//     password:   '',
//     designation: editingEmployee?.designation || '',
//     role:       editingEmployee?.role       || 'employee',
//   })
//   const [error, setError] = useState('')

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!form.name.trim() || !form.email.trim()) {
//       setError('Name and email are required.')
//       return
//     }
//     if (!editingEmployee && !form.password.trim()) {
//       setError('Password is required for new employees.')
//       return
//     }
//     onSubmit(form)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//           </h2>
//           <button type="button" onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
//             <FaTimes size={16} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Name */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Full Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text" name="name" value={form.name} onChange={handle} required
//               placeholder="e.g. Ali Hassan"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email" name="email" value={form.email} onChange={handle} required
//               placeholder="employee@example.com"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Password {editingEmployee ? <span className="text-gray-400 font-normal">(leave blank to keep current)</span> : <span className="text-red-500">*</span>}
//             </label>
//             <input
//               type="password" name="password" value={form.password} onChange={handle}
//               placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Designation */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Designation</label>
//             <input
//               type="text" name="designation" value={form.designation} onChange={handle}
//               placeholder="e.g. Software Engineer"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
//             <select
//               name="role" value={form.role} onChange={handle}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm bg-white"
//             >
//               <option value="employee">Employee</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
//               Cancel
//             </button>
//             <button type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
//               {editingEmployee ? 'Update Employee' : 'Add Employee'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function ManageEmployees({ setTitle }) {
//   const [employees, setEmployees] = useState([])
//   const [showModal, setShowModal]   = useState(false)
//   const [editingEmp, setEditingEmp] = useState(null)
//   const [search, setSearch]         = useState('')
//   const [successMsg, setSuccessMsg] = useState('')

//   useEffect(() => {
//     setTitle('Manage Employees')
//     // Load from mock data; include all users
//     setEmployees(mockUsersData.map(u => ({ ...u })))
//   }, [setTitle])

//   const showSuccess = (msg) => {
//     setSuccessMsg(msg)
//     setTimeout(() => setSuccessMsg(''), 3000)
//   }

//   const handleSubmit = (form) => {
//     if (editingEmp) {
//       setEmployees(prev => prev.map(e =>
//         e.id === editingEmp.id
//           ? { ...e, name: form.name, email: form.email, designation: form.designation, role: form.role,
//               ...(form.password ? { password: form.password } : {}) }
//           : e
//       ))
//       showSuccess('Employee updated successfully!')
//     } else {
//       const newEmp = {
//         id: Date.now(),
//         employeeId: employees.length + 10,
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         designation: form.designation,
//         role: form.role,
//       }
//       setEmployees(prev => [...prev, newEmp])
//       showSuccess('Employee added successfully!')
//     }
//     setShowModal(false)
//     setEditingEmp(null)
//   }

//   const handleDelete = (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return
//     setEmployees(prev => prev.filter(e => e.id !== id))
//     showSuccess('Employee deleted.')
//   }

//   const openEdit = (emp) => {
//     setEditingEmp(emp)
//     setShowModal(true)
//   }

//   const filtered = employees.filter(e =>
//     e.name?.toLowerCase().includes(search.toLowerCase()) ||
//     e.email?.toLowerCase().includes(search.toLowerCase())
//   )

//   const stats = {
//     total:   employees.length,
//     admins:  employees.filter(e => e.role === 'admin').length,
//     staff:   employees.filter(e => e.role !== 'admin').length,
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
//         <button
//           onClick={() => { setEditingEmp(null); setShowModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           <span className="hidden sm:inline">Add Employee</span>
//           <span className="sm:hidden">Add</span>
//         </button>
//       </div>

//       {/* Success Toast */}
//       {successMsg && (
//         <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
//           <FaRegCheckCircle /> {successMsg}
//         </div>
//       )}

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition-shadow min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Total</p>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.total}</h2>
//             <p className="text-xs text-gray-400 mt-0.5">Users</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <CgProfile size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition-shadow min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Admins</p>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.admins}</h2>
//             <p className="text-xs text-gray-400 mt-0.5">Accounts</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <FaUserTie size={20} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition-shadow min-h-24">
//           <div>
//             <p className="text-xs sm:text-sm text-[#2C5284]">Staff</p>
//             <h2 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.staff}</h2>
//             <p className="text-xs text-gray-400 mt-0.5">Employees</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//             <FaRegCheckCircle size={20} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//         />
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#2C5284]">
//             <tr>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Designation</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
//               <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filtered.length > 0 ? filtered.map(emp => (
//               <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
//                       <p className="text-xs text-gray-500">{emp.email}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {emp.designation || <span className="text-gray-400 italic">—</span>}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
//                     ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                     {emp.role === 'admin' ? 'Admin' : 'Employee'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center gap-2">
//                     <button onClick={() => openEdit(emp)}
//                       className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
//                       <FaEdit size={16} />
//                     </button>
//                     <button onClick={() => handleDelete(emp.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                       <FaTrash size={16} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )) : (
//               <tr>
//                 <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
//                   No employees found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="lg:hidden space-y-3">
//         {filtered.length > 0 ? filtered.map(emp => (
//           <div key={emp.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <div className="p-4 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center flex-shrink-0">
//                   <CgProfile size={20} className="text-white" />
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900 text-sm">{emp.name}</p>
//                   <p className="text-xs text-gray-500">{emp.email}</p>
//                   {emp.designation && <p className="text-xs text-gray-400">{emp.designation}</p>}
//                 </div>
//               </div>
//               <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
//                 ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                 {emp.role === 'admin' ? 'Admin' : 'Employee'}
//               </span>
//             </div>
//             <div className="px-4 pb-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
//               <button onClick={() => openEdit(emp)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg">
//                 <FaEdit size={12} /> Edit
//               </button>
//               <button onClick={() => handleDelete(emp.id)}
//                 className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg">
//                 <FaTrash size={12} /> Delete
//               </button>
//             </div>
//           </div>
//         )) : (
//           <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//             No employees found.
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <EmployeeModal
//           editingEmployee={editingEmp}
//           onClose={() => { setShowModal(false); setEditingEmp(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageEmployees










// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { FaUserTie } from 'react-icons/fa'
// import { FaRegCheckCircle } from 'react-icons/fa'

// // ── Axios instance (sends JWT cookie on every request) ────────────────────────
// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/admin',
//   withCredentials: true,
// })

// // ── Add / Edit Modal ──────────────────────────────────────────────────────────
// function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
//   const [form, setForm] = useState({
//     email:    editingEmployee?.email || '',
//     password: '',
//   })
//   const [error, setError] = useState('')

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!form.email.trim()) {
//       setError('Email is required.')
//       return
//     }
//     if (!editingEmployee && !form.password.trim()) {
//       setError('Password is required for new employees.')
//       return
//     }
//     onSubmit(form)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//           </h2>
//           <button type="button" onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
//             <FaTimes size={16} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email" name="email" value={form.email} onChange={handle} required
//               placeholder="employee@example.com"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Password{' '}
//               {editingEmployee
//                 ? <span className="text-gray-400 font-normal">(leave blank to keep current)</span>
//                 : <span className="text-red-500">*</span>
//               }
//             </label>
//             <input
//               type="password" name="password" value={form.password} onChange={handle}
//               placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
//               Cancel
//             </button>
//             <button type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
//               {editingEmployee ? 'Update Employee' : 'Add Employee'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function ManageEmployees({ setTitle }) {
//   const [employees, setEmployees] = useState([])
//   const [loading, setLoading]     = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingEmp, setEditingEmp] = useState(null)
//   const [search, setSearch]       = useState('')
//   const [successMsg, setSuccessMsg] = useState('')
//   const [errorMsg, setErrorMsg]   = useState('')

//   // ── Fetch all employees ──────────────────────────────────────────────────
//   const fetchEmployees = async () => {
//     setLoading(true)
//     try {
//       const res = await api.get('/employees')
//       setEmployees(res.data.employees)
//     } catch (err) {
//       setErrorMsg(err.response?.data?.message || 'Failed to fetch employees')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setTitle('Manage Employees')
//     fetchEmployees()
//   }, [setTitle])

//   const showSuccess = (msg) => {
//     setSuccessMsg(msg)
//     setTimeout(() => setSuccessMsg(''), 3000)
//   }

//   const showError = (msg) => {
//     setErrorMsg(msg)
//     setTimeout(() => setErrorMsg(''), 4000)
//   }

//   // ── Add or Update ────────────────────────────────────────────────────────
//   const handleSubmit = async (form) => {
//     try {
//       if (editingEmp) {
//         // Only send fields that have values
//         const payload = { email: form.email }
//         if (form.password) payload.password = form.password

//         await api.put(`/employees/${editingEmp._id}`, payload)
//         showSuccess('Employee updated successfully!')
//       } else {
//         await api.post('/employees', { email: form.email, password: form.password })
//         showSuccess('Employee added successfully!')
//       }
//       fetchEmployees()
//     } catch (err) {
//       showError(err.response?.data?.message || 'Operation failed')
//     } finally {
//       setShowModal(false)
//       setEditingEmp(null)
//     }
//   }

//   // ── Delete ───────────────────────────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return
//     try {
//       await api.delete(`/employees/${id}`)
//       setEmployees(prev => prev.filter(e => e._id !== id))
//       showSuccess('Employee deleted.')
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to delete employee')
//     }
//   }

//   const openEdit = (emp) => {
//     setEditingEmp(emp)
//     setShowModal(true)
//   }

//   const filtered = employees.filter(e =>
//     e.email?.toLowerCase().includes(search.toLowerCase())
//   )

//   const stats = {
//     total:  employees.length,
//     admins: employees.filter(e => e.role === 'admin').length,
//     staff:  employees.filter(e => e.role !== 'admin').length,
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
//         <button
//           onClick={() => { setEditingEmp(null); setShowModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           <span className="hidden sm:inline">Add Employee</span>
//           <span className="sm:hidden">Add</span>
//         </button>
//       </div>

//       {/* Toasts */}
//       {successMsg && (
//         <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
//           <FaRegCheckCircle /> {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
//           {errorMsg}
//         </div>
//       )}

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         {[
//           { label: 'Total',  value: stats.total,  sub: 'Users',     icon: <CgProfile size={24} className="text-white" /> },
//           { label: 'Admins', value: stats.admins, sub: 'Accounts',  icon: <FaUserTie size={20} className="text-white" /> },
//           { label: 'Staff',  value: stats.staff,  sub: 'Employees', icon: <FaRegCheckCircle size={20} className="text-white" /> },
//         ].map(card => (
//           <div key={card.label}
//             className="bg-white p-4 sm:p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow hover:shadow-xl transition-shadow min-h-24">
//             <div>
//               <p className="text-xs sm:text-sm text-[#2C5284]">{card.label}</p>
//               <h2 className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{card.value}</h2>
//               <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
//             </div>
//             <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md">
//               {card.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
//         <input
//           type="text"
//           placeholder="Search by email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//         />
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5284]"></div>
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Role</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee ID</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filtered.length > 0 ? filtered.map(emp => (
//                   <tr key={emp._id} className="hover:bg-blue-50/30 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center flex-shrink-0">
//                           <CgProfile size={20} className="text-white" />
//                         </div>
//                         <p className="text-sm font-semibold text-gray-900">{emp.email}</p>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
//                         ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                         {emp.role === 'admin' ? 'Admin' : 'Employee'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
//                       {emp._id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <button onClick={() => openEdit(emp)}
//                           className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
//                           <FaEdit size={16} />
//                         </button>
//                         <button onClick={() => handleDelete(emp._id)}
//                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <FaTrash size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
//                       No employees found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-3">
//             {filtered.length > 0 ? filtered.map(emp => (
//               <div key={emp._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//                 <div className="p-4 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 rounded-full bg-[#365F8D] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900 text-sm">{emp.email}</p>
//                       <p className="text-xs text-gray-400 font-mono">{emp._id}</p>
//                     </div>
//                   </div>
//                   <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
//                     ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                     {emp.role === 'admin' ? 'Admin' : 'Employee'}
//                   </span>
//                 </div>
//                 <div className="px-4 pb-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
//                   <button onClick={() => openEdit(emp)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg">
//                     <FaEdit size={12} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(emp._id)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg">
//                     <FaTrash size={12} /> Delete
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="bg-white rounded-xl p-10 text-center text-gray-400 italic border border-gray-100">
//                 No employees found.
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <EmployeeModal
//           editingEmployee={editingEmp}
//           onClose={() => { setShowModal(false); setEditingEmp(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageEmployees






















// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { FaUserTie, FaRegCheckCircle, FaBuilding } from 'react-icons/fa'

// // ── Axios instance ────────────────────────────────────────────────────────────
// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/admin',
//   withCredentials: true,
// })

// // ── Department options ────────────────────────────────────────────────────────
// const DEPARTMENTS = [
//   'Engineering',
//   'Design',
//   'Marketing',
//   'Sales',
//   'Human Resources',
//   'Finance',
//   'Operations',
//   'Customer Support',
//   'Legal',
//   'Product',
// ]

// // ── Add / Edit Modal ──────────────────────────────────────────────────────────
// function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
//   const [form, setForm] = useState({
//     email:      editingEmployee?.email      || '',
//     password:   '',
//     role:       editingEmployee?.role       || 'employee',
//     department: editingEmployee?.department || '',
//   })
//   const [error, setError] = useState('')

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!form.email.trim()) {
//       setError('Email is required.')
//       return
//     }
//     if (!editingEmployee && !form.password.trim()) {
//       setError('Password is required for new employees.')
//       return
//     }
//     onSubmit(form)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//           </h2>
//           <button type="button" onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
//             <FaTimes size={16} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email" name="email" value={form.email} onChange={handle} required
//               placeholder="employee@example.com"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Password{' '}
//               {editingEmployee
//                 ? <span className="text-gray-400 font-normal text-xs">(leave blank to keep current)</span>
//                 : <span className="text-red-500">*</span>
//               }
//             </label>
//             <input
//               type="password" name="password" value={form.password} onChange={handle}
//               placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Role — radio pill buttons */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Role <span className="text-red-500">*</span>
//             </label>
//             <div className="flex gap-3">
//               {['employee', 'admin'].map((r) => (
//                 <label key={r}
//                   className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
//                     ${form.role === r
//                       ? 'border-[#2C5284] bg-[#2C5284] text-white'
//                       : 'border-gray-200 text-gray-600 hover:border-[#2C5284]/40 bg-white'
//                     }`}
//                 >
//                   <input
//                     type="radio" name="role" value={r}
//                     checked={form.role === r}
//                     onChange={handle}
//                     className="sr-only"
//                   />
//                   {r === 'admin' ? <FaUserTie size={13} /> : <CgProfile size={13} />}
//                   <span className="capitalize">{r}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Department — dropdown */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Department
//             </label>
//             <select
//               name="department"
//               value={form.department}
//               onChange={handle}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm bg-white text-gray-700"
//             >
//               <option value="">— Select Department —</option>
//               {DEPARTMENTS.map((dept) => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           {/* Live preview badge */}
//           {(form.email || form.department) && (
//             <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                 <CgProfile size={16} className="text-white" />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-sm font-semibold text-gray-800 truncate">{form.email || '—'}</p>
//                 <p className="text-xs text-gray-500 capitalize">
//                   {form.role}{form.department ? ` · ${form.department}` : ''}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Action buttons */}
//           <div className="flex gap-3 pt-1">
//             <button type="button" onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
//               Cancel
//             </button>
//             <button type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
//               {editingEmployee ? 'Update Employee' : 'Add Employee'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function ManageEmployees({ setTitle }) {
//   const [employees, setEmployees]   = useState([])
//   const [loading, setLoading]       = useState(true)
//   const [showModal, setShowModal]   = useState(false)
//   const [editingEmp, setEditingEmp] = useState(null)
//   const [search, setSearch]         = useState('')
//   const [filterDept, setFilterDept] = useState('')
//   const [filterRole, setFilterRole] = useState('')
//   const [successMsg, setSuccessMsg] = useState('')
//   const [errorMsg, setErrorMsg]     = useState('')

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   const fetchEmployees = async () => {
//     setLoading(true)
//     try {
//       const res = await api.get('/employees')
//       setEmployees(res.data.employees)
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to fetch employees')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setTitle('Manage Employees')
//     fetchEmployees()
//   }, [setTitle])

//   const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 3000) }
//   const showError   = (msg) => { setErrorMsg(msg);   setTimeout(() => setErrorMsg(''),   4000) }

//   // ── Add / Edit submit ────────────────────────────────────────────────────
//   const handleSubmit = async (form) => {
//     try {
//       if (editingEmp) {
//         const payload = {
//           email:      form.email,
//           role:       form.role,
//           department: form.department,
//         }
//         if (form.password) payload.password = form.password
//         await api.put(`/employees/${editingEmp._id}`, payload)
//         showSuccess('Employee updated successfully!')
//       } else {
//         await api.post('/employees', {
//           email:      form.email,
//           password:   form.password,
//           role:       form.role,
//           department: form.department,
//         })
//         showSuccess('Employee added successfully!')
//       }
//       fetchEmployees()
//     } catch (err) {
//       showError(err.response?.data?.message || 'Operation failed')
//     } finally {
//       setShowModal(false)
//       setEditingEmp(null)
//     }
//   }

//   // ── Delete ───────────────────────────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return
//     try {
//       await api.delete(`/employees/${id}`)
//       setEmployees(prev => prev.filter(e => e._id !== id))
//       showSuccess('Employee deleted.')
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to delete employee')
//     }
//   }

//   const openEdit = (emp) => { setEditingEmp(emp); setShowModal(true) }

//   // ── Filter logic ─────────────────────────────────────────────────────────
//   const filtered = employees.filter(e => {
//     const matchSearch = e.email?.toLowerCase().includes(search.toLowerCase())
//     const matchDept   = filterDept ? e.department === filterDept : true
//     const matchRole   = filterRole ? e.role === filterRole       : true
//     return matchSearch && matchDept && matchRole
//   })

//   const stats = {
//     total:  employees.length,
//     admins: employees.filter(e => e.role === 'admin').length,
//     staff:  employees.filter(e => e.role === 'employee').length,
//   }

//   // departments that actually exist in the data (for filter dropdown)
//   const activeDepts = [...new Set(employees.map(e => e.department).filter(Boolean))]

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
//         <button
//           onClick={() => { setEditingEmp(null); setShowModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           Add Employee
//         </button>
//       </div>

//       {/* Toasts */}
//       {successMsg && (
//         <div className="mb-4 bg-green-50 border border-green-200 text-g px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
//           <FaRegCheckCircle /> {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
//           {errorMsg}
//         </div>
//       )}

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         {[
//           { label: 'Total Users', value: stats.total,  icon: <CgProfile size={24} className="text-white" />,        border: 'border-[#2C5284]'  },
//           { label: 'Admins',      value: stats.admins, icon: <FaUserTie size={24} className="text-white" />,         border: 'border-[#2C5284]' },
//           { label: 'Employees',   value: stats.staff,  icon: <FaRegCheckCircle size={24} className="text-white" />,  border: 'border-[#2C5284]'  },
//         ].map(card => (
//           <div key={card.label}
//             className={`bg-white p-5 rounded-xl border-l-4 ${card.border} flex items-center justify-between shadow-sm hover:shadow-md transition-shadow`}>
//             <div>
//               <p className="text-xs text-gray-500 font-medium">{card.label}</p>
//               <h2 className="text-3xl font-bold text-[#2C5284] mt-0.5">{card.value}</h2>
//             </div>
//             <div className="bg-[#2C5284] w-11 h-11 rounded-full flex items-center justify-center shadow">
//               {card.icon}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Search + Filter bar */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100 flex flex-col sm:flex-row gap-3">
//         <input
//           type="text"
//           placeholder="Search by email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//         />
//         <select
//           value={filterDept}
//           onChange={e => setFilterDept(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[160px]"
//         >
//           <option value="">All Departments</option>
//           {activeDepts.map(d => <option key={d} value={d}>{d}</option>)}
//         </select>
//         <select
//           value={filterRole}
//           onChange={e => setFilterRole(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[130px]"
//         >
//           <option value="">All Roles</option>
//           <option value="employee">Employee</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>

//       <p className="text-xs text-gray-400 mb-3 px-1">
//         Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {employees.length} users
//       </p>

//       {/* Loading spinner */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5284]" />
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   {['Employee', 'Department', 'Role', 'Actions'].map(h => (
//                     <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-white">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filtered.length > 0 ? filtered.map(emp => (
//                   <tr key={emp._id} className="hover:bg-blue-50/20 transition-colors">

//                     {/* Employee cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                           <CgProfile size={18} className="text-white" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900">{emp.email}</p>
//                           <p className="text-xs text-gray-400 font-mono">{emp._id}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Department cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {emp.department ? (
//                         <span className="flex items-center gap-1.5 text-sm text-gray-700">
//                           <FaBuilding size={11} className="text-gray-400" />
//                           {emp.department}
//                         </span>
//                       ) : (
//                         <span className="text-gray-300 italic text-sm">—</span>
//                       )}
//                     </td>

//                     {/* Role cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
//                         ${emp.role === 'admin'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-blue-100 text-blue-800'}`}>
//                         {emp.role === 'admin' ? <FaUserTie size={10} /> : <CgProfile size={10} />}
//                         <span className="capitalize">{emp.role}</span>
//                       </span>
//                     </td>

//                     {/* Actions cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <button onClick={() => openEdit(emp)}
//                           className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
//                           <FaEdit size={15} />
//                         </button>
//                         <button onClick={() => handleDelete(emp._id)}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <FaTrash size={15} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-14 text-center text-gray-400 italic">
//                       No employees found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-3">
//             {filtered.length > 0 ? filtered.map(emp => (
//               <div key={emp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="p-4 flex items-start justify-between gap-3">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="font-semibold text-gray-900 text-sm truncate">{emp.email}</p>
//                       {emp.department && (
//                         <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                           <FaBuilding size={10} /> {emp.department}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold capitalize
//                     ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                     {emp.role}
//                   </span>
//                 </div>
//                 <div className="px-4 pb-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
//                   <button onClick={() => openEdit(emp)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C5284] bg-blue-50 rounded-lg">
//                     <FaEdit size={11} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(emp._id)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg">
//                     <FaTrash size={11} /> Delete
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="bg-white rounded-xl p-12 text-center text-gray-400 italic border border-gray-100">
//                 No employees found.
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <EmployeeModal
//           editingEmployee={editingEmp}
//           onClose={() => { setShowModal(false); setEditingEmp(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageEmployees


















// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { FaUserTie, FaRegCheckCircle, FaBuilding } from 'react-icons/fa'

// // ── Axios instance ────────────────────────────────────────────────────────────
// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/admin',
//   withCredentials: true,
// })

// // ── Department options ────────────────────────────────────────────────────────
// const DEPARTMENTS = [
//   'Engineering',
//   'Design',
//   'Marketing',
//   'Sales',
//   'Human Resources',
//   'Finance',
//   'Operations',
//   'Customer Support',
//   'Legal',
//   'Product',
// ]

// // ── Add / Edit Modal ──────────────────────────────────────────────────────────
// function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
//   const [form, setForm] = useState({
//     email:      editingEmployee?.email      || '',
//     password:   '',
//     role:       editingEmployee?.role       || 'employee',
//     department: editingEmployee?.department || '',
//   })
//   const [error, setError] = useState('')

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!form.email.trim()) {
//       setError('Email is required.')
//       return
//     }
//     if (!editingEmployee && !form.password.trim()) {
//       setError('Password is required for new employees.')
//       return
//     }
//     onSubmit(form)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//           </h2>
//           <button type="button" onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
//             <FaTimes size={16} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email" name="email" value={form.email} onChange={handle} required
//               placeholder="employee@example.com"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Password{' '}
//               {editingEmployee
//                 ? <span className="text-gray-400 font-normal text-xs">(leave blank to keep current)</span>
//                 : <span className="text-red-500">*</span>
//               }
//             </label>
//             <input
//               type="password" name="password" value={form.password} onChange={handle}
//               placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Role — radio pill buttons */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Role <span className="text-red-500">*</span>
//             </label>
//             <div className="flex gap-3">
//               {['employee', 'admin'].map((r) => (
//                 <label key={r}
//                   className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
//                     ${form.role === r
//                       ? 'border-[#2C5284] bg-[#2C5284] text-white'
//                       : 'border-gray-200 text-gray-600 hover:border-[#2C5284]/40 bg-white'
//                     }`}
//                 >
//                   <input
//                     type="radio" name="role" value={r}
//                     checked={form.role === r}
//                     onChange={handle}
//                     className="sr-only"
//                   />
//                   {r === 'admin' ? <FaUserTie size={13} /> : <CgProfile size={13} />}
//                   <span className="capitalize">{r}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Department — dropdown */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Department
//             </label>
//             <select
//               name="department"
//               value={form.department}
//               onChange={handle}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm bg-white text-gray-700"
//             >
//               <option value="">— Select Department —</option>
//               {DEPARTMENTS.map((dept) => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           {/* Live preview badge */}
//           {(form.email || form.department) && (
//             <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                 <CgProfile size={16} className="text-white" />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-sm font-semibold text-gray-800 truncate">{form.email || '—'}</p>
//                 <p className="text-xs text-gray-500 capitalize">
//                   {form.role}{form.department ? ` · ${form.department}` : ''}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Action buttons */}
//           <div className="flex gap-3 pt-1">
//             <button type="button" onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
//               Cancel
//             </button>
//             <button type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
//               {editingEmployee ? 'Update Employee' : 'Add Employee'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function ManageEmployees({ setTitle }) {
//   const [employees, setEmployees]   = useState([])
//   const [loading, setLoading]       = useState(true)
//   const [showModal, setShowModal]   = useState(false)
//   const [editingEmp, setEditingEmp] = useState(null)
//   const [search, setSearch]         = useState('')
//   const [filterDept, setFilterDept] = useState('')
//   const [filterRole, setFilterRole] = useState('')
//   const [successMsg, setSuccessMsg] = useState('')
//   const [errorMsg, setErrorMsg]     = useState('')

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   const fetchEmployees = async () => {
//     setLoading(true)
//     try {
//       const res = await api.get('/employees')
//       setEmployees(res.data.employees)
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to fetch employees')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setTitle('Manage Employees')
//     fetchEmployees()
//   }, [setTitle])

//   const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(''), 3000) }
//   const showError   = (msg) => { setErrorMsg(msg);   setTimeout(() => setErrorMsg(''),   4000) }

//   // ── Add / Edit submit ────────────────────────────────────────────────────
//   const handleSubmit = async (form) => {
//     try {
//       if (editingEmp) {
//         const payload = {
//           email:      form.email,
//           role:       form.role,
//           department: form.department,
//         }
//         if (form.password) payload.password = form.password
//         await api.put(`/employees/${editingEmp._id}`, payload)
//         showSuccess('Employee updated successfully!')
//       } else {
//         await api.post('/employees', {
//           email:      form.email,
//           password:   form.password,
//           role:       form.role,
//           department: form.department,
//         })
//         showSuccess('Employee added successfully!')
//       }
//       fetchEmployees()
//     } catch (err) {
//       showError(err.response?.data?.message || 'Operation failed')
//     } finally {
//       setShowModal(false)
//       setEditingEmp(null)
//     }
//   }

//   // ── Delete ───────────────────────────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return
//     try {
//       await api.delete(`/employees/${id}`)
//       setEmployees(prev => prev.filter(e => e._id !== id))
//       showSuccess('Employee deleted.')
//     } catch (err) {
//       showError(err.response?.data?.message || 'Failed to delete employee')
//     }
//   }

//   const openEdit = (emp) => { setEditingEmp(emp); setShowModal(true) }

//   // ── Filter logic ─────────────────────────────────────────────────────────
//   const filtered = employees.filter(e => {
//     const matchSearch = e.email?.toLowerCase().includes(search.toLowerCase())
//     const matchDept   = filterDept ? e.department === filterDept : true
//     const matchRole   = filterRole ? e.role === filterRole       : true
//     return matchSearch && matchDept && matchRole
//   })

//   const stats = {
//     total:  employees.length,
//     admins: employees.filter(e => e.role === 'admin').length,
//     staff:  employees.filter(e => e.role === 'employee').length,
//   }

//   // departments that actually exist in the data (for filter dropdown)
//   const activeDepts = [...new Set(employees.map(e => e.department).filter(Boolean))]

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
//         <button
//           onClick={() => { setEditingEmp(null); setShowModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           Add Employee
//         </button>
//       </div>

//       {/* Toasts */}
//       {successMsg && (
//         <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
//           <FaRegCheckCircle /> {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
//           {errorMsg}
//         </div>
//       )}

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Total Users</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.total}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <CgProfile size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Admins</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.admins}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaUserTie size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Employees</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.staff}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Search + Filter bar */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100 flex flex-col sm:flex-row gap-3">
//         <input
//           type="text"
//           placeholder="Search by email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//         />
//         <select
//           value={filterDept}
//           onChange={e => setFilterDept(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[160px]"
//         >
//           <option value="">All Departments</option>
//           {activeDepts.map(d => <option key={d} value={d}>{d}</option>)}
//         </select>
//         <select
//           value={filterRole}
//           onChange={e => setFilterRole(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[130px]"
//         >
//           <option value="">All Roles</option>
//           <option value="employee">Employee</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>

//       <p className="text-xs text-gray-400 mb-3 px-1">
//         Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {employees.length} users
//       </p>

//       {/* Loading spinner */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5284]" />
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   {['Employee', 'Department', 'Role', 'Actions'].map(h => (
//                     <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-white">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filtered.length > 0 ? filtered.map(emp => (
//                   <tr key={emp._id} className="hover:bg-blue-50/20 transition-colors">

//                     {/* Employee cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                           <CgProfile size={18} className="text-white" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900">{emp.email}</p>
//                           <p className="text-xs text-gray-400 font-mono">{emp._id}</p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Department cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {emp.department ? (
//                         <span className="flex items-center gap-1.5 text-sm text-gray-700">
//                           <FaBuilding size={11} className="text-gray-400" />
//                           {emp.department}
//                         </span>
//                       ) : (
//                         <span className="text-gray-300 italic text-sm">—</span>
//                       )}
//                     </td>

//                     {/* Role cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
//                         ${emp.role === 'admin'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-blue-100 text-blue-800'}`}>
//                         {emp.role === 'admin' ? <FaUserTie size={10} /> : <CgProfile size={10} />}
//                         <span className="capitalize">{emp.role}</span>
//                       </span>
//                     </td>

//                     {/* Actions cell */}
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <button onClick={() => openEdit(emp)}
//                           className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
//                           <FaEdit size={15} />
//                         </button>
//                         <button onClick={() => handleDelete(emp._id)}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <FaTrash size={15} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-14 text-center text-gray-400 italic">
//                       No employees found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-3">
//             {filtered.length > 0 ? filtered.map(emp => (
//               <div key={emp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="p-4 flex items-start justify-between gap-3">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="font-semibold text-gray-900 text-sm truncate">{emp.email}</p>
//                       {emp.department && (
//                         <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                           <FaBuilding size={10} /> {emp.department}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold capitalize
//                     ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                     {emp.role}
//                   </span>
//                 </div>
//                 <div className="px-4 pb-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
//                   <button onClick={() => openEdit(emp)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C5284] bg-blue-50 rounded-lg">
//                     <FaEdit size={11} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(emp._id)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg">
//                     <FaTrash size={11} /> Delete
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="bg-white rounded-xl p-12 text-center text-gray-700  border border-gray-100">
//                 No employees found.
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <EmployeeModal
//           editingEmployee={editingEmp}
//           onClose={() => { setShowModal(false); setEditingEmp(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageEmployees





















// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { FaUserTie, FaRegCheckCircle, FaBuilding } from 'react-icons/fa'

// // ── Axios instance ────────────────────────────────────────────────────────────
// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/admin',
//   withCredentials: true,
// })

// // ── Department options ────────────────────────────────────────────────────────
// const DEPARTMENTS = [
//   'Engineering',
//   'Design',
//   'Marketing',
//   'Sales',
//   'Human Resources',
//   'Finance',
//   'Operations',
//   'Customer Support',
//   'Legal',
//   'Product',
// ]

// // ── Add / Edit Modal ──────────────────────────────────────────────────────────
// function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
//   const [form, setForm] = useState({
//     email:      editingEmployee?.email      || '',
//     password:   '',
//     role:       editingEmployee?.role       || 'employee',
//     department: editingEmployee?.department || '',
//   })
//   const [error, setError] = useState('')

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')
//     if (!form.email.trim()) {
//       setError('Email is required.')
//       return
//     }
//     if (!editingEmployee && !form.password.trim()) {
//       setError('Password is required for new employees.')
//       return
//     }
//     onSubmit(form)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//           </h2>
//           <button type="button" onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
//             <FaTimes size={16} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email" name="email" value={form.email} onChange={handle} required
//               placeholder="employee@example.com"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Password{' '}
//               {editingEmployee
//                 ? <span className="text-gray-400 font-normal text-xs">(leave blank to keep current)</span>
//                 : <span className="text-red-500">*</span>
//               }
//             </label>
//             <input
//               type="password" name="password" value={form.password} onChange={handle}
//               placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Role — radio pill buttons */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Role <span className="text-red-500">*</span>
//             </label>
//             <div className="flex gap-3">
//               {['employee', 'admin'].map((r) => (
//                 <label key={r}
//                   className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
//                     ${form.role === r
//                       ? 'border-[#2C5284] bg-[#2C5284] text-white'
//                       : 'border-gray-200 text-gray-600 hover:border-[#2C5284]/40 bg-white'
//                     }`}
//                 >
//                   <input
//                     type="radio" name="role" value={r}
//                     checked={form.role === r}
//                     onChange={handle}
//                     className="sr-only"
//                   />
//                   {r === 'admin' ? <FaUserTie size={13} /> : <CgProfile size={13} />}
//                   <span className="capitalize">{r}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Department — dropdown */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Department
//             </label>
//             <select
//               name="department"
//               value={form.department}
//               onChange={handle}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm bg-white text-gray-700"
//             >
//               <option value="">— Select Department —</option>
//               {DEPARTMENTS.map((dept) => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           {/* Live preview badge */}
//           {(form.email || form.department) && (
//             <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                 <CgProfile size={16} className="text-white" />
//               </div>
//               <div className="overflow-hidden">
//                 <p className="text-sm font-semibold text-gray-800 truncate">{form.email || '—'}</p>
//                 <p className="text-xs text-gray-500 capitalize">
//                   {form.role}{form.department ? ` · ${form.department}` : ''}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Action buttons */}
//           <div className="flex gap-3 pt-1">
//             <button type="button" onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
//               Cancel
//             </button>
//             <button type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
//               {editingEmployee ? 'Update Employee' : 'Add Employee'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function ManageEmployees({ setTitle }) {
//   const [employees, setEmployees]   = useState([])
//   const [loading, setLoading]       = useState(true)
//   const [showModal, setShowModal]   = useState(false)
//   const [editingEmp, setEditingEmp] = useState(null)
//   const [search, setSearch]         = useState('')
//   const [filterDept, setFilterDept] = useState('')
//   const [filterRole, setFilterRole] = useState('')

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   const fetchEmployees = async () => {
//     setLoading(true)
//     try {
//       const res = await api.get('/employees')
//       setEmployees(res.data.employees)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch employees')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setTitle('Manage Employees')
//     fetchEmployees()
//   }, [setTitle])

//   // ── Add / Edit submit ────────────────────────────────────────────────────
//   const handleSubmit = async (form) => {
//     try {
//       if (editingEmp) {
//         const payload = {
//           email:      form.email,
//           role:       form.role,
//           department: form.department,
//         }
//         if (form.password) payload.password = form.password
//         await api.put(`/employees/${editingEmp._id}`, payload)
//         toast.success('Employee updated successfully!')
//       } else {
//         await api.post('/employees', {
//           email:      form.email,
//           password:   form.password,
//           role:       form.role,
//           department: form.department,
//         })
//         toast.success('Employee added successfully!')
//       }
//       fetchEmployees()
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Operation failed')
//     } finally {
//       setShowModal(false)
//       setEditingEmp(null)
//     }
//   }

//   // ── Delete ───────────────────────────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return
//     try {
//       await api.delete(`/employees/${id}`)
//       setEmployees(prev => prev.filter(e => e._id !== id))
//       toast.success('Employee deleted.')
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to delete employee')
//     }
//   }

//   const openEdit = (emp) => { setEditingEmp(emp); setShowModal(true) }

//   // ── Filter logic ─────────────────────────────────────────────────────────
//   const filtered = employees.filter(e => {
//     const matchSearch = e.email?.toLowerCase().includes(search.toLowerCase())
//     const matchDept   = filterDept ? e.department === filterDept : true
//     const matchRole   = filterRole ? e.role === filterRole       : true
//     return matchSearch && matchDept && matchRole
//   })

//   const stats = {
//     total:  employees.length,
//     admins: employees.filter(e => e.role === 'admin').length,
//     staff:  employees.filter(e => e.role === 'employee').length,
//   }

//   const activeDepts = [...new Set(employees.map(e => e.department).filter(Boolean))]

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
//         <button
//           onClick={() => { setEditingEmp(null); setShowModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           Add Employee
//         </button>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Total Users</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.total}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <CgProfile size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Admins</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.admins}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaUserTie size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Employees</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.staff}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Search + Filter bar */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100 flex flex-col sm:flex-row gap-3">
//         <input
//           type="text"
//           placeholder="Search by email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//         />
//         <select
//           value={filterDept}
//           onChange={e => setFilterDept(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[160px]"
//         >
//           <option value="">All Departments</option>
//           {activeDepts.map(d => <option key={d} value={d}>{d}</option>)}
//         </select>
//         <select
//           value={filterRole}
//           onChange={e => setFilterRole(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[130px]"
//         >
//           <option value="">All Roles</option>
//           <option value="employee">Employee</option>
//           <option value="admin">Admin</option>
//         </select>
//       </div>

//       <p className="text-xs text-gray-400 mb-3 px-1">
//         Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {employees.length} users
//       </p>

//       {/* Loading spinner */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5284]" />
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   {['Employee', 'Department', 'Role', 'Actions'].map(h => (
//                     <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-white">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filtered.length > 0 ? filtered.map(emp => (
//                   <tr key={emp._id} className="hover:bg-blue-50/20 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                           <CgProfile size={18} className="text-white" />
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900">{emp.email}</p>
//                           <p className="text-xs text-gray-400 font-mono">{emp._id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {emp.department ? (
//                         <span className="flex items-center gap-1.5 text-sm text-gray-700">
//                           <FaBuilding size={11} className="text-gray-400" />
//                           {emp.department}
//                         </span>
//                       ) : (
//                         <span className="text-gray-300 italic text-sm">—</span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
//                         ${emp.role === 'admin'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : 'bg-blue-100 text-blue-800'}`}>
//                         {emp.role === 'admin' ? <FaUserTie size={10} /> : <CgProfile size={10} />}
//                         <span className="capitalize">{emp.role}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <button onClick={() => openEdit(emp)}
//                           className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
//                           <FaEdit size={15} />
//                         </button>
//                         <button onClick={() => handleDelete(emp._id)}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <FaTrash size={15} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={4} className="px-6 py-14 text-center text-gray-400 italic">
//                       No employees found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-3">
//             {filtered.length > 0 ? filtered.map(emp => (
//               <div key={emp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="p-4 flex items-start justify-between gap-3">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       <CgProfile size={20} className="text-white" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className="font-semibold text-gray-900 text-sm truncate">{emp.email}</p>
//                       {emp.department && (
//                         <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
//                           <FaBuilding size={10} /> {emp.department}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <span className={`flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-semibold capitalize
//                     ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                     {emp.role}
//                   </span>
//                 </div>
//                 <div className="px-4 pb-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
//                   <button onClick={() => openEdit(emp)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C5284] bg-blue-50 rounded-lg">
//                     <FaEdit size={11} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(emp._id)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg">
//                     <FaTrash size={11} /> Delete
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="bg-white rounded-xl p-12 text-center text-gray-700 border border-gray-100">
//                 No employees found.
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <EmployeeModal
//           editingEmployee={editingEmp}
//           onClose={() => { setShowModal(false); setEditingEmp(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageEmployees













// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { FaPlus, FaEdit, FaTrash, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { FaUserTie, FaRegCheckCircle, FaBuilding } from 'react-icons/fa'

// // ── Axios instance ────────────────────────────────────────────────────────────
// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/admin',
//   withCredentials: true,
// })

// // ── Department options ────────────────────────────────────────────────────────
// const DEPARTMENTS = [
//   'Engineering', 'Design', 'Marketing', 'Sales', 'Human Resources',
//   'Finance', 'Operations', 'Customer Support', 'Legal', 'Product',
// ]

// // ── Shift Badge ───────────────────────────────────────────────────────────────
// function ShiftBadge({ shift }) {
//   if (!shift) return <span className="text-gray-300 italic text-xs">—</span>
//   return shift === 'AM' ? (
//     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
//       <FaSun size={9} /> AM
//     </span>
//   ) : (
//     <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
//       <FaMoon size={9} /> PM
//     </span>
//   )
// }

// // ── Add / Edit Modal ──────────────────────────────────────────────────────────
// function EmployeeModal({ onClose, onSubmit, editingEmployee }) {
//   const [form, setForm] = useState({
//     name:       editingEmployee?.name       || '',
//     email:      editingEmployee?.email      || '',
//     password:   '',
//     role:       editingEmployee?.role       || 'employee',
//     department: editingEmployee?.department || '',
//     shift:      editingEmployee?.shift      || '',
//   })
//   const [error, setError] = useState('')

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setError('')

//     if (!form.email.trim()) {
//       setError('Email is required.')
//       return
//     }
//     if (!editingEmployee && !form.password.trim()) {
//       setError('Password is required for new employees.')
//       return
//     }
//     if (form.name.length > 14) {
//       setError('Full name cannot exceed 14 characters.')
//       return
//     }
//     onSubmit(form)
//   }

//   const nameCount = form.name.length
//   const nameAtLimit = nameCount >= 14

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

//         {/* Header */}
//         <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
//           <h2 className="text-lg font-bold text-white">
//             {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
//           </h2>
//           <button type="button" onClick={onClose}
//             className="text-white hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer">
//             <FaTimes size={16} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-5 space-y-4">

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           {/* Full Name */}
//           <div>
//             <div className="flex items-center justify-between mb-1.5">
//               <label className="block text-sm font-semibold text-gray-700">
//                 Full Name
//               </label>
//               <span className={`text-xs font-medium transition-colors ${
//                 nameAtLimit ? 'text-orange-500' : 'text-gray-400'
//               }`}>
//                 {nameCount}/14
//               </span>
//             </div>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handle}
//               maxLength={14}
//               placeholder="e.g. Ali Hassan"
//               className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm transition-colors ${
//                 nameAtLimit ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
//               }`}
//             />
//             {nameAtLimit && (
//               <p className="text-xs text-orange-500 mt-1">Maximum 14 characters reached</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Email <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="email" name="email" value={form.email} onChange={handle} required
//               placeholder="employee@example.com"
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Password{' '}
//               {editingEmployee
//                 ? <span className="text-gray-400 font-normal text-xs">(leave blank to keep current)</span>
//                 : <span className="text-red-500">*</span>
//               }
//             </label>
//             <input
//               type="password" name="password" value={form.password} onChange={handle}
//               placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//             />
//           </div>

//           {/* Role — radio pill buttons */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Role <span className="text-red-500">*</span>
//             </label>
//             <div className="flex gap-3">
//               {['employee', 'admin'].map((r) => (
//                 <label key={r}
//                   className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
//                     ${form.role === r
//                       ? 'border-[#2C5284] bg-[#2C5284] text-white'
//                       : 'border-gray-200 text-gray-600 hover:border-[#2C5284]/40 bg-white'
//                     }`}
//                 >
//                   <input type="radio" name="role" value={r} checked={form.role === r} onChange={handle} className="sr-only" />
//                   {r === 'admin' ? <FaUserTie size={13} /> : <CgProfile size={13} />}
//                   <span className="capitalize">{r}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Department */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
//             <select
//               name="department" value={form.department} onChange={handle}
//               className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm bg-white text-gray-700"
//             >
//               <option value="">— Select Department —</option>
//               {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
//             </select>
//           </div>

//           {/* Shift — pill buttons */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//               Work Shift <span className="text-gray-400 font-normal text-xs">(optional)</span>
//             </label>
//             <div className="flex gap-3">
//               {[
//                 { value: 'AM', label: 'AM Shift', icon: <FaSun size={13} />, colors: 'border-amber-400 bg-amber-400 text-white', hover: 'border-amber-200 hover:border-amber-300' },
//                 { value: 'PM', label: 'PM Shift', icon: <FaMoon size={13} />, colors: 'border-indigo-500 bg-indigo-500 text-white', hover: 'border-gray-200 hover:border-indigo-300' },
//               ].map(({ value, label, icon, colors, hover }) => (
//                 <label key={value}
//                   className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
//                     ${form.shift === value ? colors : `bg-white text-gray-600 ${hover}`}`}
//                 >
//                   <input type="radio" name="shift" value={value} checked={form.shift === value} onChange={handle} className="sr-only" />
//                   {icon}
//                   <span>{label}</span>
//                 </label>
//               ))}
//               {form.shift && (
//                 <button type="button" onClick={() => setForm({ ...form, shift: '' })}
//                   className="px-3 py-2.5 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Live preview */}
//           {(form.name || form.email || form.department) && (
//             <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
//               <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                 <span className="text-white text-xs font-bold">
//                   {form.name
//                     ? form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
//                     : <CgProfile size={16} />
//                   }
//                 </span>
//               </div>
//               <div className="overflow-hidden flex-1">
//                 <p className="text-sm font-semibold text-gray-800 truncate">{form.name || form.email || '—'}</p>
//                 <p className="text-xs text-gray-500 capitalize flex items-center gap-2">
//                   <span>{form.role}{form.department ? ` · ${form.department}` : ''}</span>
//                   {form.shift && <ShiftBadge shift={form.shift} />}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Action buttons */}
//           <div className="flex gap-3 pt-1">
//             <button type="button" onClick={onClose}
//               className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
//               Cancel
//             </button>
//             <button type="submit"
//               className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
//               {editingEmployee ? 'Update Employee' : 'Add Employee'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// // ── Main Component ────────────────────────────────────────────────────────────
// function ManageEmployees({ setTitle }) {
//   const [employees, setEmployees]   = useState([])
//   const [loading, setLoading]       = useState(true)
//   const [showModal, setShowModal]   = useState(false)
//   const [editingEmp, setEditingEmp] = useState(null)
//   const [search, setSearch]         = useState('')
//   const [filterDept, setFilterDept] = useState('')
//   const [filterRole, setFilterRole] = useState('')
//   const [filterShift, setFilterShift] = useState('')

//   // ── Fetch ────────────────────────────────────────────────────────────────
//   const fetchEmployees = async () => {
//     setLoading(true)
//     try {
//       const res = await api.get('/employees')
//       setEmployees(res.data.employees)
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to fetch employees')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     setTitle('Manage Employees')
//     fetchEmployees()
//   }, [setTitle])

//   // ── Add / Edit submit ────────────────────────────────────────────────────
//   const handleSubmit = async (form) => {
//     try {
//       if (editingEmp) {
//         const payload = {
//           email:      form.email,
//           role:       form.role,
//           department: form.department,
//           name:       form.name,
//           shift:      form.shift,
//         }
//         if (form.password) payload.password = form.password
//         await api.put(`/employees/${editingEmp._id}`, payload)
//         toast.success('Employee updated successfully!')
//       } else {
//         await api.post('/employees', {
//           email:      form.email,
//           password:   form.password,
//           role:       form.role,
//           department: form.department,
//           name:       form.name,
//           shift:      form.shift,
//         })
//         toast.success('Employee added successfully!')
//       }
//       fetchEmployees()
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Operation failed')
//     } finally {
//       setShowModal(false)
//       setEditingEmp(null)
//     }
//   }

//   // ── Delete ───────────────────────────────────────────────────────────────
//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return
//     try {
//       await api.delete(`/employees/${id}`)
//       setEmployees(prev => prev.filter(e => e._id !== id))
//       toast.success('Employee deleted.')
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to delete employee')
//     }
//   }

//   const openEdit = (emp) => { setEditingEmp(emp); setShowModal(true) }

//   // ── Filter logic ─────────────────────────────────────────────────────────
//   const filtered = employees.filter(e => {
//     const q = search.toLowerCase()
//     const matchSearch = e.email?.toLowerCase().includes(q) || e.name?.toLowerCase().includes(q)
//     const matchDept   = filterDept  ? e.department === filterDept : true
//     const matchRole   = filterRole  ? e.role       === filterRole  : true
//     const matchShift  = filterShift ? e.shift      === filterShift : true
//     return matchSearch && matchDept && matchRole && matchShift
//   })

//   const stats = {
//     total:  employees.length,
//     admins: employees.filter(e => e.role === 'admin').length,
//     staff:  employees.filter(e => e.role === 'employee').length,
//   }

//   const activeDepts = [...new Set(employees.map(e => e.department).filter(Boolean))]

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
//         <button
//           onClick={() => { setEditingEmp(null); setShowModal(true) }}
//           className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
//         >
//           <FaPlus size={16} />
//           Add Employee
//         </button>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Total Users</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.total}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <CgProfile size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Admins</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.admins}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaUserTie size={24} className="text-white" />
//           </div>
//         </div>
//         <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
//           <div>
//             <p className="text-sm sm:text-base text-[#2C5284]">Employees</p>
//             <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.staff}</p>
//           </div>
//           <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
//             <FaRegCheckCircle size={24} className="text-white" />
//           </div>
//         </div>
//       </div>

//       {/* Search + Filter bar */}
//       <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100 flex flex-col sm:flex-row gap-3 flex-wrap">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="flex-1 min-w-[160px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
//         />
//         <select
//           value={filterDept}
//           onChange={e => setFilterDept(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[150px]"
//         >
//           <option value="">All Departments</option>
//           {activeDepts.map(d => <option key={d} value={d}>{d}</option>)}
//         </select>
//         <select
//           value={filterRole}
//           onChange={e => setFilterRole(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[120px]"
//         >
//           <option value="">All Roles</option>
//           <option value="employee">Employee</option>
//           <option value="admin">Admin</option>
//         </select>
//         <select
//           value={filterShift}
//           onChange={e => setFilterShift(e.target.value)}
//           className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[120px]"
//         >
//           <option value="">All Shifts</option>
//           <option value="AM">AM Shift</option>
//           <option value="PM">PM Shift</option>
//         </select>
//       </div>

//       <p className="text-xs text-gray-400 mb-3 px-1">
//         Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {employees.length} users
//       </p>

//       {/* Loading spinner */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5284]" />
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table */}
//           <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#2C5284]">
//                 <tr>
//                   {['Employee', 'Department', 'Shift', 'Role', 'Actions'].map(h => (
//                     <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-white">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filtered.length > 0 ? filtered.map(emp => (
//                   <tr key={emp._id} className="hover:bg-blue-50/20 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-3">
//                         <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                           {emp.name
//                             ? <span className="text-white text-xs font-bold">
//                                 {emp.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()}
//                               </span>
//                             : <CgProfile size={18} className="text-white" />
//                           }
//                         </div>
//                         <div>
//                           {emp.name && <p className="text-sm font-semibold text-gray-900">{emp.name}</p>}
//                           <p className={`text-xs ${emp.name ? 'text-gray-400' : 'text-sm font-semibold text-gray-900'}`}>{emp.email}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {emp.department ? (
//                         <span className="flex items-center gap-1.5 text-sm text-gray-700">
//                           <FaBuilding size={11} className="text-gray-400" />
//                           {emp.department}
//                         </span>
//                       ) : <span className="text-gray-300 italic text-sm">—</span>}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <ShiftBadge shift={emp.shift} />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
//                         ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                         {emp.role === 'admin' ? <FaUserTie size={10} /> : <CgProfile size={10} />}
//                         <span className="capitalize">{emp.role}</span>
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-1">
//                         <button onClick={() => openEdit(emp)}
//                           className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
//                           <FaEdit size={15} />
//                         </button>
//                         <button onClick={() => handleDelete(emp._id)}
//                           className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
//                           <FaTrash size={15} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-14 text-center text-gray-400 italic">No employees found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="lg:hidden space-y-3">
//             {filtered.length > 0 ? filtered.map(emp => (
//               <div key={emp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                 <div className="p-4 flex items-start justify-between gap-3">
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
//                       {emp.name
//                         ? <span className="text-white text-xs font-bold">
//                             {emp.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()}
//                           </span>
//                         : <CgProfile size={20} className="text-white" />
//                       }
//                     </div>
//                     <div className="min-w-0">
//                       {emp.name && <p className="font-semibold text-gray-900 text-sm">{emp.name}</p>}
//                       <p className={`text-xs text-gray-500 truncate ${!emp.name ? 'font-semibold text-sm text-gray-900' : ''}`}>{emp.email}</p>
//                       {emp.department && (
//                         <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
//                           <FaBuilding size={10} /> {emp.department}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize
//                       ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                       {emp.role}
//                     </span>
//                     <ShiftBadge shift={emp.shift} />
//                   </div>
//                 </div>
//                 <div className="px-4 pb-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
//                   <button onClick={() => openEdit(emp)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C5284] bg-blue-50 rounded-lg">
//                     <FaEdit size={11} /> Edit
//                   </button>
//                   <button onClick={() => handleDelete(emp._id)}
//                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg">
//                     <FaTrash size={11} /> Delete
//                   </button>
//                 </div>
//               </div>
//             )) : (
//               <div className="bg-white rounded-xl p-12 text-center text-gray-700 border border-gray-100">
//                 No employees found.
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <EmployeeModal
//           editingEmployee={editingEmp}
//           onClose={() => { setShowModal(false); setEditingEmp(null) }}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   )
// }

// export default ManageEmployees














import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSun, FaMoon, FaCloudMoon } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { FaUserTie, FaRegCheckCircle, FaBuilding } from 'react-icons/fa'

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: 'http://localhost:3000/api/admin',
  withCredentials: true,
})

// ── Department options ────────────────────────────────────────────────────────
const DEPARTMENTS = [
  'Engineering', 'Design', 'Marketing', 'Sales', 'Human Resources',
  'Finance', 'Operations', 'Customer Support', 'Legal', 'Product',
]

// ── Shift config: only for employees ─────────────────────────────────────────
const SHIFTS = [
  {
    value:  'AM',
    label:  'Morning',
    time:   '9:00 AM – 6:00 PM',
    icon:   <FaSun size={13} />,
    active: 'border-amber-400 bg-amber-400 text-white',
    hover:  'border-gray-200 hover:border-amber-300 text-gray-600',
    badge:  'bg-amber-100 text-amber-800',
  },
  {
    value:  'PM',
    label:  'Evening',
    time:   '2:00 PM – 11:00 PM',
    icon:   <FaMoon size={13} />,
    active: 'border-indigo-500 bg-indigo-500 text-white',
    hover:  'border-gray-200 hover:border-indigo-300 text-gray-600',
    badge:  'bg-indigo-100 text-indigo-800',
  },
  {
    value:  'Night',
    label:  'Night',
    time:   '10:00 PM – 7:00 AM',
    icon:   <FaCloudMoon size={13} />,
    active: 'border-slate-700 bg-slate-700 text-white',
    hover:  'border-gray-200 hover:border-slate-400 text-gray-600',
    badge:  'bg-slate-200 text-slate-800',
  },
]

// ── Shift Badge ───────────────────────────────────────────────────────────────
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
    name:       editingEmployee?.name       || '',
    email:      editingEmployee?.email      || '',
    password:   '',
    role:       editingEmployee?.role       || 'employee',
    department: editingEmployee?.department || '',
    shift:      editingEmployee?.shift      || '',
  })
  const [error, setError] = useState('')

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // When role switches to admin, clear shift
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

  const nameCount   = form.name.length
  const nameAtLimit = nameCount >= 14
  const isEmployee  = form.role === 'employee'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#2C5284] rounded-t-2xl">
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
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <span className={`text-xs font-medium transition-colors ${nameAtLimit ? 'text-orange-500' : 'text-gray-400'}`}>
                {nameCount}/14
              </span>
            </div>
            <input
              type="text" name="name" value={form.name} onChange={handle}
              maxLength={14} placeholder="e.g. Ali Hassan"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm transition-colors ${
                nameAtLimit ? 'border-orange-300 bg-orange-50' : 'border-gray-300'
              }`}
            />
            {nameAtLimit && <p className="text-xs text-orange-500 mt-1">Maximum 14 characters reached</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email" name="email" value={form.email} onChange={handle} required
              placeholder="employee@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password{' '}
              {editingEmployee
                ? <span className="text-gray-400 font-normal text-xs">(leave blank to keep current)</span>
                : <span className="text-red-500">*</span>
              }
            </label>
            <input
              type="password" name="password" value={form.password} onChange={handle}
              placeholder={editingEmployee ? 'Enter new password (optional)' : 'Enter password'}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {['employee', 'admin'].map((r) => (
                <label key={r}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none
                    ${form.role === r
                      ? 'border-[#2C5284] bg-[#2C5284] text-white'
                      : 'border-gray-200 text-gray-600 hover:border-[#2C5284]/40 bg-white'
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
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
            <select name="department" value={form.department} onChange={handle}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm bg-white text-gray-700"
            >
              <option value="">— Select Department —</option>
              {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>

          {/* Shift — only for employees */}
          {isEmployee && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Work Shift{' '}
                <span className="text-gray-400 font-normal text-xs">(optional)</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {SHIFTS.map(({ value, label, time, icon, active, hover }) => (
                  <label key={value}
                    className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 rounded-lg border-2 cursor-pointer text-sm font-medium transition-all select-none flex-1 min-w-[90px]
                      ${form.shift === value ? active : `bg-white ${hover}`}`}
                  >
                    <input type="radio" name="shift" value={value}
                      checked={form.shift === value} onChange={handle} className="sr-only" />
                    <span className="flex items-center gap-1.5">{icon} {label}</span>
                    <span className={`text-[10px] font-normal leading-tight text-center ${
                      form.shift === value ? 'opacity-80' : 'text-gray-400'
                    }`}>
                      {time}
                    </span>
                  </label>
                ))}
                {form.shift && (
                  <button type="button"
                    onClick={() => setForm({ ...form, shift: '' })}
                    className="px-3 py-2.5 text-xs text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors self-stretch flex items-center"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Admin notice */}
          {!isEmployee && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg px-4 py-3 text-xs text-yellow-700 flex items-center gap-2">
              <FaUserTie size={12} />
              Admin accounts are not assigned to shifts.
            </div>
          )}

          {/* Live preview */}
          {(form.name || form.email || form.department) && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {form.name
                    ? form.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
                    : <CgProfile size={16} />
                  }
                </span>
              </div>
              <div className="overflow-hidden flex-1">
                <p className="text-sm font-semibold text-gray-800 truncate">{form.name || form.email || '—'}</p>
                <p className="text-xs text-gray-500 capitalize flex items-center gap-2">
                  <span>{form.role}{form.department ? ` · ${form.department}` : ''}</span>
                  {form.shift && isEmployee && <ShiftBadge shift={form.shift} />}
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm cursor-pointer">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-4 py-3 bg-[#2C5284] cursor-pointer text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm">
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
  const [employees, setEmployees]       = useState([])
  const [loading, setLoading]           = useState(true)
  const [showModal, setShowModal]       = useState(false)
  const [editingEmp, setEditingEmp]     = useState(null)
  const [search, setSearch]             = useState('')
  const [filterDept, setFilterDept]     = useState('')
  const [filterRole, setFilterRole]     = useState('')
  const [filterShift, setFilterShift]   = useState('')

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const res = await api.get('/employees')
      setEmployees(res.data.employees)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitle('Manage Employees')
    fetchEmployees()
  }, [setTitle])

  const handleSubmit = async (form) => {
    try {
      if (editingEmp) {
        const payload = {
          email:      form.email,
          role:       form.role,
          department: form.department,
          name:       form.name,
          // Only send shift for employees; clear it for admins
          shift:      form.role === 'employee' ? form.shift : '',
        }
        if (form.password) payload.password = form.password
        await api.put(`/employees/${editingEmp._id}`, payload)
        toast.success('Employee updated successfully!')
      } else {
        await api.post('/employees', {
          email:      form.email,
          password:   form.password,
          role:       form.role,
          department: form.department,
          name:       form.name,
          shift:      form.role === 'employee' ? form.shift : '',
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
      await api.delete(`/employees/${id}`)
      setEmployees(prev => prev.filter(e => e._id !== id))
      toast.success('Employee deleted.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete employee')
    }
  }

  const openEdit = (emp) => { setEditingEmp(emp); setShowModal(true) }

  const filtered = employees.filter(e => {
    const q = search.toLowerCase()
    const matchSearch = e.email?.toLowerCase().includes(q) || e.name?.toLowerCase().includes(q)
    const matchDept   = filterDept  ? e.department === filterDept : true
    const matchRole   = filterRole  ? e.role       === filterRole  : true
    const matchShift  = filterShift ? e.shift      === filterShift : true
    return matchSearch && matchDept && matchRole && matchShift
  })

  const stats = {
    total:  employees.length,
    admins: employees.filter(e => e.role === 'admin').length,
    staff:  employees.filter(e => e.role === 'employee').length,
  }

  const activeDepts = [...new Set(employees.map(e => e.department).filter(Boolean))]

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gray-50/50">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2C5284]">Manage Employees</h1>
        <button
          onClick={() => { setEditingEmp(null); setShowModal(true) }}
          className="flex items-center gap-2 px-6 py-4 bg-[#2C5284] text-white rounded-lg font-medium hover:bg-[#365F8D] transition-colors text-sm shadow"
        >
          <FaPlus size={16} />
          Add Employee
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Total Users</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.total}</p>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <CgProfile size={24} className="text-white" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Admins</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.admins}</p>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <FaUserTie size={24} className="text-white" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border-l-4 border-[#2C5284] flex items-center justify-between shadow w-full min-h-30 hover:shadow-xl transform transition duration-300 ease-in-out">
          <div>
            <p className="text-sm sm:text-base text-[#2C5284]">Employees</p>
            <p className="text-2xl sm:text-3xl font-bold text-[#365F8D]">{stats.staff}</p>
          </div>
          <div className="bg-[#365F8D] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
            <FaRegCheckCircle size={24} className="text-white" />
          </div>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-100 flex flex-col sm:flex-row gap-3 flex-wrap">
        <input
          type="text" placeholder="Search by name or email..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[160px] px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] focus:border-transparent outline-none text-sm"
        />
        <select value={filterDept} onChange={e => setFilterDept(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[150px]">
          <option value="">All Departments</option>
          {activeDepts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[120px]">
          <option value="">All Roles</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        <select value={filterShift} onChange={e => setFilterShift(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5284] outline-none text-sm bg-white text-gray-700 min-w-[130px]">
          <option value="">All Shifts</option>
          {SHIFTS.map(s => <option key={s.value} value={s.value}>{s.label} ({s.time})</option>)}
        </select>
      </div>

      <p className="text-xs text-gray-400 mb-3 px-1">
        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> of {employees.length} users
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C5284]" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#2C5284]">
                <tr>
                  {['Employee', 'Department', 'Shift', 'Role', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-white">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length > 0 ? filtered.map(emp => (
                  <tr key={emp._id} className="hover:bg-blue-50/20 transition-colors">
                    {/* Employee cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                          {emp.name
                            ? <span className="text-white text-xs font-bold">
                                {emp.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                              </span>
                            : <CgProfile size={18} className="text-white" />
                          }
                        </div>
                        <div>
                          {emp.name && <p className="text-sm font-semibold text-gray-900">{emp.name}</p>}
                          <p className={`text-xs ${emp.name ? 'text-gray-400' : 'text-sm font-semibold text-gray-900'}`}>{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Department cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {emp.department
                        ? <span className="flex items-center gap-1.5 text-sm text-gray-700"><FaBuilding size={11} className="text-gray-400" />{emp.department}</span>
                        : <span className="text-gray-300 italic text-sm">—</span>
                      }
                    </td>
                    {/* Shift cell — blank for admins */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {emp.role === 'employee'
                        ? <ShiftBadge shift={emp.shift} />
                        : <span className="text-gray-300 italic text-xs">N/A</span>
                      }
                    </td>
                    {/* Role cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${emp.role === 'admin' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {emp.role === 'admin' ? <FaUserTie size={10} /> : <CgProfile size={10} />}
                        <span className="capitalize">{emp.role}</span>
                      </span>
                    </td>
                    {/* Actions cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(emp)}
                          className="p-2 text-[#2C5284] hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                          <FaEdit size={15} />
                        </button>
                        <button onClick={() => handleDelete(emp._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <FaTrash size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-14 text-center text-gray-400 italic">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {filtered.length > 0 ? filtered.map(emp => (
              <div key={emp._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#2C5284] flex items-center justify-center flex-shrink-0">
                      {emp.name
                        ? <span className="text-white text-xs font-bold">
                            {emp.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                          </span>
                        : <CgProfile size={20} className="text-white" />
                      }
                    </div>
                    <div className="min-w-0">
                      {emp.name && <p className="font-semibold text-gray-900 text-sm">{emp.name}</p>}
                      <p className={`text-xs text-gray-500 truncate ${!emp.name ? 'font-semibold text-sm text-gray-900' : ''}`}>{emp.email}</p>
                      {emp.department && (
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
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
                <div className="px-4 pb-3 flex justify-end gap-2 border-t border-gray-100 pt-3">
                  <button onClick={() => openEdit(emp)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C5284] bg-blue-50 rounded-lg">
                    <FaEdit size={11} /> Edit
                  </button>
                  <button onClick={() => handleDelete(emp._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg">
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