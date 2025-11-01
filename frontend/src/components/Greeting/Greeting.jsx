// src/components/Greeting/Greeting.jsx
import React from 'react';
import './Greeting.scss';

const Greeting = ({ userName = 'Пользователь', avatarUrl = '/images/avatar-placeholder.jpg' }) => {
  return (
    <div className="greeting">
      <img
        src={avatarUrl}
        alt="Аватар"
        className="greeting-avatar"
        onError={(e) => {
          e.target.src = '/images/avatar-placeholder.jpg';
        }}
      />
      <div className="greeting-text">
        <h2>Здравствуйте, {userName}!</h2>
        <p>Как у Вас дела?</p>
      </div>
    </div>
  );
};

export default Greeting;