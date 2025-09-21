import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin/login', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-brand-dark text-gray-800 dark:text-gray-200">
      <AdminSidebar />
      <main className="flex-grow p-6 sm:p-8 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
