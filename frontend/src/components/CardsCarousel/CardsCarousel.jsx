// src/components/CardsCarousel/CardsCarousel.jsx
import React from 'react';
import './CardsCarousel.scss';

const CardsCarousel = () => {
  const cards = [
    { id: 1, balance: '19 106,07 ₽', type: 'Основной', number: '**** 3815', icon: '🔄' },
    { id: 2, balance: '19 106,07 ₽', type: 'Карта', number: '**** 3815', icon: '🛡️' },
    { id: 3, balance: '19 106,07 ₽', type: 'Накопительный', number: '**** 3815', icon: '📈' },
  ];

  return (
    <div className="cards-carousel">
      {cards.map(card => (
        <div key={card.id} className={`card ${card.type === 'Основной' ? 'green' : card.type === 'Карта' ? 'yellow' : 'blue'}`}>
          <div className="balance">{card.balance}</div>
          <div className="type">{card.type}</div>
          <div className="card-number">{card.number}</div>
          <div className="icon">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default CardsCarousel;