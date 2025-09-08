import React from 'react';
import MapPinIcon from '../components/icons/MapPinIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import EnvelopeIcon from '../components/icons/EnvelopeIcon';
import ClockIcon from '../components/icons/ClockIcon';
import InstagramIcon from '../components/icons/InstagramIcon';
import LinkedinIcon from '../components/icons/LinkedinIcon';

const Contact: React.FC = () => {
  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or need to schedule a visit? We're here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input type="text" id="fullName" placeholder="John Doe" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input type="email" id="email" placeholder="you@example.com" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input type="tel" id="phone" placeholder="+971555872704" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea id="message" rows={5} placeholder="How can we help you today?" className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
              </div>
              <div>
                <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-md transition duration-300">
                  Send Message
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