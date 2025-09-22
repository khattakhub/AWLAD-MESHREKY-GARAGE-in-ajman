import React, { useState } from 'react';
import { 
    getSocialLinks, saveSocialLinks, 
    getPolicies, savePolicies,
    getHeroData, saveHeroData,
    getWhyChooseUsData, saveWhyChooseUsData
} from '../../data/store';
import { AnimatePresence, motion } from 'framer-motion';

const AdminSettings: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState(getSocialLinks());
  const [policies, setPolicies] = useState(getPolicies());
  const [heroData, setHeroData] = useState(getHeroData());
  const [whyChooseUsData, setWhyChooseUsData] = useState(getWhyChooseUsData());

  const [showSocialSuccess, setShowSocialSuccess] = useState(false);
  const [showPolicySuccess, setShowPolicySuccess] = useState(false);
  const [showHeroSuccess, setShowHeroSuccess] = useState(false);
  const [showWhyChooseUsSuccess, setShowWhyChooseUsSuccess] = useState(false);

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
  };
  
  const handlePolicyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPolicies({ ...policies, [e.target.name]: e.target.value });
  };
  
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeroData({ ...heroData, [e.target.name]: e.target.value });
  };

  const handleWhyChooseUsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWhyChooseUsData({ ...whyChooseUsData, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFeatures = [...whyChooseUsData.features];
    newFeatures[index] = { ...newFeatures[index], [e.target.name]: e.target.value };
    setWhyChooseUsData({ ...whyChooseUsData, features: newFeatures });
  };


  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSocialLinks(socialLinks);
    setShowSocialSuccess(true);
    setTimeout(() => setShowSocialSuccess(false), 3000);
  };
  
  const handlePolicySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePolicies(policies);
    setShowPolicySuccess(true);
    setTimeout(() => setShowPolicySuccess(false), 3000);
  };
  
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveHeroData(heroData);
    setShowHeroSuccess(true);
    setTimeout(() => setShowHeroSuccess(false), 3000);
  };
  
  const handleWhyChooseUsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveWhyChooseUsData(whyChooseUsData);
    setShowWhyChooseUsSuccess(true);
    setTimeout(() => setShowWhyChooseUsSuccess(false), 3000);
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
      
      {/* Home Page Content */}
      <div className="bg-white dark:bg-brand-card border dark:border-brand-border rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b dark:border-brand-border pb-3">Home Page Content</h2>
        
        {/* Hero Section */}
        <form onSubmit={handleHeroSubmit} className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Hero Section</h3>
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heading</label>
              <input type="text" name="heading" id="heading" value={heroData.heading} onChange={handleHeroChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div>
              <label htmlFor="subheading" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subheading</label>
              <input type="text" name="subheading" id="subheading" value={heroData.subheading} onChange={handleHeroChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="primaryButtonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Button Text</label>
                <input type="text" name="primaryButtonText" id="primaryButtonText" value={heroData.primaryButtonText} onChange={handleHeroChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
               <div>
                <label htmlFor="primaryButtonLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Button Link</label>
                <input type="text" name="primaryButtonLink" id="primaryButtonLink" value={heroData.primaryButtonLink} onChange={handleHeroChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secondary Button Text</label>
                <input type="text" name="secondaryButtonText" id="secondaryButtonText" value={heroData.secondaryButtonText} onChange={handleHeroChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
               <div>
                <label htmlFor="secondaryButtonLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secondary Button Link</label>
                <input type="text" name="secondaryButtonLink" id="secondaryButtonLink" value={heroData.secondaryButtonLink} onChange={handleHeroChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
              </div>
            </div>
            <div className="flex justify-end items-center gap-4">
              <AnimatePresence>
                  {showHeroSuccess && <SuccessMessage />}
              </AnimatePresence>
              <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">Save Hero Section</button>
            </div>
        </form>

        <hr className="my-6 border-gray-200 dark:border-brand-border"/>

        {/* Why Choose Us Section */}
        <form onSubmit={handleWhyChooseUsSubmit} className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">"Why Choose Us" Section</h3>
             <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
              <input type="text" name="title" id="why-title" value={whyChooseUsData.title} onChange={handleWhyChooseUsChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
             <div>
              <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Subtitle</label>
              <input type="text" name="subtitle" id="why-subtitle" value={whyChooseUsData.subtitle} onChange={handleWhyChooseUsChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input type="text" name="imageUrl" id="imageUrl" value={whyChooseUsData.imageUrl} onChange={handleWhyChooseUsChange} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
            </div>
            {whyChooseUsData.features.map((feature, index) => (
                <div key={index} className="p-4 border dark:border-brand-border rounded-md space-y-2">
                     <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Feature {index + 1}</h4>
                     <div>
                        <label htmlFor={`feature-title-${index}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input type="text" name="title" id={`feature-title-${index}`} value={feature.title} onChange={(e) => handleFeatureChange(index, e)} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                     </div>
                     <div>
                        <label htmlFor={`feature-desc-${index}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea name="description" id={`feature-desc-${index}`} value={feature.description} onChange={(e) => handleFeatureChange(index, e)} rows={2} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
                     </div>
                </div>
            ))}
            <div className="flex justify-end items-center gap-4">
              <AnimatePresence>
                  {showWhyChooseUsSuccess && <SuccessMessage />}
              </AnimatePresence>
              <button type="submit" className="bg-brand-blue hover:bg-brand-blue-hover text-white font-semibold py-2 px-5 rounded-lg transition duration-300 text-sm">Save "Why Choose Us"</button>
            </div>
        </form>

      </div>
      
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