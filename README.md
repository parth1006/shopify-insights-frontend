# 📊 Shopify Insights Dashboard — Frontend

A modern, responsive React dashboard for visualizing Shopify store analytics including revenue trends, order analytics, and customer insights.

## 🔗 Live Demo

**Application**: https://shopify-insights-frontend.vercel.app/  
**Backend API**: https://shopify-insights-api-a7yt.onrender.com  
**Backend Repository**: https://github.com/parth1006/shopify-insights-backend

---

## 🛠️ Tech Stack

- **React 19** — Component-based UI library  
- **Vite 7.2** — Fast build tool and dev server  
- **React Router DOM 7.9** — Client-side routing  
- **Tailwind CSS 3.4** — Utility-first CSS framework  
- **Recharts 3.5** — Charts and data visualization  
- **Axios 1.13** — HTTP client

---

## 🏗️ Architecture

```
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
```

---

### 📁 Component Architecture

```
src/
├── pages/
│   ├── Landing.jsx          # Public landing page
│   ├── Login.jsx            # User login
│   ├── Register.jsx         # User registration
│   └── Dashboard.jsx        # Protected dashboard
│
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── ProtectedRoute.jsx   # Auth guard
│   └── dashboard/
│       ├── MetricsCard.jsx      # KPI cards
│       ├── RevenueChart.jsx     # Revenue line chart
│       ├── OrdersChart.jsx      # Orders bar chart
│       └── TopCustomers.jsx     # Customer leaderboard
│
└── lib/
    ├── api.js               # Axios instance + interceptors
    └── auth.js              # Auth utilities
```

---

## 🚀 Features

### 🔐 Authentication
- JWT-based login & registration  
- Protected routes  
- Token auto-injection in API calls  
- Auto-logout on token expiry  

### 📈 Dashboard Analytics
- Total revenue, orders, customers, AOV  
- Revenue trend chart (7/30/90 days)  
- Daily orders bar chart  
- Top customer ranking  

### 💡 User Experience
- Fully responsive layout  
- Loading states & error handling  
- Smooth animations  
- Manual real-time Shopify sync

---

## 📋 API Integration

### Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/me` | GET | Get current user |
| `/api/shopify/sync` | POST | Trigger data sync |
| `/api/insights/overview` | GET | Dashboard metrics |
| `/api/insights/revenue-trend` | GET | Revenue trend |
| `/api/insights/orders-by-date` | GET | Orders by date |
| `/api/insights/top-customers` | GET | Top customers |

---

### API Client Configuration

```javascript
// src/lib/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://shopify-insights-api-a7yt.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Inject token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to login on 401
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

export default api;
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
VITE_API_URL=https://shopify-insights-api-a7yt.onrender.com/api
```

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+  
- Backend API running (see backend repo)

### Installation

1. **Clone repo**
```bash
git clone https://github.com/parth1006/shopify-insights-frontend.git
cd shopify-insights-frontend
```

2. **Install packages**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
```

4. **Run dev server**
```bash
npm run dev
```

App runs at:  
👉 http://localhost:5173

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

---

## 🎯 Assumptions

1. SPA preferred over SSR  
2. Modern browsers with ES6+  
3. JWT auth sufficient for MVP  
4. Manual sync acceptable  
5. Mobile-first design  
6. Local timezone support  
7. Recharts chosen over D3  

---

## 📌 Current Limitations

- No real-time WebSocket updates  
- Static date ranges (no custom filter)  
- No CSV/PDF export  
- Basic error messages  
- No offline mode  
- Single-currency support  
- No multi-user roles  
- Only line & bar charts  

---

## 👨‍💻 Author

**Parth Maheshwari**  
📧 Email: parthmaheshwari4384@gmail.com  
🐙 GitHub: https://github.com/parth1006  
🔗 LinkedIn: https://www.linkedin.com/in/parth1006/
