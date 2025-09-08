import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FuelIcon from '../components/icons/FuelIcon';

const FuelCostEstimator: React.FC = () => {
  const [distance, setDistance] = useState<number | string>(100);
  const [consumption, setConsumption] = useState<number | string>(8);
  const [price, setPrice] = useState<number | string>(3.02);
  const [totalCost, setTotalCost] = useState<string>('');

  const calculateCost = useCallback(() => {
    const numDistance = Number(distance);
    const numConsumption = Number(consumption);
    const numPrice = Number(price);

    if (numDistance > 0 && numConsumption > 0 && numPrice > 0) {
      const cost = (numDistance / 100) * numConsumption * numPrice;
      setTotalCost(cost.toFixed(2));
    } else {
      setTotalCost('');
    }
  }, [distance, consumption, price]);

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Link to="/tools" className="text-brand-blue hover:underline text-sm mb-4 inline-block">&larr; Back to All Tools</Link>
          <div className="flex justify-center items-center gap-4 mb-4">
              <FuelIcon className="w-10 h-10 text-brand-blue" />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Fuel Cost Estimator</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Calculate the fuel cost for your next road trip or daily commute.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enter Trip Details</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trip Distance (km)</label>
                <input
                  type="number"
                  id="distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="e.g., 350"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="consumption" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Vehicle's Fuel Consumption (L/100km)</label>
                <input
                  type="number"
                  id="consumption"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
                  className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="e.g., 8.5"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fuel Price (AED per liter)</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-white dark:bg-brand-dark border border-gray-300 dark:border-brand-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  placeholder="e.g., 3.02"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="mt-10">
              <button
                onClick={calculateCost}
                className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
              >
                Calculate Cost
              </button>
            </div>

            {totalCost && (
              <div className="mt-8 text-center bg-white dark:bg-brand-dark rounded-lg p-6">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Estimated Fuel Cost</p>
                <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                  AED <span className="text-brand-blue">{totalCost}</span>
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FuelCostEstimator;
