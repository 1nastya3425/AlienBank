// src/mocks/userData.js

// Генерация месяцев: от текущего (октябрь 2025) до 12 месяцев назад
const generateMockMonths = () => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const now = new Date(2025, 9, 1); // Октябрь 2025 (месяцы в JS: 0 = янв, 9 = окт)
  const mockData = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];

    // Генерируем разные траты для каждого месяца
    const baseAmount = 5000 - i * 200;
    const categories = [
      { id: 1, name: 'Еда', amount: Math.max(1000, baseAmount * 0.4) },
      { id: 2, name: 'Косметика', amount: Math.max(500, baseAmount * 0.25) },
      { id: 3, name: 'Книги', amount: Math.max(300, baseAmount * 0.15) },
      { id: 4, name: 'Транспорт', amount: Math.max(400, baseAmount * 0.2) },
    ];

    const totalSpent = categories.reduce((sum, c) => sum + c.amount, 0);
    const balance = (50000 - totalSpent).toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    mockData.push({
      month: `${monthName} ${year}`,
      balance: `${balance} ₽`,
      categories,
    });
  }

  return mockData;
};

export const MOCK_MONTHLY_DATA = generateMockMonths(); // массив из 12 объектов

// Остальной код (функция generateMockMonths) остается как есть

// Экспортируем старые моки
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
  {
    id: 1,
    date: '09.06.2025 04:45',
    status: 'Сбербанк',
    desc: 'Яндекс',
    details: 'Оплата товаров и услуг',
    amount: '-199 ₽'
  },
  {
    id: 2,
    date: '09.06.2025 04:45',
    status: 'T-Банк',
    desc: 'Иван Иванович И.',
    details: 'Входящий перевод',
    amount: '+1 105 ₽'
  },
  {
    id: 3,
    date: '09.06.2025 04:45',
    status: 'Сбербанк',
    desc: 'Стипендия',
    details: 'Зачисление зарплаты',
    amount: '+14 889 ₽'
  },
  {
    id: 4,
    date: '09.06.2025 04:45',
    status: 'Сбербанк',
    desc: 'Стипендия',
    details: 'Зачисление зарплаты',
    amount: '+14 889 ₽'
  },
  {
    id: 5,
    date: '09.06.2025 04:45',
    status: 'Сбербанк',
    desc: 'Стипендия',
    details: 'Зачисление зарплаты',
    amount: '+14 889 ₽'
  },
];