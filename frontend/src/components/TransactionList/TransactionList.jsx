// src/components/TransactionList/TransactionList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TransactionList.scss';

const TransactionList = ({ transactions }) => {
  const navigate = useNavigate();
  const firstThree = transactions.slice(0, 3);

  return (
    <div className="transaction-list">
      <h3>Список транзакций</h3>
      <div className="transaction-table-wrapper">
        <table>
          <tbody>
            {firstThree.map(tx => (
              <tr key={tx.id}>
                <td><div className="desc">{tx.date}</div></td>
                <td><div className="desc">{tx.status}</div></td>
                <td>
                  <div className="transaction-desc">
                    <div className="desc">{tx.desc}</div>
                    <div className="details">{tx.details}</div>
                  </div>
                </td>
                <td><div className="desc">{tx.amount}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length > 3 && (
        <div className="toggle-button-wrapper">
          <button
            className="toggle-button"
            onClick={() => navigate('/transactions', { state: { transactions } })}
          >
            Развернуть
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;