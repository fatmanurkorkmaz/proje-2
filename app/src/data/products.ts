export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets';
    material: 'Yellow Gold' | 'White Gold' | 'Rose Gold' | 'Silver';
    isNew?: boolean;
    inStock: boolean;
    tags?: string[];
}

export const products: Product[] = [
    {
        id: '1',
        name: '18k Altın Sonsuzluk Yüzüğü',
        description: 'Sonsuz aşkın sembolü, 18k sarı altın içine yerleştirilmiş kesintisiz elmaslar.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800',
        category: 'Rings',
        material: 'Yellow Gold',
        isNew: true,
        inStock: true,
        tags: ['Limited Edition']
    },
    {
        id: '2',
        name: 'Parlak İnci & Gümüş Kolye',
        description: 'Zarif bir gümüş zincirden sarkan tek ve mükemmel bir tatlı su incisi.',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800',
        category: 'Necklaces',
        material: 'Silver',
        inStock: true
    },
    {
        id: '3',
        name: 'Aura 14k Altın Minimalist Kelepçe',
        description: 'Şık ve sofistike, bu açık kelepçe modern minimalistler için tasarlandı.',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
        category: 'Bracelets',
        material: 'Yellow Gold',
        inStock: true
    },
    {
        id: '4',
        name: 'Gümüş Dövme Halka Küpe',
        description: 'Bu çok yönlü günlük halka küpelerde ışığı yakalayan el dövmesi dokusu.',
        price: 7500,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
        category: 'Earrings',
        material: 'Silver',
        inStock: true
    },
    {
        id: '5',
        name: 'Stellar Rose Gold Tektaş',
        description: 'Romantik rose gold bir bant içine yerleştirilmiş nefes kesici oval kesim tektaş.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800',
        category: 'Rings',
        material: 'Rose Gold',
        inStock: true
    },
    {
        id: '6',
        name: 'Heritage Madalyon Zincir Kolye',
        description: 'Çok katmanlı altın zincir üzerinde vintage esintili madalyon uçlar.',
        price: 19500,
        image: 'https://images.unsplash.com/photo-1599643477877-53c7c25c34e3?auto=format&fit=crop&q=80&w=800',
        category: 'Necklaces',
        material: 'Yellow Gold',
        inStock: true
    },
    {
        id: '7',
        name: 'Pırlanta Çivili Küpe',
        description: 'Her ortama ışıltı katan klasik parlak kesim pırlantalar.',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1588661759021-d41933df57ed?auto=format&fit=crop&q=80&w=800',
        category: 'Earrings',
        material: 'White Gold',
        inStock: true
    },
    {
        id: '8',
        name: 'Yakut Nişan Yüzüğü',
        description: 'Pırlantalarla çevrili derin kırmızı bir yakut.',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1603561596112-0a132b7223ca?auto=format&fit=crop&q=80&w=800',
        category: 'Rings',
        material: 'Rose Gold',
        inStock: false
    }
];
