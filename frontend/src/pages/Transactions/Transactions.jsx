// src/pages/Transactions/Transactions.jsx
import Header from '../../components/Header/Header';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Transactions.scss'; // 

const Transactions = () => {
  const location = useLocation();
  const { transactions } = location.state || {};

  if (!transactions) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="transactions-page">
    <Header />
      <h2>Все транзакции</h2>
      <div className="transactions-container">
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Банк</th>
              <th>Описание</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
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
    </div>
  );
};

export default Transactions;