// src/components/dashboard/OrdersChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OrdersChart = ({ data }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Orders by Date</h3>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No order data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              formatter={(value, name) => {
                if (name === 'orderCount') return [value, 'Orders'];
                if (name === 'revenue') return [`$${value.toFixed(2)}`, 'Revenue'];
                return [value, name];
              }}
            />
            <Bar dataKey="orderCount" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrdersChart;