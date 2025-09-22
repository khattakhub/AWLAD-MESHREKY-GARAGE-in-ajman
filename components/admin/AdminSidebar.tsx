import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '../icons/DashboardIcon';
import CalendarIcon from '../icons/CalendarIcon';
import UsersIcon from '../icons/UsersIcon';
import WrenchIcon from '../icons/WrenchIcon';
import LogoutIcon from '../icons/LogoutIcon';
import DocumentIcon from '../icons/DocumentIcon';
import SettingsIcon from '../icons/SettingsIcon';

interface AdminSidebarProps {
  onLinkClick?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLinkClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
    if(onLinkClick) onLinkClick();
  };
  
  const NavLinkWrapper: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => {
     const linkClasses = "flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 rounded-lg";
     const activeLinkClasses = "bg-brand-blue/10 text-brand-blue dark:text-white dark:bg-brand-blue/30";

    return (
        <NavLink 
            to={to} 
            onClick={onLinkClick}
            className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : 'hover:bg-gray-100 dark:hover:bg-brand-border'}`}
        >
            {children}
        </NavLink>
    );
  };

  return (
    <aside className="flex-shrink-0 w-64 h-full bg-white dark:bg-brand-card border-r dark:border-brand-border flex flex-col">
      <div className="flex items-center justify-center h-16 border-b dark:border-brand-border flex-shrink-0 px-4">
         <Link to="/admin" onClick={onLinkClick} className="text-xl font-bold tracking-wider text-gray-900 dark:text-white">
            ADMIN PANEL
          </Link>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <nav className="flex flex-col space-y-2">
          <NavLinkWrapper to="/admin/dashboard">
            <DashboardIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Dashboard</span>
          </NavLinkWrapper>
          <NavLinkWrapper to="/admin/appointments">
            <CalendarIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Appointments</span>
          </NavLinkWrapper>
          <NavLinkWrapper to="/admin/subscribers">
            <UsersIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Subscribers</span>
          </NavLinkWrapper>
          <NavLinkWrapper to="/admin/blog">
            <DocumentIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Manage Blog</span>
          </NavLinkWrapper>
          <NavLinkWrapper to="/admin/services">
            <WrenchIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Manage Services</span>
          </NavLinkWrapper>
          <NavLinkWrapper to="/admin/settings">
            <SettingsIcon className="w-5 h-5 mr-3" />
            <span className="font-medium">Settings</span>
          </NavLinkWrapper>
        </nav>
      </div>
      <div className="p-4 border-t dark:border-brand-border flex-shrink-0">
        <button onClick={handleLogout} className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-brand-border">
          <LogoutIcon className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;