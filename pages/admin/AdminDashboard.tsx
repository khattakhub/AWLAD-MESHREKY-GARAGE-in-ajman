

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments, getSubscribers, getServices, Appointment } from '../../data/store';
import CalendarIcon from '../../components/icons/CalendarIcon';
import UsersIcon from '../../components/icons/UsersIcon';
import WrenchIcon from '../../components/icons/WrenchIcon';

const StatCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg p-6 flex items-center">
        <div className="p-3 rounded-full bg-brand-blue/10 text-brand-blue mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className={`text-2xl font-bold ${value === 'Error' ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        appointments: 0 as number,
        subscribers: 0 as number | 'Error',
        services: 0,
    });
    const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const appointmentsData = await getAppointments();
                const servicesData = getServices();
                let subscribersCount: number | 'Error';

                try {
                    const subscribersData = await getSubscribers();
                    subscribersCount = subscribersData.length;
                } catch (subError) {
                    console.error("Failed to fetch subscribers:", subError);
                    subscribersCount = 'Error';
                    setError("Could not load subscriber data. The app may be offline.");
                }

                setStats({
                    appointments: appointmentsData.length,
                    subscribers: subscribersCount,
                    services: servicesData.length,
                });
                setRecentAppointments(appointmentsData.slice(0, 5));
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setError("Could not load dashboard data. The app might be offline or having connection issues.");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Dashboard</h1>
            {error && (
                <div className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Appointments" value={stats.appointments} icon={<CalendarIcon className="w-6 h-6" />} />
                <StatCard title="Email Subscribers" value={stats.subscribers} icon={<UsersIcon className="w-6 h-6" />} />
                <StatCard title="Total Services Offered" value={stats.services} icon={<WrenchIcon className="w-6 h-6" />} />
            </div>

            {/* Recent Appointments Section */}
            <div className="mt-10 bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm">
                 <div className="flex justify-between items-center p-6 border-b dark:border-brand-border">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Appointments</h2>
                    <Link to="/admin/appointments" className="text-sm font-medium text-brand-blue hover:underline">
                        View All
                    </Link>
                 </div>
                 <div className="p-6">
                    {recentAppointments.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400">No appointment requests yet.</div>
                    ) : (
                        <ul className="space-y-2">
                            {recentAppointments.map(appt => (
                                <li key={appt.id} className="rounded-lg hover:bg-gray-50 dark:hover:bg-brand-border/30 transition-colors duration-200">
                                    <Link to="/admin/appointments" className="flex justify-between items-center p-3">
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">{appt.fullName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{appt.service}</p>
                                        </div>
                                        <div className="text-right text-sm">
                                            <p className="font-medium text-gray-600 dark:text-gray-300">{appt.date}</p>
                                            <p className="text-gray-400">{appt.time}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                 </div>
            </div>

            <div className="mt-10 bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg p-6">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Welcome, Admin!</h2>
                 <p className="text-gray-600 dark:text-gray-300">
                    This is your control panel. You can view appointment requests, see your newsletter subscribers, manage blog posts, and manage the services listed on your website.
                    <br/><br/>
                    All data is currently being saved in your browser's local storage for demonstration. Use the navigation on the left to get started.
                 </p>
            </div>
        </div>
    );
};

export default AdminDashboard;