'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

type CartItem = Product & {
    quantity: number;
};

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    checkout: () => Promise<boolean>;
    cartTotal: number;
    discount: number;
    promoCode: string;
    setPromoCode: (code: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState('');

    // Load from local storage initially
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...currentItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const checkout = async () => {
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    total: cartTotal - discount,
                    customer: { email: 'demo@example.com' } // Placeholder customer
                }),
            });
            if (res.ok) {
                clearCart();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Checkout error:', error);
            return false;
        }
    };

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const discount = promoCode.toUpperCase() === 'WELCOME10'
        ? cartTotal * 0.10
        : 0;

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            checkout,
            cartTotal,
            discount,
            promoCode,
            setPromoCode
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
