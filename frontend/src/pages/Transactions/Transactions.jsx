import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Transactions.scss';
import { MOCK_OPERATIONS, MOCK_TRANSACTIONS, BANKS, CATEGORIES } from '../../mocks/userData';

const Transactions = () => {
  const location = useLocation();
  const { transactions: propTransactions, initialView } = location.state || {};

  // Принудительный скролл наверх
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [view, setView] = useState(initialView === 'all' ? 'all' : 'recent');

  const [filters, setFilters] = useState({
    income: true,
    expense: true,
    bank: 'all',
    category: 'all',
  });

  // Группировка операций по дате
  const groupedOperations = Object.entries(
    MOCK_OPERATIONS.reduce((acc, op) => {
      const date = op.date.split(' ')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(op);
      return acc;
    }, {})
  ).sort(([a], [b]) => new Date(b.split('.').reverse().join('-')) - new Date(a.split('.').reverse().join('-')));

  const transactions = propTransactions || MOCK_TRANSACTIONS;

  // Фильтрация транзакций
  const filteredTransactions = transactions.filter(tx => {
    const isIncome = tx.amount.startsWith('+');
    const isExpense = tx.amount.startsWith('-');

    const matchType = (filters.income && isIncome) || (filters.expense && isExpense);
    const matchBank = filters.bank === 'all' || tx.status === filters.bank;
    const matchCategory = filters.category === 'all' || tx.details === filters.category;

    return matchType && matchBank && matchCategory;
  });

  const toggleIncome = () => setFilters(prev => ({ ...prev, income: !prev.income }));
  const toggleExpense = () => setFilters(prev => ({ ...prev, expense: !prev.expense }));

  const resetFilters = () => {
    setFilters({
      income: true,
      expense: true,
      bank: 'all',
      category: 'all',
    });
  };

  return (
    <div className="transactions-page">
      <Header />

      <main className="container">
        {/* Вкладки */}
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
          <div className="transactions-table recent-operations-view">
            {groupedOperations.length > 0 ? (
              groupedOperations.map(([date, ops]) => (
                <div key={date} className="date-group">
                  <div className="date-header">{date}</div>
                  <div className="operations-container">
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
            {/* Фильтры */}
            <div className="filters">
              <div className="filter-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={filters.income}
                    onChange={toggleIncome}
                  />
                  Доходы
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={filters.expense}
                    onChange={toggleExpense}
                  />
                  Расходы
                </label>
              </div>

              <div className="filter-dropdown">
                <button className="filter-btn">
                  Банки <span className="count">{filters.bank === 'all' ? BANKS.length : 1}</span>
                </button>
                <ul className="filter-menu">
                  <li onClick={() => setFilters({ ...filters, bank: 'all' })}>Все банки</li>
                  {BANKS.map(bank => (
                    <li
                      key={bank}
                      onClick={() => setFilters({ ...filters, bank })}
                      className={filters.bank === bank ? 'selected' : ''}
                    >
                      {bank}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter-dropdown">
                <button className="filter-btn">
                  Категории <span className="count">{filters.category === 'all' ? CATEGORIES.length : 1}</span>
                </button>
                <ul className="filter-menu">
                  <li onClick={() => setFilters({ ...filters, category: 'all' })}>Все категории</li>
                  {CATEGORIES.map(cat => (
                    <li
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={filters.category === cat ? 'selected' : ''}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="reset-filters" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>

            {/* Таблица */}
            <div className="transactions-table all-transactions-view">
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