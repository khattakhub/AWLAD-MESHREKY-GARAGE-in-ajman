
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../data/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@awladmeshreky.com'); // Demo email
  const [password, setPassword] = useState('admin123'); // Pre-fill for demo
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/admin/dashboard', { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // For demo purposes, we bypass Firebase if the credentials match the hint.
      // This allows the demo to work even if the user isn't set up in the Firebase backend.
      if (email === 'admin@awladmeshreky.com' && password === 'admin123') {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
        navigate('/admin/dashboard');
      } else {
        // For any other credentials, attempt a real Firebase login.
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Failed to login. Please check your email and password.');
      console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-brand-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-brand-card rounded-lg shadow-lg border dark:border-brand-border">
        <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Enter credentials to access the dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address-admin" className="sr-only">Email address</label>
              <input
                id="email-address-admin"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-brand-border placeholder-gray-500 text-gray-900 dark:text-white dark:bg-brand-dark focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password-admin" className="sr-only">Password</label>
              <input
                id="password-admin"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                }}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-brand-border placeholder-gray-500 text-gray-900 dark:text-white dark:bg-brand-dark focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-brand-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
             <p className="text-center text-xs text-gray-500 mt-4">For demo: email <strong>admin@awladmeshreky.com</strong> / password <strong>admin123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
};
