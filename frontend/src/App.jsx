// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Transactions from './pages/Transactions/Transactions.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        {/* Добавите другие маршруты позже */}
      </Routes>
    </Router>
  );
}

export default App;