// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import MetricsCard from '../components/dashboard/MetricsCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import OrdersChart from '../components/dashboard/OrdersChart';
import TopCustomers from '../components/dashboard/TopCustomers';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [overview, setOverview] = useState(null);
  const [revenueTrend, setRevenueTrend] = useState([]);
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [revenuePeriod, setRevenuePeriod] = useState('30d');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, [revenuePeriod]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');

    try {
      const [overviewRes, revenueRes, ordersRes, customersRes] = await Promise.all([
        api.get('/insights/overview'),
        api.get(`/insights/revenue-trend?period=${revenuePeriod}`),
        api.get('/insights/orders-by-date?startDate=2024-01-01&endDate=2025-12-31'),
        api.get('/insights/top-customers?limit=5'),
      ]);

      setOverview(overviewRes.data);
      setRevenueTrend(revenueRes.data);
      setOrdersByDate(ordersRes.data);
      setTopCustomers(customersRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (!window.confirm('This will sync all data from Shopify. Continue?')) {
      return;
    }

    setSyncing(true);
    setError('');

    try {
      const response = await api.post('/shopify/sync');
      alert(`Sync completed! 
Customers: ${response.data.counts.customers}
Products: ${response.data.counts.products}
Orders: ${response.data.counts.orders}`);
      
      // Refresh dashboard data
      fetchDashboardData();
    } catch (err) {
      console.error('Sync error:', err);
      setError(err.response?.data?.error || 'Sync failed. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  if (loading && !overview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your Shopify store</p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="btn-primary disabled:opacity-50"
          >
            {syncing ? '🔄 Syncing...' : '🔄 Sync Shopify Data'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Metrics Cards */}
        {overview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Total Customers"
              value={overview.totalCustomers.toLocaleString()}
              icon="👥"
              color="blue"
            />
            <MetricsCard
              title="Total Orders"
              value={overview.totalOrders.toLocaleString()}
              icon="🛒"
              color="green"
            />
            <MetricsCard
              title="Total Revenue"
              value={`$${overview.totalRevenue.toLocaleString()}`}
              icon="💰"
              color="purple"
            />
            <MetricsCard
              title="Avg Order Value"
              value={`$${overview.avgOrderValue.toFixed(2)}`}
              icon="📊"
              color="orange"
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RevenueChart
            data={revenueTrend}
            period={revenuePeriod}
            onPeriodChange={setRevenuePeriod}
          />
          <OrdersChart data={ordersByDate} />
        </div>

        {/* Top Customers */}
        <TopCustomers customers={topCustomers} />
      </main>
    </div>
  );
};

export default Dashboard;