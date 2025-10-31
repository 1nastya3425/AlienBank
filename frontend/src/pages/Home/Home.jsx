// src/pages/Home/Home.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Greeting from '../../components/Greeting/Greeting';
import CardsCarousel from '../../components/CardsCarousel/CardsCarousel';
import RecentOperations from '../../components/RecentOperations/RecentOperations';
import StatsOverview from '../../components/StatsOverview/StatsOverview';
import TransactionList from '../../components/TransactionList/TransactionList';
import './Home.scss';


const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="container">
        <Greeting />
        <CardsCarousel />
        <div className="dashboard-grid">
          <RecentOperations />
          <StatsOverview />
        </div>
        <TransactionList />
      </main>
    </div>
  );
};

export default Home;