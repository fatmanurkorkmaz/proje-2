'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    loading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (product: Product) => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (res.ok) {
                const newProduct = await res.json();
                setProducts(prev => [newProduct, ...prev]);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, loading }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}
