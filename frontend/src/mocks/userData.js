// src/mocks/userData.js


const ALL_CATEGORIES = [
  'Продукты',
  'Транспорт',
  'Жильё',
  'Коммунальные услуги',
  'Развлечения',
  'Одежда и обувь',
  'Здоровье',
  'Образование',
  'Кафе и рестораны',
  'Подписки',
  'Красота и уход',
  'Электроника',
  'Подарки',
  'Путешествия',
  'Прочее'
];

const generateMockMonths = () => {
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  // Начинаем с НОЯБРЯ 2025
  const now = new Date(2025, 10, 1); // Ноябрь 2025 (месяцы: 0 = янв, 10 = ноя)
  const mockData = [];

  for (let i = 0; i < 12; i++) {
    const date = new Date(now);
    date.setMonth(now.getMonth() - i);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    const monthShort = monthNames[monthIndex].substring(0, 3);

    let categories;

    // В НОЯБРЕ 2025 — все 15 категорий
    if (year === 2025 && monthIndex === 10) { // ноябрь = 10
      categories = ALL_CATEGORIES.map((name, idx) => {
        let baseAmount;
        if (['Продукты', 'Жильё', 'Транспорт'].includes(name)) {
          baseAmount = 3000 + Math.random() * 12000;
        } else if (['Коммунальные услуги', 'Здоровье', 'Образование'].includes(name)) {
          baseAmount = 1000 + Math.random() * 5000;
        } else {
          baseAmount = 200 + Math.random() * 3000;
        }
        return {
          id: idx + 1,
          name,
          amount: Math.round(baseAmount)
        };
      });
    } else {
      // В остальных — случайный набор
      const numCategories = 3 + Math.floor(Math.random() * 8);
      const shuffled = [...ALL_CATEGORIES].sort(() => 0.5 - Math.random());
      const selectedNames = shuffled.slice(0, numCategories);

      categories = selectedNames.map((name, idx) => {
        let baseAmount;
        if (['Продукты', 'Жильё', 'Транспорт'].includes(name)) {
          baseAmount = 3000 + Math.random() * 12000;
        } else if (['Коммунальные услуги', 'Здоровье', 'Образование'].includes(name)) {
          baseAmount = 1000 + Math.random() * 5000;
        } else {
          baseAmount = 200 + Math.random() * 3000;
        }
        return {
          id: idx + 1,
          name,
          amount: Math.round(baseAmount)
        };
      });
    }

    const totalExpense = categories.reduce((sum, c) => sum + c.amount, 0);
    const income = totalExpense + 25000 + Math.random() * 25000;

    const balance = (income - totalExpense).toLocaleString('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    mockData.push({
      month: `${monthName} ${year}`,
      monthShort,
      year,
      income: Math.round(income),
      expense: Math.round(totalExpense),
      balance: `${balance} ₽`,
      categories,
    });
  }

  // Порядок: [Ноябрь 2025, Октябрь 2025, ..., Декабрь 2024]
  return mockData;
};

export const MOCK_MONTHLY_DATA = generateMockMonths();

// Цвета для диаграмм (15 шт)
export const CATEGORY_COLORS = [
  '#4caf50', '#f44336', '#2196f3', '#ffeb3b', '#9c27b0',
  '#ff9800', '#009688', '#e91e63', '#607d8b', '#795548',
  '#8bc34a', '#03a9f4', '#ffc107', '#673ab7', '#ff5722'
];


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
    amount: '-1 200 ₽', 
    desc: 'Сбербанк', 
    date: '01.11.2025 18:30', 
    type: 'expense',
    details: 'Платежи по кредиту'
  },
  { 
    id: 2, 
    amount: '+5 000 ₽', 
    desc: 'ООО Смерть в нищете', 
    date: '01.11.2025 10:15', 
    type: 'income',
    details: 'Зачисление зарплаты'
  },
  { 
    id: 3, 
    amount: '-350 ₽', 
    desc: 'Вкусно и точка', 
    date: '31.10.2025 20:45', 
    type: 'expense',
    details: 'Оплата товаров и услуг'
  },
  { 
    id: 4, 
    amount: '-890 ₽', 
    desc: 'Азбука Вкуса', 
    date: '31.10.2025 19:22', 
    type: 'expense',
    details: 'Оплата товаров и услуг'
  },
  { 
    id: 5, 
    amount: '+2 500 ₽', 
    desc: 'Мама', 
    date: '31.10.2025 14:10', 
    type: 'income',
    details: 'Входящий перевод'
  },
  { 
    id: 6, 
    amount: '-1 999 ₽', 
    desc: 'Wildberries', 
    date: '15.10.2025 22:05', 
    type: 'expense',
    details: 'Оплата товаров и услуг'
  },
  { 
    id: 7, 
    amount: '+10 000 ₽', 
    desc: 'Фриланс', 
    date: '10.10.2025 16:40', 
    type: 'income',
    details: 'Входящий перевод'
  },
  { 
    id: 8, 
    amount: '-700 ₽', 
    desc: 'Райффайзенбанк', 
    date: '28.09.2025 10:20', 
    type: 'expense',
    details: 'Платежи по кредиту'
  },
  { 
    id: 9, 
    amount: '+3 200 ₽', 
    desc: 'Дивиденды', 
    date: '19.09.2025 14:00', 
    type: 'income',
    details: 'Инвестиции'
  },
  { 
    id: 10, 
    amount: '-600 ₽', 
    desc: 'Яндекс.Музыка', 
    date: '05.09.2025 20:30', 
    type: 'expense',
    details: 'Оплата товаров и услуг'
  }
];


