// src/components/StatsOverview/StatsOverview.jsx
import React from 'react';
import './StatsOverview.scss';

const StatsOverview = () => {
  return (
    <div className="stats-overview">
      <h3>Общая статистика</h3>
      <div className="stat-circle">
        <span>45 905 ₽</span>
        <p>Остаток</p>
      </div>
      <div className="navigation-arrows">
        <button className="arrow-button">tuda</button>
        <button className="arrow-button">suda</button>
      </div>
    </div>
  );
};

export default StatsOverview;