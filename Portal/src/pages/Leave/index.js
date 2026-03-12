/**
 * File: index.js (Leave)
 * Description: Central export point for all leave-related page components and modals.
 * Why: To simplify imports and maintain a clean project structure for the routing layer.
 */
import AdminLeave from './AdminLeave';
import UserLeave from './UserLeave';
import LeaveDetailModal from './LeaveDetailModal';
import UserLeaveDetailModal from './UserLeaveDetailModal';

export { AdminLeave, UserLeave, LeaveDetailModal, UserLeaveDetailModal };