export const MOCK_TRANSACTIONS = [
  // Ноябрь 2025
  {
    id: 1,
    date: '01.11.2025 18:30',
    status: 'Сбербанк',
    desc: 'Оплата кредита',
    details: 'Платежи по кредиту',
    amount: '-12 500 ₽'
  },
  {
    id: 2,
    date: '01.11.2025 10:15',
    status: 'Сбербанк',
    desc: 'ООО Ромашка',
    details: 'Зачисление зарплаты',
    amount: '+78 500 ₽'
  },
  {
    id: 3,
    date: '31.10.2025 20:45',
    status: 'Т-Банк',
    desc: 'Вкусно и точка',
    details: 'Оплата товаров и услуг',
    amount: '-350 ₽'
  },
  {
    id: 4,
    date: '31.10.2025 19:22',
    status: 'Сбербанк',
    desc: 'Азбука Вкуса',
    details: 'Оплата товаров и услуг',
    amount: '-890 ₽'
  },
  {
    id: 5,
    date: '30.10.2025 14:10',
    status: 'Альфа-Банк',
    desc: 'Мама',
    details: 'Входящий перевод',
    amount: '+2 500 ₽'
  },

  // Октябрь 2025
  {
    id: 6,
    date: '29.10.2025 22:05',
    status: 'Т-Банк',
    desc: 'Wildberries',
    details: 'Оплата товаров и услуг',
    amount: '-1 999 ₽'
  },
  {
    id: 7,
    date: '28.10.2025 09:30',
    status: 'Т-Банк',
    desc: 'Ежемесячный платёж',
    details: 'Платежи по кредиту',
    amount: '-8 200 ₽'
  },
  {
    id: 8,
    date: '27.10.2025 16:40',
    status: 'Райффайзенбанк',
    desc: 'Фриланс',
    details: 'Входящий перевод',
    amount: '+12 000 ₽'
  },
  {
    id: 9,
    date: '26.10.2025 21:15',
    status: 'Сбербанк',
    desc: 'СберМаркет',
    details: 'Оплата товаров и услуг',
    amount: '-450 ₽'
  },
  {
    id: 10,
    date: '25.10.2025 08:00',
    status: 'Альфа-Банк',
    desc: 'Кредитный платёж',
    details: 'Платежи по кредиту',
    amount: '-9 500 ₽'
  },

  // Сентябрь 2025
  {
    id: 11,
    date: '24.09.2025 12:30',
    status: 'Ozon Банк',
    desc: 'Кэшбэк',
    details: 'Подарки',
    amount: '+500 ₽'
  },
  {
    id: 12,
    date: '23.09.2025 19:55',
    status: 'Т-Банк',
    desc: 'Ozon',
    details: 'Оплата товаров и услуг',
    amount: '-2 500 ₽'
  },
  {
    id: 13,
    date: '22.09.2025 10:20',
    status: 'Райффайзенбанк',
    desc: 'Погашение кредита',
    details: 'Платежи по кредиту',
    amount: '-7 800 ₽'
  },
  {
    id: 14,
    date: '21.09.2025 14:00',
    status: 'ВТБ',
    desc: 'Дивиденды',
    details: 'Инвестиции',
    amount: '+3 200 ₽'
  },
  {
    id: 15,
    date: '20.09.2025 22:10',
    status: 'Сбербанк',
    desc: 'ЛитРес',
    details: 'Оплата товаров и услуг',
    amount: '-990 ₽'
  },

  // Август 2025
  {
    id: 16,
    date: '19.08.2025 11:45',
    status: 'Т-Банк',
    desc: 'Бонус',
    details: 'Подарки',
    amount: '+1 000 ₽'
  },
  {
    id: 17,
    date: '18.08.2025 09:15',
    status: 'ВТБ',
    desc: 'Кредит',
    details: 'Платежи по кредиту',
    amount: '-10 200 ₽'
  },
  {
    id: 18,
    date: '17.08.2025 20:30',
    status: 'Сбербанк',
    desc: 'Яндекс.Музыка',
    details: 'Оплата товаров и услуг',
    amount: '-600 ₽'
  },
  {
    id: 19,
    date: '16.08.2025 15:20',
    status: 'Альфа-Банк',
    desc: 'Зарплата',
    details: 'Зачисление зарплаты',
    amount: '+82 000 ₽'
  },
  {
    id: 20,
    date: '15.08.2025 13:10',
    status: 'Райффайзенбанк',
    desc: 'Перевод от друга',
    details: 'Входящий перевод',
    amount: '+1 800 ₽'
  },

  // Июль 2025
  {
    id: 21,
    date: '10.07.2025 09:00',
    status: 'Сбербанк',
    desc: 'Зарплата',
    details: 'Зачисление зарплаты',
    amount: '+79 500 ₽'
  },
  {
    id: 22,
    date: '05.07.2025 18:45',
    status: 'Т-Банк',
    desc: 'Платёж по кредиту',
    details: 'Платежи по кредиту',
    amount: '-8 700 ₽'
  },

  // Июнь 2025
  {
    id: 23,
    date: '09.06.2025 04:45',
    status: 'Сбербанк',
    desc: 'Яндекс',
    details: 'Оплата товаров и услуг',
    amount: '-199 ₽'
  },
  {
    id: 24,
    date: '09.06.2025 04:45',
    status: 'Т-Банк',
    desc: 'Иван Иванович И.',
    details: 'Входящий перевод',
    amount: '+1 105 ₽'
  },
  {
    id: 25,
    date: '09.06.2025 04:45',
    status: 'Сбербанк',
    desc: 'Стипендия',
    details: 'Зачисление зарплаты',
    amount: '+14 889 ₽'
  },

  // Май 2025
  {
    id: 26,
    date: '15.05.2025 10:30',
    status: 'ВТБ',
    desc: 'Зарплата',
    details: 'Зачисление зарплаты',
    amount: '+81 200 ₽'
  },
  {
    id: 27,
    date: '20.05.2025 19:15',
    status: 'Сбербанк',
    desc: 'Кинопоиск',
    details: 'Оплата товаров и услуг',
    amount: '-199 ₽'
  },

  // Апрель 2025
  {
    id: 28,
    date: '12.04.2025 11:00',
    status: 'Альфа-Банк',
    desc: 'Платёж по кредиту',
    details: 'Платежи по кредиту',
    amount: '-9 100 ₽'
  },

  // Март 2025
  {
    id: 29,
    date: '05.03.2025 14:20',
    status: 'Райффайзенбанк',
    desc: 'Инвестиции',
    details: 'Инвестиции',
    amount: '+2 800 ₽'
  },

  // Август 2024 (для разнообразия)
  {
    id: 30,
    date: '15.08.2024 09:30',
    status: 'Сбербанк',
    desc: 'Зарплата',
    details: 'Зачисление зарплаты',
    amount: '+76 000 ₽'
  }
];

export const BANKS = [
  'Сбербанк',
  'ВТБ',
  'Альфа-Банк',
  'Т-Банк',
  'Ozon Банк',
  'Райффайзенбанк',
  'Газпромбанк',
  'Россельхозбанк'
];


export const CATEGORIES = [
  'Оплата товаров и услуг',
  'Зачисление зарплаты',
  'Входящий перевод',
  'Платежи по кредиту',
  'Инвестиции',
  'Подарки'
];