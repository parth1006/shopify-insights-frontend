const TopCustomers = ({ customers }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Customers by Spend</h3>

      {customers.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No customer data available
        </div>
      ) : (
        <div className="space-y-4">
          {customers.map((customer, index) => {
            // Handle missing customer names
            const displayName = customer.firstName && customer.lastName
              ? `${customer.firstName} ${customer.lastName}`
              : customer.email || 'Anonymous Customer';
            
            return (
              <div
                key={customer.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {displayName}
                    </p>
                    {customer.email && customer.email !== displayName && (
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    )}
                    {!customer.email && !customer.firstName && (
                      <p className="text-sm text-gray-400 italic">No contact info</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {customer.ordersCount} {customer.ordersCount === 1 ? 'order' : 'orders'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopCustomers;