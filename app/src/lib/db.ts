import { prisma } from './prisma';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/data.json');

// Migrate JSON to MySQL if needed
export async function migrateJsonToSql() {
    try {
        const userCount = await prisma.user.count();
        if (userCount > 0) return; // Already migrated or populated

        const dataExists = await fs.access(DB_PATH).then(() => true).catch(() => false);
        if (!dataExists) return;

        console.log('Migrating data.json to MySQL...');
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));

        // Migrate Settings
        if (data.settings) {
            await prisma.settings.upsert({
                where: { id: 1 },
                update: data.settings,
                create: { id: 1, ...data.settings }
            });
        }

        // Migrate Users
        if (data.users && data.users.length > 0) {
            for (const user of data.users) {
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: {},
                    create: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        role: user.role,
                        createdAt: new Date(user.createdAt)
                    }
                });
            }
        }

        // Migrate Products
        if (data.products && data.products.length > 0) {
            for (const product of data.products) {
                await prisma.product.create({
                    data: {
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                        isNew: product.isNew
                    }
                });
            }
        }

        // Migrate Orders
        if (data.orders && data.orders.length > 0) {
            for (const order of data.orders) {
                const user = await prisma.user.findUnique({ where: { email: order.customer.email } });
                await prisma.order.create({
                    data: {
                        userId: user?.id || null,
                        customer: order.customer,
                        total: order.total,
                        status: order.status || 'pending',
                        createdAt: new Date(order.date || Date.now()),
                        items: {
                            create: order.items.map((item: any) => ({
                                productId: item.id,
                                quantity: item.quantity,
                                price: item.price
                            }))
                        }
                    }
                });
            }
        }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

// Product Operations
export async function getProducts() {
    return prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getProduct(id: string) {
    return prisma.product.findUnique({
        where: { id }
    });
}

export async function addProduct(product: any) {
    return prisma.product.create({
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            isNew: product.isNew
        }
    });
}

export async function updateProduct(id: string, updates: any) {
    return prisma.product.update({
        where: { id },
        data: updates
    });
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
    return true;
}

// Order Operations
export async function createOrder(order: any) {
    const user = await prisma.user.findUnique({ where: { email: order.customer.email } });
    return prisma.order.create({
        data: {
            userId: user?.id || null,
            customer: order.customer,
            total: order.total,
            status: 'pending',
            items: {
                create: order.items.map((item: any) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        }
    });
}

export async function getOrders() {
    return prisma.order.findMany({
        include: { user: true, items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' }
    });
}

// Settings Operations
export async function getSettings() {
    let settings = await prisma.settings.findUnique({ where: { id: 1 } });
    if (!settings) {
        settings = await prisma.settings.create({
            data: { id: 1 }
        });
    }
    return settings;
}

export async function updateSettings(updates: any) {
    return prisma.settings.update({
        where: { id: 1 },
        data: updates
    });
}

// User Operations
export async function getUsers() {
    return prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function addUser(user: any) {
    return prisma.user.create({
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            role: user.role || 'customer'
        }
    });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}
