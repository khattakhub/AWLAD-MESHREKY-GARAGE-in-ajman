import React, { useState } from 'react';
import { getServices, saveServices, Service } from '../../data/store';
import { iconMap, iconNames } from '../../components/icons';
import PencilIcon from '../../components/icons/PencilIcon';
import TrashIcon from '../../components/icons/TrashIcon';
import { AnimatePresence, motion } from 'framer-motion';

const ServiceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Service) => void;
  service: Service | null;
}> = ({ isOpen, onClose, onSave, service }) => {
  const [title, setTitle] = useState(service?.title || '');
  const [description, setDescription] = useState(service?.description || '');
  const [iconName, setIconName] = useState(service?.iconName || 'wrench');

  React.useEffect(() => {
    setTitle(service?.title || '');
    setDescription(service?.description || '');
    setIconName(service?.iconName || 'wrench');
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, iconName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-xl w-full max-w-lg p-6"
        onClick={e => e.stopPropagation()}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{service ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icon</label>
                <select value={iconName} onChange={e => setIconName(e.target.value)} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                    {iconNames.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 dark:bg-brand-border text-gray-800 dark:text-gray-200 font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">Cancel</button>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm">Save Service</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};


const AdminServices: React.FC = () => {
    const [services, setServices] = useState<Service[]>(getServices());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const handleAdd = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleDelete = (serviceTitle: string) => {
        if (window.confirm(`Are you sure you want to delete "${serviceTitle}"?`)) {
            const updatedServices = services.filter(s => s.title !== serviceTitle);
            setServices(updatedServices);
            saveServices(updatedServices);
        }
    };

    const handleSave = (service: Service) => {
        let updatedServices;
        if (editingService) {
            // Use original title from editingService for matching, in case title was changed
            updatedServices = services.map(s => s.title === editingService.title ? service : s);
        } else {
            if (services.some(s => s.title.toLowerCase() === service.title.toLowerCase())) {
                alert('A service with this title already exists.');
                return;
            }
            updatedServices = [...services, service];
        }
        setServices(updatedServices);
        saveServices(updatedServices);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Manage Services</h1>
                <button onClick={handleAdd} className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">Add New Service</button>
            </div>
            <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-card/30 dark:text-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Icon</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {services.map((service, index) => (
                        <tr key={index} className="bg-white dark:bg-brand-card border-b dark:border-brand-border">
                        <td className="px-6 py-4">
                            <span className="text-brand-blue">{React.createElement(iconMap[service.iconName], { className: 'w-6 h-6' })}</span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{service.title}</td>
                        <td className="px-6 py-4 max-w-md">{service.description}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                            <button onClick={() => handleEdit(service)} className="text-brand-blue hover:text-brand-blue-hover p-2">
                                <PencilIcon className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(service.title)} className="text-red-500 hover:text-red-700 p-2 ml-2">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} service={editingService} />}
            </AnimatePresence>
        </div>
    );
};

export default AdminServices;