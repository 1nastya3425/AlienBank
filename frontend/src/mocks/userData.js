// src/mocks/userData.js

// MOCK-DATA — УДАЛИТЬ ПОСЛЕ ПОДКЛЮЧЕНИЯ БЭКА
// Этот файл используется ТОЛЬКО для демо и разработки без бэка.
// После подключения API — удалить этот файл и импорт в Home.jsx.


export const MOCK_USER = {
  name: 'Иван',
  avatarUrl: '/images/avatar-placeholder.jpg',
  totalBalance: '45 905 ₽',
};

export const MOCK_CARDS = [
  { id: 1, balance: '19 106,07 ₽', type: 'Основной', number: '**** 3815', icon: '' },
  { id: 2, balance: '19 106,07 ₽', type: 'Карта', number: '**** 3815', icon: '' },
  { id: 3, balance: '19 106,07 ₽', type: 'Накопительный', number: '**** 3815', icon: '' },
];

export const MOCK_OPERATIONS = [
  { 
    id: 1, 
    amount: '-656 ₽', 
    desc: 'Оплата банк', 
    date: '09.06.2025 04:45', 
    type: 'expense',
    details: 'Оплата по QR-коду СБП'
  },
  { 
    id: 2, 
    amount: '+1 105 ₽', 
    desc: 'Иван Иванович И.', 
    date: '09.06.2025 04:45', 
    type: 'income',
    details: 'Входящий перевод'
  },
  { 
    id: 3, 
    amount: '-199 ₽', 
    desc: 'Яндекс', 
    date: '09.06.2025 04:45', 
    type: 'expense',
    details: 'Оплата товаров и услуг'
  },
  { 
    id: 4, 
    amount: '+16 889 ₽', 
    desc: 'Стипендия', 
    date: '09.06.2025 04:45', 
    type: 'income',
    details: 'Зачисление зарплаты'
  },
];

export const MOCK_TRANSACTIONS = [
  { id: 1, date: '09.06.2025 04:45', status: 'Сбербанк', desc: 'Яндекс', amount: '-199 ₽' },
  { id: 2, date: '09.06.2025 04:45', status: 'T-Банк', desc: 'Иван Иванович И.', amount: '+1 105 ₽' },
  { id: 3, date: '09.06.2025 04:45', status: 'Сбербанк', desc: 'Стипендия', amount: '+16 889 ₽' },
];