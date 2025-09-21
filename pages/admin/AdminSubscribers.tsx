import React from 'react';
import { MOCK_SUBSCRIBERS } from './mockData';

const AdminSubscribers: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Newsletter Subscribers</h1>
      <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-card/30 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">Email Address</th>
                <th scope="col" className="px-6 py-3">Subscription Date</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SUBSCRIBERS.map((sub) => (
                <tr key={sub.id} className="bg-white dark:bg-brand-card border-b dark:border-brand-border hover:bg-gray-50 dark:hover:bg-brand-border/30">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{sub.email}</td>
                  <td className="px-6 py-4">{sub.date}</td>
                  <td className="px-6 py-4 text-right">
                     <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSubscribers;
