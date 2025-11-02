// src/components/RecentOperations/RecentOperations.jsx
import React from 'react';
import './RecentOperations.scss';
import { useNavigate } from 'react-router-dom';


const RecentOperations = ({ operations }) => {

  const navigate = useNavigate();
  
  const parseDate = (dateStr) => {
    const [datePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  // Сортируем от новых к старым и берём первые 4
  const recentOps = [...operations]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 4);

  return (
    <div className="recent-operations">
      <h3>Недавние операции</h3>
      <ul>
        {recentOps.map(op => (
          <li key={op.id}>
            <span className={`icon ${op.type}`}>
              {op.type === 'income' ? '↑' : '↓'}
            </span>
            <div className="amount-date">
              <span className={`amount ${op.type}`}>{op.amount}</span>
              <span className="date">{op.date}</span>
            </div>
            <div className="operation-info">
              <span className="desc">{op.desc}</span>
              <span className="details">{op.details}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="operations-button-wrapper">
          <button
            className="operations-button"
            onClick={() => navigate('/transactions', { 
              state: { recentOperations: operations } 
            })}
          >
            Смотреть все
          </button>
      </div>
    </div>
  );
};

export default RecentOperations;