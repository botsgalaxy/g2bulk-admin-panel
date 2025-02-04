import React from "react";

const Home = () => {
  const data = {
    products: 125,
    orders: 76,
    newUsers: 42,
    totalRevenue: 3200,
    recentActivity: [
      "New order placed - Order #101",
      "New user registered - John Doe",
      'Product "Product 1" updated',
      "Order #76 shipped",
    ],
  };

  return (
    <div className="home-dashboard">
      <h1 className="home-title">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2 className="stat-title">Products</h2>
          <p className="stat-value">{data.products}</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Orders</h2>
          <p className="stat-value">{data.orders}</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">New Users</h2>
          <p className="stat-value">{data.newUsers}</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Total Revenue</h2>
          <p className="stat-value">${data.totalRevenue}</p>
        </div>
      </div>

      {/* Progress Bar Section */}
      <div className="order-progress-section">
        <h2 className="section-title">Order Progress</h2>
        <div className="progress-card">
          <p>Orders Processed</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(data.orders / 200) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h2 className="section-title">Recent Activity</h2>
        <ul className="activity-list">
          {data.recentActivity.map((activity, index) => (
            <li key={index} className="activity-item">
              {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-container">
          <button className="quick-action-button">Add New Product</button>
          <button className="quick-action-button">View Orders</button>
          <button className="quick-action-button">Manage Users</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
