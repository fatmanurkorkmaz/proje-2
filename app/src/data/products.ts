export interface Product {
    id: string;
    nameTr: string;
    nameEn: string;
    descriptionTr: string;
    descriptionEn: string;
    price: number;
    weight: number;
    image: string;
    category: string;
    isNew?: boolean;
    stock: number;
}

export const products: Product[] = [
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
        stock: 15
    }
];
