export interface SushiItem {
  id: string;
  name: string;
  category: 'nigiri' | 'roll' | 'sashimi' | 'special';
  description: string;
  price: number;
  image: string;
  ingredients: string[];
  spicy?: boolean;
  vegetarian?: boolean;
}

export const sushiMenu: SushiItem[] = [
  {
    id: '1',
    name: 'Salmon Nigiri',
    category: 'nigiri',
    description: 'Fresh Atlantic salmon over seasoned rice',
    price: 6.50,
    image: '🍣',
    ingredients: ['Salmon', 'Rice', 'Wasabi'],
  },
  {
    id: '2',
    name: 'Tuna Nigiri',
    category: 'nigiri',
    description: 'Premium bluefin tuna over seasoned rice',
    price: 7.50,
    image: '🍣',
    ingredients: ['Tuna', 'Rice', 'Wasabi'],
  },
  {
    id: '3',
    name: 'California Roll',
    category: 'roll',
    description: 'Imitation crab, avocado, and cucumber',
    price: 8.00,
    image: '🍱',
    ingredients: ['Crab', 'Avocado', 'Cucumber', 'Rice', 'Nori'],
  },
  {
    id: '4',
    name: 'Spicy Tuna Roll',
    category: 'roll',
    description: 'Tuna mixed with spicy mayo and scallions',
    price: 9.50,
    image: '🍱',
    ingredients: ['Tuna', 'Spicy Mayo', 'Scallions', 'Rice', 'Nori'],
    spicy: true,
  },
  {
    id: '5',
    name: 'Dragon Roll',
    category: 'special',
    description: 'Eel and cucumber topped with avocado',
    price: 14.00,
    image: '🐉',
    ingredients: ['Eel', 'Cucumber', 'Avocado', 'Rice', 'Eel Sauce'],
  },
  {
    id: '6',
    name: 'Rainbow Roll',
    category: 'special',
    description: 'California roll topped with assorted fish',
    price: 15.00,
    image: '🌈',
    ingredients: ['Tuna', 'Salmon', 'Yellowtail', 'Avocado', 'Crab', 'Rice'],
  },
  {
    id: '7',
    name: 'Salmon Sashimi',
    category: 'sashimi',
    description: 'Five pieces of fresh salmon',
    price: 12.00,
    image: '🐟',
    ingredients: ['Salmon'],
  },
  {
    id: '8',
    name: 'Tuna Sashimi',
    category: 'sashimi',
    description: 'Five pieces of premium tuna',
    price: 13.00,
    image: '🐟',
    ingredients: ['Tuna'],
  },
  {
    id: '9',
    name: 'Vegetable Roll',
    category: 'roll',
    description: 'Cucumber, avocado, and carrot',
    price: 6.50,
    image: '🥒',
    ingredients: ['Cucumber', 'Avocado', 'Carrot', 'Rice', 'Nori'],
    vegetarian: true,
  },
  {
    id: '10',
    name: 'Eel Nigiri',
    category: 'nigiri',
    description: 'Grilled freshwater eel with sweet sauce',
    price: 8.00,
    image: '🍣',
    ingredients: ['Eel', 'Rice', 'Eel Sauce'],
  },
  {
    id: '11',
    name: 'Shrimp Tempura Roll',
    category: 'roll',
    description: 'Crispy shrimp tempura with avocado',
    price: 10.00,
    image: '🍤',
    ingredients: ['Shrimp Tempura', 'Avocado', 'Rice', 'Nori'],
  },
  {
    id: '12',
    name: 'Philadelphia Roll',
    category: 'roll',
    description: 'Smoked salmon, cream cheese, and cucumber',
    price: 9.00,
    image: '🍱',
    ingredients: ['Smoked Salmon', 'Cream Cheese', 'Cucumber', 'Rice', 'Nori'],
  },
];

export interface CartItem {
  sushiItem: SushiItem;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
}
