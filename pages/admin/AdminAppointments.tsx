import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment, Appointment, updateAppointmentStatus } from '../../data/store';
import TrashIcon from '../../components/icons/TrashIcon';

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const refreshAppointments = () => {
    setAppointments(getAppointments());
  };

  useEffect(() => {
    refreshAppointments();
  }, []);

  const handleDelete = (id: string, fullName: string) => {
    if (window.confirm(`Are you sure you want to delete the appointment for ${fullName}?`)) {
        deleteAppointment(id);
        refreshAppointments();
    }
  };

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
      updateAppointmentStatus(id, newStatus);
      refreshAppointments(); // Refresh to reflect sorted order if needed
  };

  const getStatusClasses = (status: Appointment['status']) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        case 'Confirmed':
            return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        case 'Completed':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
        case 'Cancelled':
            return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Appointment Requests</h1>
      <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-card/30 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Service</th>
                <th scope="col" className="px-6 py-3">Date & Time</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Message</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 dark:text-gray-400">No appointment requests yet.</td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="bg-white dark:bg-brand-card border-b dark:border-brand-border hover:bg-gray-50 dark:hover:bg-brand-border/30">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{appt.fullName}</td>
                    <td className="px-6 py-4">{appt.phoneNumber}</td>
                    <td className="px-6 py-4">{appt.service}</td>
                    <td className="px-6 py-4">{appt.date} @ {appt.time}</td>
                    <td className="px-6 py-4">
                        <select
                            value={appt.status}
                            onChange={(e) => handleStatusChange(appt.id, e.target.value as Appointment['status'])}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 focus:ring-2 focus:ring-brand-blue cursor-pointer ${getStatusClasses(appt.status)}`}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={appt.message}>{appt.message}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(appt.id, appt.fullName)} className="text-red-500 hover:text-red-700 p-2" aria-label={`Delete appointment for ${appt.fullName}`}>
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;