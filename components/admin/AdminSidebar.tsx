import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '../icons/DashboardIcon';
import CalendarIcon from '../icons/CalendarIcon';
import UsersIcon from '../icons/UsersIcon';
import WrenchIcon from '../icons/WrenchIcon';
import LogoutIcon from '../icons/LogoutIcon';
import DocumentIcon from '../icons/DocumentIcon';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const linkClasses = "flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 rounded-lg";
  const activeLinkClasses = "bg-brand-blue/10 text-brand-blue dark:text-white dark:bg-brand-blue/30";

  return (
    <aside className="flex-shrink-0 w-64 bg-white dark:bg-brand-card border-r dark:border-brand-border flex flex-col">
      <div className="flex items-center justify-center h-20 border-b dark:border-brand-border flex-shrink-0">
         <Link to="/admin" className="text-xl font-bold tracking-wider text-gray-900 dark:text-white">
            ADMIN PANEL
          </Link>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <nav className="flex flex-col space-y-2">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100 dark:hover:bg-brand-border'}`}>
            <DashboardIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Dashboard</span>
          </NavLink>
          <NavLink to="/admin/appointments" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100 dark:hover:bg-brand-border'}`}>
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Appointments</span>
          </NavLink>
          <NavLink to="/admin/subscribers" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100 dark:hover:bg-brand-border'}`}>
            <UsersIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Subscribers</span>
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100 dark:hover:bg-brand-border'}`}>
            <DocumentIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Manage Blog</span>
          </NavLink>
          <NavLink to="/admin/services" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100 dark:hover:bg-brand-border'}`}>
            <WrenchIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Manage Services</span>
          </NavLink>
        </nav>
      </div>
      <div className="p-4 border-t dark:border-brand-border flex-shrink-0">
        <button onClick={handleLogout} className={`${linkClasses} w-full hover:bg-gray-100 dark:hover:bg-brand-border`}>
          <LogoutIcon className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;