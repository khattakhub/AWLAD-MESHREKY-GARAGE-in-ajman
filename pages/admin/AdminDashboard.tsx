import React, { useState, useEffect } from 'react';
import { getAppointments, getSubscribers, getServices, getBlogPosts } from '../../data/store';
import CalendarIcon from '../../components/icons/CalendarIcon';
import UsersIcon from '../../components/icons/UsersIcon';
import WrenchIcon from '../../components/icons/WrenchIcon';
import DocumentIcon from '../../components/icons/DocumentIcon';

const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg p-6 flex items-center">
        <div className="p-3 rounded-full bg-brand-blue/10 text-brand-blue mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        appointments: 0,
        subscribers: 0,
        services: 0,
        blogPosts: 0,
    });

    useEffect(() => {
        setStats({
            appointments: getAppointments().length,
            subscribers: getSubscribers().length,
            services: getServices().length,
            blogPosts: getBlogPosts().length,
        });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Pending Appointments" value={stats.appointments} icon={<CalendarIcon className="w-6 h-6" />} />
                <StatCard title="Email Subscribers" value={stats.subscribers} icon={<UsersIcon className="w-6 h-6" />} />
                <StatCard title="Total Services Offered" value={stats.services} icon={<WrenchIcon className="w-6 h-6" />} />
                <StatCard title="Published Blog Posts" value={stats.blogPosts} icon={<DocumentIcon className="w-6 h-6" />} />
            </div>
            <div className="mt-10 bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg p-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Welcome, Admin!</h2>
                 <p className="text-gray-600 dark:text-gray-300">
                    This is your control panel. You can view appointment requests, see your newsletter subscribers, manage blog posts, and manage the services listed on your website.
                    <br/><br/>
                    Use the navigation on the left to get started. All data is now saved in your browser's local storage.
                 </p>
            </div>
        </div>
    );
};

export default AdminDashboard;