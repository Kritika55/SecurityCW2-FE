//   src/utils/cart-context.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (vehicle, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.vehicle.id === vehicle.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.vehicle.id === vehicle.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevItems, { vehicle, quantity }];
            }
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, handleAddToCart }}>
            {children}
        </CartContext.Provider>
    );
};
