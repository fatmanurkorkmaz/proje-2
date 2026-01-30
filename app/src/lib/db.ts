import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/data/products';

const DB_PATH = path.join(process.cwd(), 'src/data/data.json');

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'customer' | 'admin';
    createdAt: string;
}

export interface Database {
    products: Product[];
    orders: any[];
    users: User[];
    settings: {
        siteTitle: string;
        founderName: string;
        footerText: string;
        contactEmail: string;
    };
}

// Initialize DB if not exists
async function initDB() {
    try {
        await fs.access(DB_PATH);
    } catch {
        const initialData: Database = {
            products: [],
            orders: [],
            users: [],
            settings: {
                siteTitle: 'AVCI Kuyumculuk',
                founderName: 'Aykal Avcı',
                footerText: '1995\'ten beri zamansız hikayeler işliyoruz.',
                contactEmail: 'hello@avcijewelry.com'
            }
        };
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
    }
}

async function readDB(): Promise<Database> {
    await initDB();
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const json = JSON.parse(data);

    // Migration: Add settings if missing
    if (!json.settings) {
        json.settings = {
            siteTitle: 'Avcı Jewelry',
            founderName: 'Aykal Avcı',
            footerText: '1995\'ten beri zamansız hikayeler işliyoruz.',
            contactEmail: 'hello@avcijewelry.com'
        };
        await writeDB(json);
    }

    return json;
}

async function writeDB(data: Database) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// Product Operations
export async function getProducts() {
    const db = await readDB();
    return db.products;
}

export async function getProduct(id: string) {
    const db = await readDB();
    return db.products.find(p => p.id === id);
}

export async function addProduct(product: Product) {
    const db = await readDB();
    db.products.unshift(product);
    await writeDB(db);
    return product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const db = await readDB();
    const index = db.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    db.products[index] = { ...db.products[index], ...updates };
    await writeDB(db);
    return db.products[index];
}

export async function deleteProduct(id: string) {
    const db = await readDB();
    db.products = db.products.filter(p => p.id !== id);
    await writeDB(db);
    return true;
}

// Order Operations
export async function createOrder(order: any) {
    const db = await readDB();
    const newOrder = { id: Date.now().toString(), ...order, date: new Date().toISOString() };
    db.orders.push(newOrder);
    await writeDB(db);
    return newOrder;
}

// Settings Operations
export async function getSettings() {
    const db = await readDB();
    return db.settings;
}

export async function updateSettings(updates: Partial<Database['settings']>) {
    const db = await readDB();
    db.settings = { ...db.settings, ...updates };
    await writeDB(db);
    return db.settings;
}

// User Operations
export async function getUsers() {
    const db = await readDB();
    return db.users || [];
}

export async function addUser(user: Omit<User, 'id' | 'createdAt'>) {
    const db = await readDB();
    if (!db.users) db.users = [];
    const newUser: User = {
        ...user,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    await writeDB(db);
    return newUser;
}

export async function findUserByEmail(email: string) {
    const db = await readDB();
    return (db.users || []).find(u => u.email === email);
}

export { readDB };
