import React, { useState } from 'react';
import { SOCIAL_LINKS, POLICIES } from '../../constants';
import { AnimatePresence, motion } from 'framer-motion';

const AdminSettings: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState(SOCIAL_LINKS);
  const [policies, setPolicies] = useState(POLICIES);
  const [showSocialSuccess, setShowSocialSuccess] = useState(false);
  const [showPolicySuccess, setShowPolicySuccess] = useState(false);

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };
  
  const handlePolicyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPolicies({ ...policies, [e.target.name]: e.target.value });
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the data.
    // For this demo, we just show a success message.
    setShowSocialSuccess(true);
    setTimeout(() => setShowSocialSuccess(false), 3000);
  };
  
  const handlePolicySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPolicySuccess(true);
    setTimeout(() => setShowPolicySuccess(false), 3000);
  };

  const SuccessMessage: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-sm text-green-600 dark:text-green-400"
    >
        Settings saved successfully!
    </motion.div>
  );

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Site Settings</h1>
      
      {/* Social Media Links */}
      <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Social Media Links</h2>
        <form onSubmit={handleSocialSubmit} className="space-y-4">
          <div>
            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook URL</label>
            <input type="url" name="facebook" id="facebook" value={socialLinks.facebook} onChange={handleSocialChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
          </div>
          <div>
            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram URL</label>
            <input type="url" name="instagram" id="instagram" value={socialLinks.instagram} onChange={handleSocialChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
            <input type="url" name="linkedin" id="linkedin" value={socialLinks.linkedin} onChange={handleSocialChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
          </div>
          <div>
            <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Twitter URL</label>
            <input type="url" name="twitter" id="twitter" value={socialLinks.twitter} onChange={handleSocialChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
          </div>
          <div className="flex justify-end items-center gap-4">
            <AnimatePresence>
                {showSocialSuccess && <SuccessMessage />}
            </AnimatePresence>
            <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">Save Social Links</button>
          </div>
        </form>
      </div>

      {/* Legal Policies */}
      <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Legal Policies</h2>
        <form onSubmit={handlePolicySubmit} className="space-y-4">
            <div>
              <label htmlFor="terms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Terms of Service</label>
              <textarea name="terms" id="terms" value={policies.terms} onChange={handlePolicyChange} rows={6} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
            </div>
            <div>
              <label htmlFor="privacy" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Privacy Policy</label>
              <textarea name="privacy" id="privacy" value={policies.privacy} onChange={handlePolicyChange} rows={6} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
            </div>
            <div>
              <label htmlFor="refund" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Refund Policy</label>
              <textarea name="refund" id="refund" value={policies.refund} onChange={handlePolicyChange} rows={6} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
            </div>
            <div className="flex justify-end items-center gap-4">
                <AnimatePresence>
                    {showPolicySuccess && <SuccessMessage />}
                </AnimatePresence>
              <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">Save Policies</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;