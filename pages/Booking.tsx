
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getServices, addAppointment } from '../data/store';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';

const Booking: React.FC = () => {
  const services = getServices();
  const location = useLocation();

  const getSelectedService = () => {
    const params = new URLSearchParams(location.search);
    return params.get('service') || '';
  };

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(getSelectedService());
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setService(getSelectedService());
  }, [location.search]);

  const resetForm = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setService('');
    setDate('');
    setTime('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !service || !date || !time) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    await addAppointment({
      fullName,
      phoneNumber,
      email,
      service,
      date,
      time,
      message,
    });
    
    setIsSubmitting(false);
    resetForm();
    setShowSuccess(true);
    window.scrollTo(0, 0);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Book an Appointment</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Fill out the form below to schedule your visit. We'll confirm your appointment shortly.</p>
          </div>

          {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
          <FM.AnimatePresence>
            {showSuccess && (
              // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
              <FM.motion.div
                className="bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg relative mb-6"
                role="alert"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> Your appointment request has been sent. We will contact you shortly to confirm.</span>
              </FM.motion.div>
            )}
          </FM.AnimatePresence>

          <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input type="tel" id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required placeholder="0501234567" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address (Optional)</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="md:col-span-2">
                 <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service</label>
                 <select id="service" value={service} onChange={e => setService(e.target.value)} required className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                 </select>
              </div>
               <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Date</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" min={new Date().toISOString().split("T")[0]} />
              </div>
               <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Time</label>
                <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Message (Optional)</label>
                <textarea id="message" rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about your car or the issue..." className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-md transition duration-300 disabled:opacity-50" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending Request...' : 'Send Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;