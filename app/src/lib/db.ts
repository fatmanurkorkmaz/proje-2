import { prisma } from './prisma';
import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/data.json');

// Migrate JSON to MySQL if needed
export async function migrateJsonToSql() {
    try {
        // Synchronize base products

        console.log('Seeding database with bilingual products...');

        const initialProducts = [
            {
                id: '1',
                nameTr: '18k Altın Sonsuzluk Yüzüğü',
                nameEn: '18k Gold Eternity Ring',
                descriptionTr: 'Sonsuz aşkın sembolü, 18k sarı altın içine yerleştirilmiş kesintisiz elmaslar.',
                descriptionEn: 'Symbol of eternal love, continuous diamonds set in 18k yellow gold.',
                price: 45000,
                weight: 5.2,
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
                category: 'Rings',
                isNew: true,
                stock: 5
            },
            {
                id: '2',
                nameTr: 'İnci & Gümüş Kolye',
                nameEn: 'Pearl & Silver Necklace',
                descriptionTr: 'Zarif bir gümüş zincirden sarkan tek ve mükemmel bir tatlı su incisi.',
                descriptionEn: 'A single, perfect freshwater pearl suspended from an elegant silver chain.',
                price: 15000,
                weight: 12.5,
                image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800',
                category: 'Necklaces',
                isNew: false,
                stock: 10
            },
            {
                id: '3',
                nameTr: 'Minimalist Altın Kelepçe',
                nameEn: 'Minimalist Gold Bangle',
                descriptionTr: 'Modern ve şık, 14k altın kaplama el yapımı minimalist kelepçe bilezik.',
                descriptionEn: 'Modern and chic, handmade minimalist bangle plated in 14k gold.',
                price: 28000,
                weight: 22.0,
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
                category: 'Bracelets',
                isNew: true,
                stock: 12
            },
            {
                id: '4',
                nameTr: 'Dövme Halka Küpe',
                nameEn: 'Hammered Hoop Earrings',
                descriptionTr: 'Işığı mükemmel yansıtan el dövmesi dokulu gümüş halka küpeler.',
                descriptionEn: 'Silver hoop earrings with a hand-hammered texture that reflects light perfectly.',
                price: 7500,
                weight: 8.4,
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
                category: 'Earrings',
                isNew: false,
                stock: 8
            },
            {
                id: '5',
                nameTr: 'Stellar Rose Gold Tektaş',
                nameEn: 'Stellar Rose Gold Solitaire',
                descriptionTr: 'Romantik rose gold bant içine yerleştirilmiş pırlanta tektaş yüzük.',
                descriptionEn: 'Diamond solitaire ring set in a romantic rose gold band.',
                price: 55000,
                weight: 4.8,
                image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800',
                category: 'Rings',
                isNew: true,
                stock: 15
            },
            {
                id: '6',
                nameTr: 'Safir Elmas Bileklik',
                nameEn: 'Sapphire Diamond Bracelet',
                descriptionTr: 'Safir taşları ve pırlantalarla süslenmiş görkemli beyaz altın bileklik.',
                descriptionEn: 'Majestic white gold bracelet adorned with sapphire stones and diamonds.',
                price: 42000,
                weight: 15.6,
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
                category: 'Bracelets',
                isNew: false,
                stock: 1
            },
            {
                id: '7',
                nameTr: 'Zümrüt Damla Kolye',
                nameEn: 'Emerald Drop Necklace',
                descriptionTr: 'Damla kesim zümrüt ve çevreleyen küçük elmaslarla eşsiz bir zarafet.',
                descriptionEn: 'A pear-cut emerald surrounded by small diamonds for unique elegance.',
                price: 38000,
                weight: 10.2,
                image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&q=80&w=800',
                category: 'Necklaces',
                isNew: true,
                stock: 4
            },
            {
                id: '8',
                nameTr: 'Klasik Pırlanta Küpe',
                nameEn: 'Classic Diamond Studs',
                descriptionTr: 'Her stile uyum sağlayan, zamansız ve ışıltılı pırlanta çivili küpeler.',
                descriptionEn: 'Timeless and sparkling diamond stud earrings that suit every style.',
                price: 12000,
                weight: 2.5,
                image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8256?auto=format&fit=crop&q=80&w=800',
                category: 'Earrings',
                isNew: false,
                stock: 15
            },
            {
                id: '9',
                nameTr: 'Saf Altın Baget Yüzük',
                nameEn: 'Pure Gold Baguette Ring',
                descriptionTr: 'Modern kesim baget elmaslarla süslenmiş saf altın yüzük.',
                descriptionEn: 'Pure gold ring adorned with modern cut baguette diamonds.',
                price: 32500,
                weight: 6.2,
                image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=800',
                category: 'Rings',
                isNew: true,
                stock: 10
            },
            {
                id: '10',
                nameTr: 'Vintage Yakut Küpe',
                nameEn: 'Vintage Ruby Earrings',
                descriptionTr: 'Osmanlı esintili, yakut taşlı vintage tasarım küpeler.',
                descriptionEn: 'Ottoman-inspired vintage design earrings with ruby stones.',
                price: 18750,
                weight: 9.8,
                image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
                category: 'Earrings',
                isNew: false,
                stock: 6
            },
            {
                id: '11',
                nameTr: 'Gökkuşağı Safir Kolye',
                nameEn: 'Rainbow Sapphire Necklace',
                descriptionTr: 'Farklı renklerdeki safir taşlarıyla neşeli ve lüks bir kolye.',
                descriptionEn: 'A cheerful and luxurious necklace with sapphire stones in different colors.',
                price: 29900,
                weight: 14.2,
                image: 'https://images.unsplash.com/photo-1603974372039-abc49e1d1d3e?auto=format&fit=crop&q=80&w=800',
                category: 'Necklaces',
                isNew: true,
                stock: 2
            },
            {
                id: '12',
                nameTr: 'Örgü Altın Bilezik',
                nameEn: 'Braided Gold Bracelet',
                descriptionTr: 'Ustalıkla örülmüş 22 ayar altın zincir bilezik.',
                descriptionEn: 'Expertly braided 22 carat gold chain bracelet.',
                price: 48000,
                weight: 34.5,
                image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800',
                category: 'Bracelets',
                isNew: false,
                stock: 10
            },
            {
                id: '13',
                nameTr: 'Modern Geometrik Küpe',
                nameEn: 'Modern Geometric Earrings',
                descriptionTr: 'Minimalist çizgiler sunan geometrik formlu altın küpeler.',
                descriptionEn: 'Gold earrings with geometric forms offering minimalist lines.',
                price: 6400,
                weight: 4.1,
                image: 'https://images.unsplash.com/photo-1588444837495-c6cfaf504670?auto=format&fit=crop&q=80&w=800',
                category: 'Earrings',
                isNew: true,
                stock: 10
            },
            {
                id: '14',
                nameTr: 'Pırlanta Gerdanlık',
                nameEn: 'Diamond Choker',
                descriptionTr: 'Göz alıcı pırlanta dizisiyle zarafetin doruk noktası.',
                descriptionEn: 'The pinnacle of elegance with a dazzling array of diamonds.',
                price: 125000,
                weight: 45.0,
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
                category: 'Necklaces',
                isNew: true,
                stock: 1
            },
            {
                id: '15',
                nameTr: 'Ametist Taşlı Yüzük',
                nameEn: 'Amethyst Stone Ring',
                descriptionTr: 'Büyük damla kesim ametist taşlı gümüş yüzük.',
                descriptionEn: 'Silver ring with a large pear-cut amethyst stone.',
                price: 8900,
                weight: 7.3,
                image: 'https://images.unsplash.com/photo-1603561591411-071c7f1a393e?auto=format&fit=crop&q=80&w=800',
                category: 'Rings',
                isNew: false,
                stock: 20
            },
            {
                id: '16',
                nameTr: 'Yılan Figürlü Bileklik',
                nameEn: 'Serpent Figure Bracelet',
                descriptionTr: 'Egzotik ve şık yılan figürlü rose altın bileklik.',
                descriptionEn: 'Exotic and stylish serpent figure rose gold bracelet.',
                price: 31200,
                weight: 18.2,
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
                category: 'Bracelets',
                isNew: true,
                stock: 5
            },
            {
                id: '17',
                nameTr: 'Deniz Yıldızı Kolye',
                nameEn: 'Starfish Necklace',
                descriptionTr: 'Yaz esintisini taşıyan ince gümüş deniz yıldızı kolye.',
                descriptionEn: 'A fine silver starfish necklace carrying the summer breeze.',
                price: 4500,
                weight: 3.8,
                image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800',
                category: 'Necklaces',
                isNew: false,
                stock: 12
            },
            {
                id: '18',
                nameTr: 'Elmas Rozet Yüzük',
                nameEn: 'Diamond Rose Ring',
                descriptionTr: 'Gül formunda pırlanta işlemeli antika görünümlü yüzük.',
                descriptionEn: 'Antique looking ring with diamond embroidery in the form of a rose.',
                price: 24600,
                weight: 5.9,
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
                category: 'Rings',
                isNew: false,
                stock: 10
            },
            {
                id: '19',
                nameTr: 'Siyah İnci Küpe',
                nameEn: 'Black Pearl Earrings',
                descriptionTr: 'Nadir bulunan Tahiti siyah incili gümüş küpeler.',
                descriptionEn: 'Silver earrings with rare Tahitian black pearls.',
                price: 9800,
                weight: 11.0,
                image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8256?auto=format&fit=crop&q=80&w=800',
                category: 'Earrings',
                isNew: true,
                stock: 4
            },
            {
                id: '20',
                nameTr: 'Zarif Ayak Halhalı',
                nameEn: 'Elegant Anklet',
                descriptionTr: 'Altın toplarla süslenmiş zarif ve ince halhal.',
                descriptionEn: 'Elegant and fine anklet adorned with gold balls.',
                price: 5200,
                weight: 2.8,
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
                category: 'Bracelets',
                isNew: false,
                stock: 3
            }
        ];

        console.log('Synchronizing database with stable product IDs...');

        for (const product of initialProducts) {
            await prisma.product.upsert({
                where: { id: product.id },
                update: {
                    nameTr: product.nameTr,
                    nameEn: product.nameEn,
                    descriptionTr: product.descriptionTr,
                    descriptionEn: product.descriptionEn,
                    price: product.price,
                    weight: product.weight,
                    image: product.image,
                    category: product.category,
                    isNew: product.isNew,
                    stock: product.stock
                },
                create: {
                    id: product.id,
                    nameTr: product.nameTr,
                    nameEn: product.nameEn,
                    descriptionTr: product.descriptionTr,
                    descriptionEn: product.descriptionEn,
                    price: product.price,
                    weight: product.weight,
                    image: product.image,
                    category: product.category,
                    isNew: product.isNew,
                    stock: product.stock
                }
            });
        }

        // Add default admin user
        await prisma.user.upsert({
            where: { email: 'admin@avcikuyumculuk.com' },
            update: {
                firstName: 'Admin',
                lastName: 'Avcı',
                role: 'admin',
                isVerified: true
            },
            create: {
                firstName: 'Admin',
                lastName: 'Avcı',
                email: 'admin@avcikuyumculuk.com',
                password: 'admin',
                role: 'admin',
                isVerified: true
            }
        });

        console.log('Synchronization completed successfully.');
    } catch (error) {
        console.error('Synchronization failed:', error);
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
            nameTr: product.nameTr,
            nameEn: product.nameEn,
            descriptionTr: product.descriptionTr,
            descriptionEn: product.descriptionEn,
            price: Number(product.price),
            weight: Number(product.weight || 0),
            image: product.image,
            category: product.category,
            isNew: product.isNew || false,
            stock: Number(product.stock || 0)
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

    return prisma.$transaction(async (tx) => {
        // Create the order
        const newOrder = await tx.order.create({
            data: {
                userId: user?.id || null,
                customer: order.customer,
                total: order.total,
                status: 'pending',
                items: {
                    create: order.items.map((item: any) => ({
                        productId: item.productId || item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // Update product stocks
        for (const item of order.items) {
            const pid = item.productId || item.id;
            const product = await tx.product.findUnique({ where: { id: pid } });

            if (product) {
                const newStock = Math.max(0, product.stock - (item.quantity || 1));
                await tx.product.update({
                    where: { id: pid },
                    data: { stock: newStock }
                });
            }
        }

        return newOrder;
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
            role: user.role || 'customer',
            isVerified: user.isVerified || false
        }
    });
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}

export async function verifyUser(email: string) {
    return prisma.user.update({
        where: { email },
        data: { isVerified: true }
    });
}

// Verification Tokens
export async function createVerificationToken(email: string, code: string) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    return prisma.verificationToken.create({
        data: { email, code, expiresAt }
    });
}

export async function getVerificationToken(email: string, code: string) {
    return prisma.verificationToken.findFirst({
        where: {
            email,
            code,
            expiresAt: { gt: new Date() }
        }
    });
}

export async function deleteVerificationTokens(email: string) {
    return prisma.verificationToken.deleteMany({
        where: { email }
    });
}
