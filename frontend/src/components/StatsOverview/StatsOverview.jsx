// src/components/StatsOverview/StatsOverview.jsx
import React, { useState } from 'react';
import './StatsOverview.scss';
import { CATEGORY_COLORS } from '../../utils/categoryColors';

const StatsOverview = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Mock-данные — замените на props, когда подключите бэк
  const categories = [
    { id: 1, name: 'Еда', amount: 5000 },
    { id: 2, name: 'Косметика', amount: 3000 },
    { id: 3, name: 'Книги', amount: 2000 },
    { id: 4, name: 'Транспорт', amount: 1500 },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="stats-overview">
      <h3>Общая статистика</h3>
      <div className="stat-circle-container">
        <svg width="150" height="150" viewBox="0 0 150 150">
          {categories.map((cat, index) => {
            const startAngle = categories
              .slice(0, index)
              .reduce((sum, c) => sum + (c.amount / total) * 360, 0);
            const angle = (cat.amount / total) * 360;

            const x1 = 75 + 60 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 75 + 60 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 75 + 60 * Math.cos(((startAngle + angle) * Math.PI) / 180);
            const y2 = 75 + 60 * Math.sin(((startAngle + angle) * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;
            const color = CATEGORY_COLORS[cat.name] || '#cccccc';

            return (
              <path
                key={cat.id}
                d={`M 75 75 L ${x1} ${y1} A 60 60 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={color}
                stroke="#2d2834"
                strokeWidth="2"
                onMouseEnter={() => setHoveredSegment(cat)}
                onMouseLeave={() => setHoveredSegment(null)}
                className={hoveredSegment?.id === cat.id ? 'hovered' : ''}
              />
            );
          })}
        </svg>
        <div className="stat-circle-text">
          <span>45 905 ₽</span>
          <p>Остаток</p>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredSegment && (
        <div className="tooltip">
          <div className="tooltip-content">
            <div
              className="color-box"
              style={{ backgroundColor: CATEGORY_COLORS[hoveredSegment.name] || '#cccccc' }}
            ></div>
            <div>
              <strong>{hoveredSegment.name}</strong>
              <br />
              {((hoveredSegment.amount / total) * 100).toFixed(1)}% ({hoveredSegment.amount} ₽)
            </div>
          </div>
        </div>
      )}

      <div className="navigation-arrows">
        <button className="arrow-button">tuda</button>
        <button className="arrow-button">suda</button>
      </div>
    </div>
  );
};

export default StatsOverview;