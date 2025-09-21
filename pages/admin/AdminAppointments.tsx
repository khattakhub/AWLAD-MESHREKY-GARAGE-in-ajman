import React from 'react';
import { MOCK_APPOINTMENTS } from './mockData';

const AdminAppointments: React.FC = () => {
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
                <th scope="col" className="px-6 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_APPOINTMENTS.map((appt) => (
                <tr key={appt.id} className="bg-white dark:bg-brand-card border-b dark:border-brand-border hover:bg-gray-50 dark:hover:bg-brand-border/30">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{appt.name}</td>
                  <td className="px-6 py-4">{appt.phone}</td>
                  <td className="px-6 py-4">{appt.service}</td>
                  <td className="px-6 py-4">{appt.date} @ {appt.time}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{appt.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
