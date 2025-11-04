import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import "./Stats.scss";
import { CATEGORY_COLORS, MOCK_MONTHLY_DATA } from "../../mocks/userData";
import to_right from "/images/right.png";
import to_left from "/images/left.png";

const Stats = () => {
  const navigate = useNavigate();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const legendRef = useRef(null);

  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const currentData = MOCK_MONTHLY_DATA[currentMonthIndex];
  const { month, balance, categories } = currentData;
  const visibleCategories = categories.filter((cat) => cat.amount > 0);
  const total = visibleCategories.reduce((sum, cat) => sum + cat.amount, 0);

  // --- Обновление теней при скролле легенды ---
  useEffect(() => {
    const el = legendRef.current;
    if (!el) return;

    const updateShadows = () => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      setShowTopShadow(hasScroll && el.scrollTop > 0);
      setShowBottomShadow(
        hasScroll && el.scrollTop < el.scrollHeight - el.clientHeight - 1
      );
    };

    updateShadows();
    el.addEventListener("scroll", updateShadows);
    window.addEventListener("resize", updateShadows);

    return () => {
      el.removeEventListener("scroll", updateShadows);
      window.removeEventListener("resize", updateShadows);
    };
  }, [visibleCategories]);

  const radius = 50;
  const center = 75;
  let hideTimeout;

  const handleMouseEnter = (cat, midAngle, color) => {
    clearTimeout(hideTimeout);
    const container = containerRef.current.getBoundingClientRect();
    const svgSize = 150;
    const offset = 8;
    const svgX =
      center + (radius + offset) * Math.cos((midAngle * Math.PI) / 180);
    const svgY =
      center + (radius + offset) * Math.sin((midAngle * Math.PI) / 180);
    const x = (svgX / svgSize) * container.width;
    const y = (svgY / svgSize) * container.height;
    setTooltipPos({ x, y });
    setHoveredSegment({ ...cat, color });
  };

  const handleMouseLeave = () => {
    hideTimeout = setTimeout(() => setHoveredSegment(null), 100);
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex < MOCK_MONTHLY_DATA.length - 1) {
      setCurrentMonthIndex((prev) => prev + 1);
      setHoveredSegment(null);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex((prev) => prev - 1);
      setHoveredSegment(null);
    }
  };

  const months = [
    "Янв", "Фев", "Мар", "Апр", "Май", "Июн",
    "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
  ];

  const incomeData = MOCK_MONTHLY_DATA.map((m) => m.income);
  const expenseData = MOCK_MONTHLY_DATA.map((m) => m.expense);
  const maxIncome = Math.max(...incomeData);
  const maxExpense = Math.max(...expenseData);

  return (
    <div className="stats-page">
      <Header />
      <main className="container">
        {/* === Общая статистика === */}
        <section className="stat-section">
          <h2>Общая статистика</h2>
          <div className="stat-block">
            <div className="stat-card">
              <span className="stat-balance">
                {balance.toLocaleString("ru-RU")} ₽
              </span>
              <div className="stat-circle-wrapper">
                <button
                  className="arrow-button left"
                  onClick={handlePrevMonth}
                  disabled={currentMonthIndex === MOCK_MONTHLY_DATA.length - 1}
                >
                  <img src={to_left} alt="Назад" />
                </button>

                <div className="stat-circle-container" ref={containerRef}>
                  <svg width="100%" height="100%" viewBox="0 0 150 150">
                    {visibleCategories.map((cat, index) => {
                      const startAngle = visibleCategories
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
                      const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                      return (
                        <path
                          key={cat.id}
                          d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`}
                          fill="none"
                          stroke={color}
                          strokeWidth="8"
                          strokeLinecap="round"
                          onMouseEnter={() => handleMouseEnter(cat, midAngle, color)}
                          onMouseLeave={handleMouseLeave}
                          className={hoveredSegment?.id === cat.id ? "hovered" : ""}
                        />
                      );
                    })}
                  </svg>
                  <div className="stat-circle-text"><p>{month}</p></div>
                  {hoveredSegment && (
                    <div
                      className="tooltip"
                      style={{
                        top: `${tooltipPos.y}px`,
                        left: `${tooltipPos.x}px`,
                        backgroundColor: hoveredSegment.color || "#666",
                      }}
                    >
                      <strong>{hoveredSegment.name}</strong>
                      <br />
                      {((hoveredSegment.amount / total) * 100).toFixed(1)}% ({hoveredSegment.amount.toFixed(0)} ₽)
                    </div>
                  )}
                </div>

                <button
                  className="arrow-button right"
                  onClick={handleNextMonth}
                  disabled={currentMonthIndex === 0}
                >
                  <img src={to_right} alt="Вперёд" />
                </button>
              </div>
            </div>

            <div
              ref={legendRef}
              className={`stat-legend ${showTopShadow ? "show-top-shadow" : ""} ${
                showBottomShadow ? "show-bottom-shadow" : ""
              }`}
            >
              <div className="legend-content">
                {visibleCategories.map((cat, index) => {
                  const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length];
                  return (
                    <div key={cat.id} className="legend-item">
                      <div className="legend-color" style={{ backgroundColor: color }}></div>
                      <div className="legend-text">
                        <span>{cat.name}</span>
                        <span>{cat.amount.toFixed(0)} ₽</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* === Доходы и расходы === */}
        <section className="income-expense-section">
          <div className="chart-container">
            {/* === Доходы === */}
            <div className="chart-block">
              <h2>Доходы</h2>
              <div className="chart-card">
                <span className="chart-balance">
                  {incomeData[incomeData.length - 1].toLocaleString("ru-RU")} ₽
                </span>
                <svg viewBox="0 0 320 180">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={i} x1="0" x2="320" y1={30 + i * 25} y2={30 + i * 25}
                          stroke="#2b2b2b" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  <path
                    d={`M 0 150 ${incomeData
                      .map((v, i) => `L ${i * 27 + 20} ${130 - (v / maxIncome) * 90}`)
                      .join(" ")} L 320 150 Z`}
                    fill="rgba(76, 175, 80, 0.15)" />
                  <path
                    d={`M ${incomeData
                      .map((v, i) => `${i * 27 + 20} ${130 - (v / maxIncome) * 90}`)
                      .join(" L ")}`}
                    fill="none" stroke="#4caf50" strokeWidth="2" />
                  {incomeData.map((v, i) => (
                    <circle key={i} cx={i * 27 + 20} cy={130 - (v / maxIncome) * 90}
                            r="3" fill="#4caf50" />
                  ))}
                  {months.map((m, i) => (
                    <text key={m} x={i * 27 + 20} y="165"
                          textAnchor="middle" fontSize="9" fill="#9e9ea7">{m}</text>
                  ))}
                </svg>
              </div>
            </div>

            {/* === Расходы === */}
            <div className="chart-block">
              <h2>Расходы</h2>
              <div className="chart-card">
                <span className="chart-balance red">
                  {expenseData[expenseData.length - 1].toLocaleString("ru-RU")} ₽
                </span>
                <svg viewBox="0 0 320 180">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={i} x1="0" x2="320" y1={30 + i * 25} y2={30 + i * 25}
                          stroke="#2b2b2b" strokeWidth="1" strokeDasharray="4 4" />
                  ))}
                  <path
                    d={`M 0 150 ${expenseData
                      .map((v, i) => `L ${i * 27 + 20} ${130 - (v / maxExpense) * 90}`)
                      .join(" ")} L 320 150 Z`}
                    fill="rgba(244, 67, 54, 0.15)" />
                  <path
                    d={`M ${expenseData
                      .map((v, i) => `${i * 27 + 20} ${130 - (v / maxExpense) * 90}`)
                      .join(" L ")}`}
                    fill="none" stroke="#f44336" strokeWidth="2" />
                  {expenseData.map((v, i) => (
                    <circle key={i} cx={i * 27 + 20} cy={130 - (v / maxExpense) * 90}
                            r="3" fill="#f44336" />
                  ))}
                  {months.map((m, i) => (
                    <text key={m} x={i * 27 + 20} y="165"
                          textAnchor="middle" fontSize="9" fill="#9e9ea7">{m}</text>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </section>

        <button className="back-button" onClick={() => navigate(-1)}>Назад</button>
      </main>
    </div>
  );
};

export default Stats;
