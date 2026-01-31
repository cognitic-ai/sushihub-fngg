import { CartItem, SushiItem } from '@/data/sushi';
import { createContext, ReactNode, useContext, useState } from 'react';

interface CartContextType {
  items: CartItem[];
  addItem: (item: SushiItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (sushiItem: SushiItem) => {
    setItems((current) => {
      const existing = current.find((item) => item.sushiItem.id === sushiItem.id);
      if (existing) {
        return current.map((item) =>
          item.sushiItem.id === sushiItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { sushiItem, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((current) => current.filter((item) => item.sushiItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.sushiItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.sushiItem.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
