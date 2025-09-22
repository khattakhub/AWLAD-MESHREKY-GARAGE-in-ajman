import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment, Appointment } from '../../data/store';
import TrashIcon from '../../components/icons/TrashIcon';

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const appts = await getAppointments();
    setAppointments(appts);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment request?')) {
      await deleteAppointment(id);
      fetchAppointments();
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
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 dark:text-gray-400">Loading appointments...</td>
                </tr>
              ) : appointments.length === 0 ? (
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
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            appt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                            appt.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                            {appt.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={appt.message}>{appt.message}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(appt.id)} className="text-red-500 hover:text-red-700 p-2">
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