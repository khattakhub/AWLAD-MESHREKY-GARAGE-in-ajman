
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CarTagIcon from '../components/icons/CarTagIcon';
// FIX: Switched to a namespace import for framer-motion to resolve type errors with motion props.
import * as FM from 'framer-motion';

const CarResaleValueEstimator: React.FC = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [mileage, setMileage] = useState<number | string>(50000);
  const [condition, setCondition] = useState('Good');
  const [estimatedValue, setEstimatedValue] = useState<string>('');

  const calculateValue = useCallback(() => {
    if (!make || !model || !year || !mileage) {
        setEstimatedValue('');
        return;
    }

    // Placeholder logic for estimation
    let baseValue = 50000; // Starting base value in AED

    // Adjust for year (newer cars are worth more)
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    baseValue -= age * 3000; // Depreciate by 3000 AED per year

    // Adjust for mileage (lower mileage is better)
    baseValue -= Number(mileage) * 0.1; // Depreciate by 0.1 AED per km

    // Adjust for condition
    switch (condition) {
        case 'Excellent':
            baseValue *= 1.1; // 10% bonus
            break;
        case 'Good':
            // No change for 'Good'
            break;
        case 'Fair':
            baseValue *= 0.85; // 15% penalty
            break;
        case 'Poor':
            baseValue *= 0.6; // 40% penalty
            break;
    }

    // Ensure value is not negative
    const finalValue = Math.max(baseValue, 1000); 

    setEstimatedValue(finalValue.toLocaleString('en-AE', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
  }, [make, model, year, mileage, condition]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Link to="/tools" className="text-brand-blue hover:underline text-sm mb-4 inline-block">&larr; Back to All Tools</Link>
          <div className="flex justify-center items-center gap-4 mb-4">
            <CarTagIcon className="w-10 h-10 text-brand-blue" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Car Resale Value Estimator</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Get an estimated market value for your current vehicle based on its details.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enter Vehicle Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Make</label>
              <input type="text" id="make" value={make} onChange={(e) => setMake(e.target.value)} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g., Toyota" />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model</label>
              <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g., Camry" />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year</label>
              <select id="year" value={year} onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mileage (km)</label>
              <input type="number" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" placeholder="e.g., 50000" min="0" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition</label>
              <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none">
                <option>Excellent</option>
                <option>Good</option>
                <option>Fair</option>
                <option>Poor</option>
              </select>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={calculateValue}
              className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Estimate Value
            </button>
          </div>

          {/* FIX: Replaced `AnimatePresence` with `FM.AnimatePresence` to use the namespaced import. */}
          <FM.AnimatePresence>
            {estimatedValue && (
              // FIX: Replaced `motion.div` with `FM.motion.div` to use the namespaced import.
              <FM.motion.div
                initial={{ opacity: 0, scale: 0.95, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: 'auto' }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 text-center bg-white dark:bg-brand-dark rounded-lg p-6 overflow-hidden"
              >
                <p className="text-gray-500 dark:text-gray-400 text-lg">Estimated Resale Value</p>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                  AED <span className="text-brand-blue">{estimatedValue}</span>
                </p>
                <p className="text-xs text-gray-400 mt-4">*This is a rough estimate. Actual value may vary.</p>
              </FM.motion.div>
            )}
          </FM.AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CarResaleValueEstimator;