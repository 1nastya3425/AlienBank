// src/components/CardsCarousel/CardsCarousel.jsx
import React from 'react';
import './CardsCarousel.scss';

const CardsCarousel = ({ cards }) => {
  return (
    <div className="cards-carousel">
      {cards.map(card => (
        <div
          key={card.id}
          className={`card ${card.type === 'Основной' ? 'green' : card.type === 'Карта' ? 'yellow' : 'blue'}`}
        >
          <div className="card-content">
            <div className="balance">{card.balance}</div>
            <div className="type">{card.type}</div>
            <div className="card-number">{card.number}</div>
          </div>
          <button className="transfer-btn">Перевести</button>
          <div className="icon">{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default CardsCarousel;