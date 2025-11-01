import Header from '../../components/Header/Header';
import { useState } from 'react';
import './Transactions.scss';
import { MOCK_OPERATIONS, MOCK_TRANSACTIONS, BANKS, CATEGORIES } from '../../mocks/userData';

const Transactions = () => {
  const [view, setView] = useState('recent'); // 'recent' | 'all'
  const [filters, setFilters] = useState({
    type: 'all',
    bank: 'all',
    category: 'all',
  });

  // Группировка операций по дате
  const groupedOperations = Object.entries(
    MOCK_OPERATIONS.reduce((acc, op) => {
      const date = op.date.split(' ')[0]; // "01.11.2025 14:30" → "01.11.2025"
      if (!acc[date]) acc[date] = [];
      acc[date].push(op);
      return acc;
    }, {})
  ).sort(([a], [b]) => new Date(b.split('.').reverse().join('-')) - new Date(a.split('.').reverse().join('-')));

  // Фильтрация транзакций
  const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
    const isIncome = tx.amount.startsWith('+');
    const isExpense = tx.amount.startsWith('-');

    const matchType =
      filters.type === 'all' ||
      (filters.type === 'income' && isIncome) ||
      (filters.type === 'expense' && isExpense);

    const matchBank = filters.bank === 'all' || tx.status === filters.bank;
    const matchCategory = filters.category === 'all' || tx.details === filters.category;

    return matchType && matchBank && matchCategory;
  });

  return (
    <div className="transactions-page">
      <Header />

      <main className="container">
        <div className="transactions-toggle">
          <button
            className={view === 'recent' ? 'active' : ''}
            onClick={() => setView('recent')}
          >
            Недавние операции
          </button>
          <button
            className={view === 'all' ? 'active' : ''}
            onClick={() => setView('all')}
          >
            Все транзакции
          </button>
        </div>

        {view === 'recent' ? (
          <div className="transactions-table">
            {groupedOperations.length > 0 ? (
              groupedOperations.map(([date, ops]) => (
                <div key={date} className="date-group">
                  <div className="date-title">{date}</div>
                  <div className="recent-operations-list">
                    {ops.map(op => {
                      const isIncome = op.amount.startsWith('+');
                      const type = isIncome ? 'income' : 'expense';
                      return (
                        <div key={op.id} className="operation-item">
                          <div className={`icon ${type}`}>
                            {isIncome ? '↑' : '↓'}
                          </div>
                          <div className="details">
                            <div className="desc">{op.desc}</div>
                            <div className="sub-desc">{op.details}</div>
                          </div>
                          <div className={`amount ${type}`}>
                            {op.amount}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">Нет недавних операций</p>
            )}
          </div>
        ) : (
          <>
            <div className="filters">
              <select
                value={filters.type}
                onChange={e => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">Все</option>
                <option value="income">Доходы</option>
                <option value="expense">Расходы</option>
              </select>

              <select
                value={filters.bank}
                onChange={e => setFilters({ ...filters, bank: e.target.value })}
              >
                <option value="all">Все банки</option>
                {BANKS.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>

              <select
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">Все категории</option>
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="transactions-table">
              {filteredTransactions.length > 0 ? (
                <table>
                  <tbody>
                    {filteredTransactions.map(tx => (
                      <tr key={tx.id}>
                        <td><div className="desc">{tx.date}</div></td>
                        <td><div className="desc">{tx.status}</div></td>
                        <td>
                          <div className="transaction-desc">
                            <div className="desc">{tx.desc}</div>
                            <div className="details">{tx.details}</div>
                          </div>
                        </td>
                        <td>
                          <div className={`desc ${tx.amount.startsWith('+') ? 'income' : 'expense'}`}>
                            {tx.amount}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-results">Нет данных по фильтрам</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Transactions;