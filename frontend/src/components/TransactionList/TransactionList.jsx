// src/components/TransactionList/TransactionList.jsx
import React from 'react';
import './TransactionList.scss';

const TransactionList = () => {
  const transactions = [
    { id: 1, date: '09.06.2025 04:45', status: 'Сбербанк', desc: 'Яндекс', amount: '-199 ₽' },
    { id: 2, date: '09.06.2025 04:45', status: 'T-Банк', desc: 'Иван Иванович И.', amount: '+1 105 ₽' },
    { id: 3, date: '09.06.2025 04:45', status: 'Сбербанк', desc: 'Стипендия', amount: '+16 889 ₽' },
  ];

  return (
    <div className="transaction-list">
      <h3>Список транзакций</h3>
      <table>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.status}</td>
              <td>{tx.desc}</td>
              <td>{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;