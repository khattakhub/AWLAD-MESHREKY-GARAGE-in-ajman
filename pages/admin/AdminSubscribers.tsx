

import React, { useState, useEffect } from 'react';
import { deleteSubscriber, Subscriber, subscribersCollectionRef } from '../../data/store';
import { onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';

const AdminSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(subscribersCollectionRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const subscribersData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const createdAt = data.createdAt as Timestamp;
            return {
                id: doc.id,
                email: data.email,
                date: createdAt.toDate().toISOString().split('T')[0]
            };
        });
        setSubscribers(subscribersData);
        setIsLoading(false);
    }, (error) => {
        console.error("Error fetching subscribers:", error);
        setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const handleRemove = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
        try {
            await deleteSubscriber(id);
            // No need to manually update state, onSnapshot will do it.
        } catch (error) {
            console.error("Failed to delete subscriber:", error);
            alert("Failed to remove subscriber. Please try again.");
        }
    }
  };
  
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
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-500 dark:text-gray-400">Loading subscribers...</td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-500 dark:text-gray-400">No subscribers yet.</td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="bg-white dark:bg-brand-card border-b dark:border-brand-border hover:bg-gray-50 dark:hover:bg-brand-border/30">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{sub.email}</td>
                    <td className="px-6 py-4">{sub.date}</td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => handleRemove(sub.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
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

export default AdminSubscribers;