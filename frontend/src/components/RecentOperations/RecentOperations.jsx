// src/components/RecentOperations/RecentOperations.jsx
import React from 'react';
import './RecentOperations.scss';

const RecentOperations = () => {
  const operations = [
    { id: 1, amount: '-656 ₽', desc: 'Оплата банк', date: '09.06.2025 04:45' },
    { id: 2, amount: '+1 105 ₽', desc: 'Иван Иванович И.', date: '09.06.2025 04:45' },
    { id: 3, amount: '-199 ₽', desc: 'Яндекс', date: '09.06.2025 04:45' },
    { id: 4, amount: '+16 889 ₽', desc: 'Стипендия', date: '09.06.2025 04:45' },
  ];

  return (
    <div className="recent-operations">
      <h3>Недавние операции</h3>
      <ul>
        {operations.map(op => (
          <li key={op.id}>
            <span className="amount">{op.amount}</span>
            <span className="desc">{op.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentOperations;