// src/components/Header/Header.jsx
import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1>МультиБанк</h1>
      <nav>
        <a href="#home">Главная</a>
        <a href="#stats">Статистика</a>
        <a href="#profile">Профиль</a>
      </nav>
    </header>
  );
};

export default Header;