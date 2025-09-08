import React from 'react';
import { SERVICES } from '../constants';

const Booking: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Book an Appointment</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Fill out the form below to schedule your visit. We'll confirm your appointment shortly.</p>
          </div>

          <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input type="text" id="fullName" placeholder="John Doe" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input type="tel" id="phoneNumber" placeholder="0501234567" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address (Optional)</label>
                <input type="email" id="email" placeholder="you@example.com" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="md:col-span-2">
                 <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service</label>
                 <select id="service" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                    <option>Select a service</option>
                    {SERVICES.map(s => <option key={s.title}>{s.title}</option>)}
                 </select>
              </div>
               <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Date</label>
                <input type="date" id="date" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
               <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Time</label>
                <input type="time" id="time" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Additional Message (Optional)</label>
                <textarea id="message" rows={4} placeholder="Tell us about your car or the issue..." className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-md transition duration-300">
                  Send Request
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
