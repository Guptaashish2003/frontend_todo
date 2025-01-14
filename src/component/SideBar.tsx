// components/Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="user-section">
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          className="user-image"
        />
        <p className="user-name">Hey, ABCD</p>
      </div>
      <ul className="menu">
        <li>Today</li>
        <li>Important</li>
        <li>Planned</li>
        <li>Assigned to me</li>
      </ul>
      <div className="task-summary">
        <p>Today Tasks</p>
        <div className="task-chart">
          <div className="chart-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
