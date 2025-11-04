// src/components/StatsOverview/StatsOverview.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ← ДОБАВЬ ЭТУ СТРОКУ
import './StatsOverview.scss';
import { CATEGORY_COLORS } from '../../utils/categoryColors';
import to_right from '/images/right.png';
import to_left from '/images/left.png';
import { MOCK_MONTHLY_DATA } from '../../mocks/userData';

const StatsOverview = () => {

  const navigate = useNavigate();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = текущий месяц
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentData = MOCK_MONTHLY_DATA[currentMonthIndex];
  const { month, balance, categories } = currentData;

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const radius = 60;
  const center = 75;
  let hideTimeout;

  const handleMouseEnter = (cat, midAngle) => {
    clearTimeout(hideTimeout);
    const container = containerRef.current.getBoundingClientRect();
    const svgSize = 150;
    const offset = 8;
    const svgX = center + (radius + offset) * Math.cos((midAngle * Math.PI) / 180);
    const svgY = center + (radius + offset) * Math.sin((midAngle * Math.PI) / 180);
    const x = (svgX / svgSize) * container.width;
    const y = (svgY / svgSize) * container.height;
    setTooltipPos({ x, y });
    setHoveredSegment(cat);
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => setHoveredSegment(null), 100);
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex < MOCK_MONTHLY_DATA.length - 1) {
      setCurrentMonthIndex(prev => prev + 1);
      setHoveredSegment(null);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(prev => prev - 1);
      setHoveredSegment(null);
    }
  };

  return (
    <div className="stats-overview">
      <h3>Общая статистика</h3>

      <div className="stat-content">
        <div className="stat-circle-wrapper">
          <button
            className="arrow-button left"
            onClick={handlePrevMonth}
            disabled={currentMonthIndex === MOCK_MONTHLY_DATA.length - 1}
          >
            <img src={to_left} alt="Предыдущий месяц" />
          </button>

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
              <span>{balance}</span>
              <p>{month}</p>
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
                {hoveredSegment.amount.toFixed(0)} ₽)
              </div>
            )}
          </div>

          <button
            className="arrow-button right"
            onClick={handleNextMonth}
            disabled={currentMonthIndex === 0}
          >
            <img src={to_right} alt="Следующий месяц" />
          </button>
        </div>
      </div>
      <div className="stats-button-wrapper">
        <button
          className="stats-button"
          onClick={() => navigate('/stats')}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default StatsOverview;