import React, { useState, useRef } from 'react';
import './StatsOverview.scss';
import { CATEGORY_COLORS } from '../../utils/categoryColors';

const StatsOverview = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const categories = [
    { id: 1, name: 'Еда', amount: 5000 },
    { id: 2, name: 'Косметика', amount: 3000 },
    { id: 3, name: 'Книги', amount: 2000 },
    { id: 4, name: 'Транспорт', amount: 1500 },
    { id: 5, name: 'Развлечения', amount: 1500 },
    { id: 6, name: 'Здоровье', amount: 1500 }
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const radius = 60;
  const center = 75;
  let hideTimeout;

  const handleMouseEnter = (cat, midAngle) => {
    clearTimeout(hideTimeout);

    const container = containerRef.current.getBoundingClientRect();
    const svgSize = 150;

    // --- смещение по направлению от центра круга ---
    const offset = 5; // насколько дальше от круга сдвигать tooltip
    const svgX = center + (radius + offset) * Math.cos((midAngle * Math.PI) / 180);
    const svgY = center + (radius + offset) * Math.sin((midAngle * Math.PI) / 180);

    // пересчёт в пиксели контейнера
    const x = (svgX / svgSize) * container.width;
    const y = (svgY / svgSize) * container.height;

    setTooltipPos({ x, y });
    setHoveredSegment(cat);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => setHoveredSegment(null), 100);
  };

  return (
    <div className="stats-overview">
      <h3>Общая статистика</h3>

      <div className="stat-circle-container" ref={containerRef}>
        <svg width="100%" height="100%" viewBox="0 0 150 150">
          {categories.map((cat, index) => {
            const startAngle = categories
              .slice(0, index)
              .reduce((sum, c) => sum + (c.amount / total) * 360, 0);
            const angle = (cat.amount / total) * 360;
            const endAngle = startAngle + angle;
            const midAngle = startAngle + angle / 2;

            const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;
            const color = CATEGORY_COLORS[cat.name] || '#cccccc';

            return (
              <path
                key={cat.id}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
                onMouseEnter={() => handleMouseEnter(cat, midAngle)}
                onMouseLeave={handleMouseLeave}
                className={hoveredSegment?.id === cat.id ? 'hovered' : ''}
              />
            );
          })}
        </svg>

        <div className="stat-circle-text">
          <span>45 905 ₽</span>
          <p>Остаток</p>
        </div>

        {hoveredSegment && (
          <div
            className="tooltip"
            style={{
              top: `${tooltipPos.y}px`,
              left: `${tooltipPos.x}px`,
              backgroundColor: CATEGORY_COLORS[hoveredSegment.name] || '#666',
            }}
          >
            <strong>{hoveredSegment.name}</strong>
            <br />
            {((hoveredSegment.amount / total) * 100).toFixed(1)}% (
            {hoveredSegment.amount} ₽)
          </div>
        )}
      </div>

      <div className="navigation-arrows">
        <button className="arrow-button">tuda</button>
        <button className="arrow-button">suda</button>
      </div>
    </div>
  );
};

export default StatsOverview;
