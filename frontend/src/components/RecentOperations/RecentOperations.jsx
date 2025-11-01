// src/components/RecentOperations/RecentOperations.jsx
import React from 'react';
import './RecentOperations.scss';

const RecentOperations = ({ operations }) => {
  return (
    <div className="recent-operations">
      <h3>Недавние операции</h3>
      <ul>
        {operations.map(op => (
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
    </div>
  );
};

export default RecentOperations;