// src/pages/Landing.jsx
import { Link } from 'react-router-dom';
import { authService } from '../lib/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if already logged in
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📊 Shopify Insights
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Multi-tenant Shopify data ingestion and insights service. Analyze your
            store's performance with real-time metrics and beautiful charts.
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link to="/register" className="btn-primary px-8 py-3 text-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary px-8 py-3 text-lg">
              Sign In
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="card text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold mb-2">Auto Sync</h3>
              <p className="text-gray-600">
                Automatically sync your Shopify data including customers, orders,
                and products
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">
                Beautiful charts and metrics to understand your store's
                performance
              </p>
            </div>

            <div className="card text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-lg font-semibold mb-2">Multi-Tenant</h3>
              <p className="text-gray-600">
                Secure multi-tenant architecture with complete data isolation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;