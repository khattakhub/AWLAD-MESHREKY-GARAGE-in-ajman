
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import TwitterIcon from './icons/TwitterIcon';
// FIX: Replaced require() with an ES6 import for addSubscriber.
import { getSocialLinks, addSubscriber } from '../data/store';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const socialLinks = getSocialLinks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || isSubscribing) return;
    
    setIsSubscribing(true);
    await addSubscriber({ email });

    setIsSubscribing(false);
    setEmail('');
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gray-50 dark:bg-brand-card border-t border-gray-200 dark:border-brand-border transition-colors duration-300">
      <div className="container mx-auto px-6 pt-12 pb-20 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">AWLAD MESHREKY</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
              Your trusted partner for quality and reliability. Professional Automotive Services in Ajman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue text-sm transition">Services</Link></li>
              <li><Link to="/tools" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue text-sm transition">Tools</Link></li>
              <li><Link to="/booking" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue text-sm transition">Appointment</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue text-sm transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue text-sm transition">Privacy Policy</Link></li>
              <li><Link to="/refund" className="text-gray-500 dark:text-gray-400 hover:text-brand-blue text-sm transition">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Stay Updated */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Stay Updated</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest deals and tips.</p>
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-l-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button
                type="submit"
                className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold px-4 rounded-r-md text-sm transition disabled:opacity-50"
                disabled={subscribed || isSubscribing}
              >
                {isSubscribing ? '...' : (subscribed ? 'Thanks!' : 'Subscribe')}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-brand-border flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AWLAD MESHREKY GARAGE. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-900 dark:hover:text-white transition"><FacebookIcon className="w-5 h-5" /></a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-900 dark:hover:text-white transition"><InstagramIcon className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
