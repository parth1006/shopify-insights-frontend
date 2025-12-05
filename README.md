# 📊 Shopify Insights Dashboard - Frontend

A modern, responsive React dashboard for visualizing Shopify store analytics including revenue trends, order analytics, and customer insights.

## 🔗 Live Demo

**Application**: https://shopify-insights-frontend.vercel.app/

**Backend API**: https://shopify-insights-api-a7yt.onrender.com

**Backend Repository**: https://github.com/parth1006/shopify-insights-backend

---

## 🛠️ Tech Stack

- **React 19** - Component-based UI library
- **Vite 7.2** - Fast build tool and development server
- **React Router DOM 7.9** - Client-side routing
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Recharts 3.5** - Chart library for data visualization
- **Axios 1.13** - Promise-based HTTP client

---
## 🏗️ Architecture┌─────────────────────────────────────────────┐
┌──────────────────────────────────────────────┐
│            React SPA (Frontend)              │
└──────────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────┐
│   Axios HTTP     │
│     Client       │
└──────────────────┘
                     │
                     ▼
┌──────────────────┐
│   JWT Auth       │
│ (localStorage)   │
└──────────────────┘
                     │
                     ▼
┌──────────────────┐
│  Express.js API   │
│     Backend       │
└──────────────────┘


---
### Component Architecture
src/
├── pages/
│   ├── Landing.jsx          # Public landing page
│   ├── Login.jsx            # Authentication - login
│   ├── Register.jsx         # Authentication - registration
│   └── Dashboard.jsx        # Protected - main dashboard
│
├── components/
│   ├── Navbar.jsx           # Navigation bar with user info
│   ├── ProtectedRoute.jsx   # Route guard for authentication
│   └── dashboard/
│       ├── MetricsCard.jsx      # KPI display cards
│       ├── RevenueChart.jsx     # Line chart for revenue trends
│       ├── OrdersChart.jsx      # Bar chart for orders
│       └── TopCustomers.jsx     # Customer ranking list
│
└── lib/
├── api.js               # Axios instance with interceptors
└── auth.js              # Authentication service
---

## 🚀 Features

### Authentication & Authorization
- JWT-based authentication
- Protected routes with automatic redirect
- Token stored in localStorage
- Automatic token injection in API requests
- Token expiration handling

### Dashboard Analytics
- **Overview Metrics**: Total customers, orders, revenue, average order value
- **Revenue Trend Chart**: Interactive line chart with 7/30/90-day filters
- **Orders by Date**: Bar chart showing daily order volume
- **Top Customers**: Ranked list of customers by total spend

### User Experience
- Responsive design (mobile, tablet, desktop)
- Loading states for async operations
- Error handling with user-friendly messages
- Real-time data sync with Shopify
- Smooth transitions and animations

---

## 📋 API Integration

### Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User authentication |
| `/api/auth/me` | GET | Get current user info |
| `/api/shopify/sync` | POST | Trigger Shopify data sync |
| `/api/insights/overview` | GET | Get dashboard metrics |
| `/api/insights/revenue-trend` | GET | Get revenue trend data |
| `/api/insights/orders-by-date` | GET | Get orders by date |
| `/api/insights/top-customers` | GET | Get top customers ranking |

### API Client Configuration
```javascript
// src/lib/api.js
const api = axios.create({
baseURL: 'https://shopify-insights-api-a7yt.onrender.com/api',
headers: {
'Content-Type': 'application/json',
},
});// Automatic token injection
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) {
config.headers.Authorization = Bearer ${token};
}
return config;
});// Automatic redirect on 401
api.interceptors.response.use(
(response) => response,
(error) => {
if (error.response?.status === 401) {
localStorage.removeItem('token');
window.location.href = '/login';
}
return Promise.reject(error);
}
);

---
---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_URL=https://shopify-insights-api-a7yt.onrender.com/api
```
---

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see [backend repository](https://github.com/parth1006/shopify-insights-backend))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/parth1006/shopify-insights-frontend.git
cd shopify-insights-frontend
```
2. **Install dependencies**
```bash
npm install
```
3. **Configure environment variables**
```bash
# Copy and edit .env file
cp .env.example .env
```

Edit `.env` and set your backend API URL.

4. **Run development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`
### Build for Production
```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---
## 🎯 Assumptions Made

1. **Single Page Application**: Assumed users prefer SPA experience over server-side rendering
2. **Modern Browsers**: Assumes ES6+ support, no IE11 compatibility needed
3. **Authentication Flow**: JWT-based stateless authentication is sufficient for MVP
4. **Data Refresh**: Manual sync via button is acceptable (no real-time websockets needed)
5. **Mobile Support**: Mobile-first responsive design prioritized
6. **Timezone**: All dates displayed in user's local timezone
7. **Chart Libraries**: Recharts chosen for simplicity over advanced features (D3.js)

---
### Current Version

1. **No Real-time Updates**: Data only refreshes on manual sync or page reload
2. **Limited Date Filtering**: Fixed 7/30/90-day periods (no custom date range)
3. **No Data Export**: Cannot export charts or data to CSV/PDF
4. **Basic Error Messages**: Generic error messages, not granular field-level validation
5. **No Offline Support**: Requires active internet connection
6. **Single Currency**: Assumes all transactions in USD
7. **No User Management**: Cannot manage multiple users or roles
8. **Limited Chart Types**: Only line and bar charts available

## 👨‍💻 Author

**Parth Maheshwari**

- Email: parthmaheshwari4384@gmail.com
- GitHub: [@parth1006](https://github.com/parth1006)
- LinkedIN: [@parth1006](https://www.linkedin.com/in/parth1006/)
---