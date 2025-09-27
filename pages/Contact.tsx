import React, { useState } from 'react';
import MapPinIcon from '../components/icons/MapPinIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import EnvelopeIcon from '../components/icons/EnvelopeIcon';
import ClockIcon from '../components/icons/ClockIcon';
import InstagramIcon from '../components/icons/InstagramIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';
import { addMessage } from '../data/store';
import * as FM from 'framer-motion';

const Contact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    try {
      await addMessage({ fullName, email, phone, message });
      resetForm();
      setShowSuccess(true);
      window.scrollTo(0, 0);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or need to schedule a visit? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <FM.AnimatePresence>
          {showError && (
            <FM.motion.div
              className="bg-red-100 dark:bg-red-900/50 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative mb-6 max-w-4xl mx-auto"
              role="alert"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Could not send message. Please check your connection and try again.</span>
            </FM.motion.div>
          )}
          {showSuccess && (
            <FM.motion.div
              className="bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg relative mb-6 max-w-4xl mx-auto"
              role="alert"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Your message has been sent. We will get back to you shortly.</span>
            </FM.motion.div>
          )}
        </FM.AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="John Doe" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number (Optional)</label>
                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+971555872704" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea id="message" rows={5} value={message} onChange={e => setMessage(e.target.value)} required placeholder="How can we help you today?" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-md transition duration-300 disabled:opacity-50" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div>
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <MapPinIcon className="w-6 h-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                  <p className="text-gray-500 dark:text-gray-400">Industrial Area, Jurf 2 - Ajman - United Arab Emirates</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <PhoneIcon className="w-6 h-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                  <p className="text-gray-500 dark:text-gray-400">+971 55 587 2704</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <EnvelopeIcon className="w-6 h-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                  <p className="text-gray-500 dark:text-gray-400">contact@awladmeshreky.com</p>
                </div>
              </div>
               <div className="flex items-start space-x-4">
                <ClockIcon className="w-6 h-6 text-brand-blue mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Hours</h3>
                  <ul className="text-gray-500 dark:text-gray-400">
                    <li><strong>Sat - Thu:</strong> 8:00 AM - 9:00 PM</li>
                    <li><strong>Friday:</strong> 8:00 AM - 12:00 PM, 2:00 PM - 9:00 PM</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <InstagramIcon className="w-6 h-6 text-brand-blue mt-1 flex-shrink-0" />
                <LinkedinIcon className="w-6 h-6 text-brand-blue mt-1 flex-shrink-0" />
              </div>
            </div>
            
            <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-brand-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14422.04033285743!2d55.4973688!3d25.354515!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f590680000001%3A0x633532a4e7c4a938!2sAWLAD%20MESHREKY%20GARAGE!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className='grayscale dark:invert'
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;