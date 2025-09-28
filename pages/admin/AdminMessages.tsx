import React, { useState, useEffect } from 'react';
import { getMessages, deleteMessage, Message } from '../../data/store';
import TrashIcon from '../../components/icons/TrashIcon';

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
        const messagesData = await getMessages();
        setMessages(messagesData);
    } catch (error) {
        console.error("Error fetching messages:", error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);


  const handleDelete = async (id: string, fullName: string) => {
    if (window.confirm(`Are you sure you want to delete the message from ${fullName}?`)) {
        try {
            await deleteMessage(id);
            setMessages(prev => prev.filter(msg => msg.id !== id));
        } catch (error) {
            console.error("Failed to delete message:", error);
            alert("Failed to delete message. Please try again.");
        }
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Contact Messages</h1>
      <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-card/30 dark:text-gray-300">
              <tr>
                <th scope="col" className="px-6 py-3">Received</th>
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">Contact</th>
                <th scope="col" className="px-6 py-3">Message</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500 dark:text-gray-400">Loading messages...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500 dark:text-gray-400">No messages yet.</td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="bg-white dark:bg-brand-card border-b dark:border-brand-border hover:bg-gray-50 dark:hover:bg-brand-border/30">
                    <td className="px-6 py-4 whitespace-nowrap">{msg.date}</td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{msg.fullName}</td>
                    <td className="px-6 py-4">
                        <div>{msg.email}</div>
                        <div className="text-xs text-gray-400">{msg.phone}</div>
                    </td>
                    <td className="px-6 py-4 max-w-md">
                        <p className="line-clamp-3" title={msg.message}>{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button onClick={() => handleDelete(msg.id, msg.fullName)} className="text-red-500 hover:text-red-700 p-2" aria-label={`Delete message from ${msg.fullName}`}>
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

export default AdminMessages;