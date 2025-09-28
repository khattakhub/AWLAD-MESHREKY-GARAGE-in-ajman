import React, { useState, useEffect } from 'react';
import { deleteAppointment, Appointment, updateAppointmentStatus } from '../../data/store';
import TrashIcon from '../../components/icons/TrashIcon';
import { db } from '../../data/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const appointmentsCollectionRef = collection(db, 'appointments');
    const q = query(appointmentsCollectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointmentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Appointment));
      setAppointments(appointmentsData);
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments. The app might be offline or experiencing connection issues.");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string, fullName: string) => {
    if (window.confirm(`Are you sure you want to delete the appointment for ${fullName}?`)) {
        try {
            await deleteAppointment(id);
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("Failed to delete appointment. Please try again.");
        }
    }
  };

  const handleStatusChange = async (id: string, newStatus: Appointment['status']) => {
      try {
        await updateAppointmentStatus(id, newStatus);
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status. Please try again.");
      }
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500 dark:text-gray-400">Loading appointments...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-red-600 dark:text-red-400">{error}</td>
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