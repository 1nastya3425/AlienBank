// src/pages/Home/Home.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Greeting from '../../components/Greeting/Greeting';
import CardsCarousel from '../../components/CardsCarousel/CardsCarousel';
import RecentOperations from '../../components/RecentOperations/RecentOperations';
import StatsOverview from '../../components/StatsOverview/StatsOverview';
import TransactionList from '../../components/TransactionList/TransactionList';
import './Home.scss';


// TODO: ПОДКЛЮЧЕНИЕ БЭКА
// Сейчас используются MOCK-данные из src/mocks/userData.js
// После подключения API:
// 1. Удалить импорт MOCK_*
// 2. Раскомментировать/заменить на useEffect с fetch('/api/dashboard')
// 3. Удалить папку src/mocks/

// Импортируем mock-данные
import {
  MOCK_USER,
  MOCK_CARDS,
  MOCK_OPERATIONS,
  MOCK_TRANSACTIONS
} from '../../mocks/userData';

const Home = () => {
  // Пока бэк не готов — используем моки
  const user = MOCK_USER;
  const cards = MOCK_CARDS;
  const recentOperations = MOCK_OPERATIONS;
  const transactions = MOCK_TRANSACTIONS;

  return (
    <div className="home-page">
      <Header />
      <main className="container">
        <Greeting userName={user.name} avatarUrl={user.avatarUrl} />
        <CardsCarousel cards={cards} />
        <div className="dashboard-grid">
          <RecentOperations operations={recentOperations} />
          <StatsOverview totalBalance={user.totalBalance} />
        </div>
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
};

export default Home;