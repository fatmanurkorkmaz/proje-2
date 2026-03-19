'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';

type CartItem = Product & {
    quantity: number;
    addedAt: number;       // Timestamp when added
    lockedPrice: number;   // Price locked at time of adding
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
    getRemainingTime: (id: string) => number; // seconds remaining
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [promoCode, setPromoCode] = useState('');
    const [tick, setTick] = useState(0); // Force re-render for countdown

    // Load from local storage initially
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsed = JSON.parse(savedCart);
                // Filter out expired items on load
                const validItems = parsed.filter((item: CartItem) =>
                    item.addedAt && (Date.now() - item.addedAt) < CART_EXPIRY_MS
                );
                setItems(validItems);
            } catch {
                setItems([]);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    // Timer: check every second for expired items
    useEffect(() => {
        const interval = setInterval(() => {
            setTick(t => t + 1);
            setItems(currentItems => {
                const now = Date.now();
                const filtered = currentItems.filter(item =>
                    item.addedAt && (now - item.addedAt) < CART_EXPIRY_MS
                );
                if (filtered.length !== currentItems.length) {
                    return filtered;
                }
                return currentItems;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const addToCart = (product: Product) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);
            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, addedAt: Date.now() }
                        : item
                );
            }
            return [...currentItems, {
                ...product,
                quantity: 1,
                addedAt: Date.now(),
                lockedPrice: product.price
            }];
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
                    customer: { email: 'demo@example.com' }
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

    const getRemainingTime = useCallback((id: string): number => {
        const item = items.find(i => i.id === id);
        if (!item || !item.addedAt) return 0;
        const elapsed = Date.now() - item.addedAt;
        const remaining = CART_EXPIRY_MS - elapsed;
        return Math.max(0, Math.floor(remaining / 1000));
    }, [items, tick]);

    const cartTotal = items.reduce((total, item) => total + (item.lockedPrice || item.price) * item.quantity, 0);

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
            setPromoCode,
            getRemainingTime
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
