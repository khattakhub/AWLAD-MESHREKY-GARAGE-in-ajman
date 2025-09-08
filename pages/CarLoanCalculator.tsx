import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import CalculatorIcon from '../components/icons/CalculatorIcon';

const CarLoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [loanTerm, setLoanTerm] = useState<number>(5);
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');

  const calculatePayment = useCallback(() => {
    const principal = loanAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && interestRate > 0 && numberOfPayments > 0) {
      const payment =
        (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      setMonthlyPayment(payment.toFixed(2));
    } else if (principal > 0 && numberOfPayments > 0) { // 0% interest case
        setMonthlyPayment((principal/numberOfPayments).toFixed(2));
    }
    else {
      setMonthlyPayment('');
    }
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Link to="/tools" className="text-brand-blue hover:underline text-sm mb-4 inline-block">&larr; Back to All Tools</Link>
          <div className="flex justify-center items-center gap-4 mb-4">
              <CalculatorIcon className="w-10 h-10 text-brand-blue" />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Car Loan Calculator</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Estimate your monthly payments for a new or used car loan.</p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Estimate Your Monthly Payment</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Adjust the sliders or enter values to see your estimated car loan payment.</p>
          <div className="space-y-8">
            <div>
              <label htmlFor="loanAmount" className="flex justify-between items-baseline text-gray-900 dark:text-white font-medium">
                <span>Loan Amount</span>
                <span className="text-brand-blue font-bold text-lg">AED {loanAmount.toLocaleString()}</span>
              </label>
              <input
                id="loanAmount"
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="interestRate" className="flex justify-between items-baseline text-gray-900 dark:text-white font-medium">
                <span>Interest Rate</span>
                 <span className="text-brand-blue font-bold text-lg">{interestRate.toFixed(2)}%</span>
              </label>
              <input
                id="interestRate"
                type="range"
                min="0"
                max="20"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="loanTerm" className="flex justify-between items-baseline text-gray-900 dark:text-white font-medium">
                <span>Loan Term</span>
                <span className="text-brand-blue font-bold text-lg">{loanTerm} Year{loanTerm > 1 ? 's' : ''}</span>
              </label>
              <input
                id="loanTerm"
                type="range"
                min="1"
                max="7"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-blue"
              />
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={calculatePayment}
              className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300"
            >
              Calculate
            </button>
          </div>
          {monthlyPayment && (
            <div className="mt-8 text-center bg-white dark:bg-brand-dark rounded-lg p-6">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Estimated Monthly Payment</p>
              <p className="text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                AED <span className="text-brand-blue">{monthlyPayment}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarLoanCalculator;
