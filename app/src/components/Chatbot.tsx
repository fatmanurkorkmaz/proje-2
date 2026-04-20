'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Diamond, Bot, User, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/context/ProductContext';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
}

// Knowledge base about AVCI Kuyumculuk
const knowledgeBase = {
    tr: {
        greeting: [
            'Merhaba! 💎 AVCI Kuyumculuk\'a hoş geldiniz. Size nasıl yardımcı olabilirim?',
            'Hoş geldiniz! ✨ AVCI Kuyumculuk asistanıyım. Sorularınızı yanıtlamaya hazırım.',
        ],
        about: `AVCI Kuyumculuk, 1995 yılından bu yana el yapımı, özel tasarım mücevherler üreten köklü bir kuyumculuk markasıdır. Kurucumuz Aykal Avcı'nın vizyonuyla, her bir parça ustalıkla işlenmektedir. Koleksiyonumuzda yüzükler, kolyeler, bilezikler ve küpeler bulunmaktadır.`,
        shipping: `🚚 Kargo bilgileri:\n• 5.000₺ üzeri siparişlerde kargo ücretsizdir\n• 5.000₺ altı siparişlerde kargo ücreti 250₺'dir\n• Siparişler 1-3 iş günü içinde kargoya verilir\n• Tüm gönderiler sigortalıdır`,
        returns: `🔄 İade politikası:\n• Ürünler teslim tarihinden itibaren 14 gün içinde iade edilebilir\n• Ürün kullanılmamış ve orijinal ambalajında olmalıdır\n• İade kargo ücreti müşteriye aittir\n• İade işlemi onaylandıktan sonra 3-5 iş günü içinde ödeme iadesi yapılır`,
        payment: `💳 Ödeme seçenekleri:\n• Kredi kartı (Visa, Mastercard)\n• Banka havalesi / EFT\n• Kapıda ödeme (nakit veya kredi kartı)\n• Taksitli ödeme imkanı mevcuttur`,
        warranty: `🛡️ Garanti bilgileri:\n• Tüm ürünlerimiz AVCI Kuyumculuk garantisi altındadır\n• Tasarım ve işçilik hatalarına karşı ömür boyu garanti\n• Her ürün sertifikalı ve ayar damgalıdır\n• Ücretsiz bakım ve temizlik hizmeti sunulmaktadır`,
        contact: `📞 İletişim bilgileri:\n• E-posta: hello@avcijewelry.com\n• Web: avcikuyumculuk.com\n• Sosyal medya hesaplarımızdan da bize ulaşabilirsiniz`,
        categories: `💍 Koleksiyon kategorilerimiz:\n• Yüzükler — Tektaş, nişan, alyans ve kokteyl yüzükler\n• Kolyeler — İnci, pırlanta, zümrüt ve altın kolyeler\n• Bilezikler — Kelepçe, zincir ve taşlı bilezikler\n• Küpeler — Halka, çivili ve sallantılı küpeler`,
        materials: `✨ Kullandığımız materyaller:\n• 14K, 18K ve 22K Altın\n• 925 Ayar Gümüş\n• Rose Gold\n• Pırlanta, Safir, Zümrüt, Yakut, Ametist\n• Tatlı su incisi ve Tahiti incisi`,
        care: `💎 Mücevher bakım önerileri:\n• Mücevherlerinizi kullanmadığınız zamanlarda kutusunda saklayın\n• Parfüm ve kimyasal maddelerden uzak tutun\n• Yumuşak bir bezle düzenli olarak silin\n• Yılda bir kez profesyonel temizlik yaptırın\n• Spor ve ev işleri sırasında çıkarın`,
        promo: `🎉 Aktif kampanyalar:\n• İlk alışverişinizde WELCOME10 kodu ile %10 indirim!\n• 5.000₺ üzeri siparişlerde ücretsiz kargo\n• Özel günlerde sürpriz indirimler için bültenimize abone olun`,
        cart: `🛒 Sepet bilgileri:\n• Ürünler sepetinizde 15 dakika boyunca sabit fiyatla tutulur\n• Altın fiyatları anlık değişebildiği için fiyatlar sepete ekleme anında kilitlenir\n• Promosyon kodu girerek indirim alabilirsiniz`,
        sizing: `📏 Beden ölçüleri:\n• Yüzük ölçüsünü bilmiyorsanız, ip yöntemiyle parmağınızı ölçebilirsiniz\n• Online beden rehberimizden faydalanabilirsiniz\n• Mağazamızda ücretsiz ölçüm yapılmaktadır`,
        off_topic: 'Üzgünüm, ben sadece AVCI Kuyumculuk hakkında bilgi verebilirim. 💎 Ürünlerimiz, kargo, iade, ödeme veya mücevher bakımı hakkında sorularınızı yanıtlayabilirim.',
        fallback: 'Bu konuda tam olarak yardımcı olamadım. Şu konularda soru sorabilirsiniz:\n\n• 🏪 Hakkımızda\n• 💍 Ürünler ve kategoriler\n• 🚚 Kargo ve teslimat\n• 🔄 İade politikası\n• 💳 Ödeme seçenekleri\n• 🛡️ Garanti\n• 💎 Mücevher bakımı\n• 📏 Beden ölçüleri\n• 🎉 Kampanyalar\n• 📞 İletişim',
        suggestions: [
            'Kargo nasıl çalışıyor?',
            'İade politikanız nedir?',
            'Hangi ürünler var?',
            'Kampanya var mı?',
        ],
    },
    en: {
        greeting: [
            'Hello! 💎 Welcome to AVCI Jewelry. How can I help you?',
            'Welcome! ✨ I\'m the AVCI Jewelry assistant. Ready to answer your questions.',
        ],
        about: `AVCI Jewelry has been producing handmade, custom-designed jewelry since 1995. With the vision of our founder Aykal Avcı, each piece is expertly crafted. Our collection includes rings, necklaces, bracelets, and earrings.`,
        shipping: `🚚 Shipping info:\n• Free shipping on orders over 5,000₺\n• 250₺ shipping fee for orders under 5,000₺\n• Orders are shipped within 1-3 business days\n• All shipments are insured`,
        returns: `🔄 Return policy:\n• Products can be returned within 14 days of delivery\n• Items must be unused and in original packaging\n• Return shipping is at the customer's expense\n• Refund is processed within 3-5 business days after approval`,
        payment: `💳 Payment options:\n• Credit card (Visa, Mastercard)\n• Bank transfer\n• Cash on delivery\n• Installment payment available`,
        warranty: `🛡️ Warranty info:\n• All products are under AVCI Jewelry warranty\n• Lifetime warranty against design and workmanship defects\n• Every product is certified and hallmarked\n• Free maintenance and cleaning service`,
        contact: `📞 Contact info:\n• Email: hello@avcijewelry.com\n• Web: avcikuyumculuk.com\n• You can also reach us through social media`,
        categories: `💍 Our collection categories:\n• Rings — Solitaire, engagement, wedding and cocktail rings\n• Necklaces — Pearl, diamond, emerald and gold necklaces\n• Bracelets — Bangle, chain and stone bracelets\n• Earrings — Hoop, stud and drop earrings`,
        materials: `✨ Materials we use:\n• 14K, 18K and 22K Gold\n• 925 Sterling Silver\n• Rose Gold\n• Diamond, Sapphire, Emerald, Ruby, Amethyst\n• Freshwater and Tahitian pearls`,
        care: `💎 Jewelry care tips:\n• Store jewelry in its box when not wearing\n• Keep away from perfume and chemicals\n• Clean regularly with a soft cloth\n• Get professional cleaning once a year\n• Remove during sports and housework`,
        promo: `🎉 Active promotions:\n• 10% off your first purchase with code WELCOME10!\n• Free shipping on orders over 5,000₺\n• Subscribe to our newsletter for surprise discounts`,
        cart: `🛒 Cart info:\n• Products are held at a fixed price for 15 minutes\n• Prices are locked when added to cart since gold prices change\n• You can enter a promo code for discounts`,
        sizing: `📏 Sizing guide:\n• If you don't know your ring size, measure with the string method\n• Use our online sizing guide\n• Free measurement available in our store`,
        off_topic: 'Sorry, I can only provide information about AVCI Jewelry. 💎 I can answer questions about our products, shipping, returns, payment, or jewelry care.',
        fallback: 'I couldn\'t fully help with that. You can ask about:\n\n• 🏪 About us\n• 💍 Products and categories\n• 🚚 Shipping and delivery\n• 🔄 Return policy\n• 💳 Payment options\n• 🛡️ Warranty\n• 💎 Jewelry care\n• 📏 Sizing guide\n• 🎉 Promotions\n• 📞 Contact',
        suggestions: [
            'How does shipping work?',
            'What is your return policy?',
            'What products do you have?',
            'Any promotions?',
        ],
    },
};

// Pattern matching rules
const patterns = [
    {
        keywords: ['merhaba', 'selam', 'hey', 'hello', 'hi', 'günaydın', 'iyi günler', 'iyi akşamlar', 'good morning', 'good evening'],
        response: 'greeting',
    },
    {
        keywords: ['hakkında', 'hakkınızda', 'nedir', 'kimsiniz', 'ne yapıyorsunuz', 'about', 'who are you', 'what is', 'tarihçe', 'hikaye', 'kuruluş', 'history', 'story'],
        response: 'about',
    },
    {
        keywords: ['kargo', 'teslimat', 'shipping', 'delivery', 'gönderim', 'kaç gün', 'ne zaman gelir', 'how long', 'ship'],
        response: 'shipping',
    },
    {
        keywords: ['iade', 'değişim', 'return', 'refund', 'geri', 'iptal', 'cancel', 'exchange'],
        response: 'returns',
    },
    {
        keywords: ['ödeme', 'payment', 'pay', 'kredi', 'credit', 'taksit', 'installment', 'havale', 'eft', 'transfer', 'kapıda'],
        response: 'payment',
    },
    {
        keywords: ['garanti', 'warranty', 'güvence', 'sertifika', 'certificate', 'ayar', 'damga'],
        response: 'warranty',
    },
    {
        keywords: ['iletişim', 'contact', 'telefon', 'phone', 'email', 'mail', 'adres', 'address', 'ulaş'],
        response: 'contact',
    },
    {
        keywords: ['kategori', 'ürün', 'koleksiyon', 'product', 'category', 'collection', 'neler var', 'yüzük', 'kolye', 'bilezik', 'küpe', 'ring', 'necklace', 'bracelet', 'earring', 'çeşit'],
        response: 'categories',
    },
    {
        keywords: ['materyal', 'malzeme', 'altın', 'gümüş', 'gold', 'silver', 'pırlanta', 'diamond', 'safir', 'sapphire', 'zümrüt', 'emerald', 'inci', 'pearl', 'ayar', 'karat'],
        response: 'materials',
    },
    {
        keywords: ['bakım', 'temizlik', 'care', 'clean', 'maintenance', 'nasıl korurum', 'saklama', 'store', 'koruma'],
        response: 'care',
    },
    {
        keywords: ['kampanya', 'indirim', 'kupon', 'promo', 'discount', 'promotion', 'kod', 'code', 'fırsat', 'offer', 'welcome'],
        response: 'promo',
    },
    {
        keywords: ['sepet', 'cart', 'fiyat kilitle', 'price lock', '15 dakika', 'süre'],
        response: 'cart',
    },
    {
        keywords: ['beden', 'ölçü', 'size', 'sizing', 'numara', 'parmak', 'finger', 'ölçüm', 'measure'],
        response: 'sizing',
    },
];

// Off-topic detection keywords
const offTopicKeywords = [
    'hava durumu', 'weather', 'futbol', 'football', 'soccer', 'basket', 'spor', 'sport',
    'yemek', 'food', 'tarif', 'recipe', 'film', 'movie', 'müzik', 'music', 'şarkı', 'song',
    'politika', 'politics', 'seçim', 'election', 'savaş', 'war', 'oyun', 'game',
    'araba', 'car', 'ev', 'house', 'okul', 'school', 'üniversite', 'university',
    'doktor', 'doctor', 'hastane', 'hospital', 'ilaç', 'medicine', 'kodlama', 'coding',
    'programlama', 'programming', 'bitcoin', 'crypto', 'borsa', 'stock market',
    'netflix', 'youtube', 'instagram', 'tiktok', 'twitter', 'facebook',
];

function findResponse(input: string, locale: string, products: any[]): string {
    const kb = locale === 'tr' ? knowledgeBase.tr : knowledgeBase.en;
    const normalizedInput = input.toLowerCase().trim();

    // Check for off-topic
    const isOffTopic = offTopicKeywords.some(keyword => normalizedInput.includes(keyword));
    if (isOffTopic) {
        return kb.off_topic;
    }

    // Check greeting first
    if (normalizedInput.length < 20) {
        const greetingMatch = patterns[0].keywords.some(k => normalizedInput.includes(k));
        if (greetingMatch) {
            const greetings = kb.greeting;
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
    }

    // Check for product-specific questions (price, specific product name)
    const priceKeywords = ['fiyat', 'price', 'kaç', 'how much', 'ne kadar', 'cost'];
    const askingPrice = priceKeywords.some(k => normalizedInput.includes(k));

    if (askingPrice && products.length > 0) {
        // Try to find mentioned product
        const matchedProduct = products.find(p => {
            const nameTr = p.nameTr?.toLowerCase() || '';
            const nameEn = p.nameEn?.toLowerCase() || '';
            return normalizedInput.includes(nameTr) || normalizedInput.includes(nameEn) ||
                nameTr.split(' ').some((w: string) => w.length > 3 && normalizedInput.includes(w)) ||
                nameEn.split(' ').some((w: string) => w.length > 3 && normalizedInput.includes(w));
        });

        if (matchedProduct) {
            const name = locale === 'tr' ? matchedProduct.nameTr : matchedProduct.nameEn;
            const stockInfo = matchedProduct.stock > 0
                ? (locale === 'tr' ? `Stokta ${matchedProduct.stock} adet mevcut.` : `${matchedProduct.stock} items in stock.`)
                : (locale === 'tr' ? 'Maalesef şu anda stokta yok.' : 'Unfortunately out of stock.');
            return `💍 **${name}**\n• ${locale === 'tr' ? 'Fiyat' : 'Price'}: ${matchedProduct.price.toLocaleString()} ₺\n• ${locale === 'tr' ? 'Ağırlık' : 'Weight'}: ${matchedProduct.weight}g\n• ${locale === 'tr' ? 'Kategori' : 'Category'}: ${matchedProduct.category}\n• ${stockInfo}`;
        }

        // General price question
        if (products.length > 0) {
            const minPrice = Math.min(...products.map((p: any) => p.price));
            const maxPrice = Math.max(...products.map((p: any) => p.price));
            return locale === 'tr'
                ? `💰 Fiyatlarımız ${minPrice.toLocaleString()}₺ ile ${maxPrice.toLocaleString()}₺ arasında değişmektedir. Toplam ${products.length} ürünümüz bulunmaktadır. Detaylar için Ürünler sayfamızı ziyaret edebilirsiniz.`
                : `💰 Our prices range from ${minPrice.toLocaleString()}₺ to ${maxPrice.toLocaleString()}₺. We have ${products.length} products. Visit our Products page for details.`;
        }
    }

    // Check for stock questions
    const stockKeywords = ['stok', 'stock', 'mevcut', 'available', 'var mı', 'kaldı'];
    const askingStock = stockKeywords.some(k => normalizedInput.includes(k));
    if (askingStock && products.length > 0) {
        const inStock = products.filter((p: any) => p.stock > 0).length;
        const lowStock = products.filter((p: any) => p.stock > 0 && p.stock < 5);
        let response = locale === 'tr'
            ? `📦 Şu anda ${inStock}/${products.length} ürünümüz stokta mevcuttur.`
            : `📦 Currently ${inStock}/${products.length} products are in stock.`;
        if (lowStock.length > 0) {
            response += locale === 'tr'
                ? `\n\n⚠️ Tükenmek üzere olan ürünler:\n${lowStock.map((p: any) => `• ${p.nameTr} (${p.stock} adet)`).join('\n')}`
                : `\n\n⚠️ Low stock items:\n${lowStock.map((p: any) => `• ${p.nameEn} (${p.stock} left)`).join('\n')}`;
        }
        return response;
    }

    // Pattern matching for general topics
    let bestMatch = '';
    let bestScore = 0;

    for (const pattern of patterns) {
        const score = pattern.keywords.filter(k => normalizedInput.includes(k)).length;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = pattern.response;
        }
    }

    if (bestScore > 0 && bestMatch) {
        const response = (kb as any)[bestMatch];
        if (typeof response === 'string') return response;
        if (Array.isArray(response)) return response[Math.floor(Math.random() * response.length)];
    }

    // Thank you responses
    const thankKeywords = ['teşekkür', 'sağol', 'thanks', 'thank you', 'mersi'];
    if (thankKeywords.some(k => normalizedInput.includes(k))) {
        return locale === 'tr'
            ? 'Rica ederim! 😊 Başka bir sorunuz olursa yardımcı olmaktan memnuniyet duyarım. 💎'
            : 'You\'re welcome! 😊 Feel free to ask if you have any other questions. 💎';
    }

    // Goodbye
    const byeKeywords = ['hoşça kal', 'görüşürüz', 'bye', 'goodbye', 'güle güle'];
    if (byeKeywords.some(k => normalizedInput.includes(k))) {
        return locale === 'tr'
            ? 'Görüşmek üzere! 👋 AVCI Kuyumculuk\'u tercih ettiğiniz için teşekkür ederiz. 💎'
            : 'See you! 👋 Thank you for choosing AVCI Jewelry. 💎';
    }

    // Fallback
    return kb.fallback;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { locale } = useLanguage();
    const { products } = useProducts();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addBotMessage = useCallback((text: string) => {
        setIsTyping(true);
        const delay = Math.min(500 + text.length * 8, 2000);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text,
                sender: 'bot',
                timestamp: new Date(),
            }]);
            setIsTyping(false);
            if (!isOpen) setHasNewMessage(true);
        }, delay);
    }, [isOpen]);

    const handleOpen = useCallback(() => {
        setIsOpen(true);
        setHasNewMessage(false);
        if (messages.length === 0) {
            const kb = locale === 'tr' ? knowledgeBase.tr : knowledgeBase.en;
            const greeting = kb.greeting[Math.floor(Math.random() * kb.greeting.length)];
            setMessages([{
                id: '0',
                text: greeting,
                sender: 'bot',
                timestamp: new Date(),
            }]);
        }
        setTimeout(() => inputRef.current?.focus(), 300);
    }, [messages.length, locale]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        const response = findResponse(input, locale, products);
        setInput('');
        addBotMessage(response);
    };

    const handleSuggestion = (suggestion: string) => {
        setInput('');
        const userMessage: Message = {
            id: Date.now().toString(),
            text: suggestion,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        const response = findResponse(suggestion, locale, products);
        addBotMessage(response);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const kb = locale === 'tr' ? knowledgeBase.tr : knowledgeBase.en;

    return (
        <>
            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-4 sm:right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[400px] transition-all duration-500 ease-out ${
                    isOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
            >
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col" style={{ height: '520px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] p-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-lg">
                                    <Diamond className="w-5 h-5 text-white fill-current" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1a1a2e] animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">AVCI Asistan</h3>
                                <p className="text-gray-400 text-[10px] font-medium">
                                    {locale === 'tr' ? 'Çevrimiçi — Yanıt vermeye hazır' : 'Online — Ready to respond'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2.5 animate-fade-in-up ${
                                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                            >
                                {/* Avatar */}
                                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${
                                    msg.sender === 'bot'
                                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B]'
                                        : 'bg-gradient-to-br from-[#1a1a2e] to-[#16213e]'
                                }`}>
                                    {msg.sender === 'bot'
                                        ? <Bot className="w-3.5 h-3.5 text-white" />
                                        : <User className="w-3.5 h-3.5 text-white" />
                                    }
                                </div>

                                {/* Bubble */}
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                                        msg.sender === 'user'
                                            ? 'bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white rounded-2xl rounded-br-md shadow-md'
                                            : 'bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-2.5 animate-fade-in-up">
                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-sm">
                                    <Bot className="w-3.5 h-3.5 text-white" />
                                </div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Suggestions (show after first bot message) */}
                        {messages.length === 1 && messages[0].sender === 'bot' && (
                            <div className="flex flex-wrap gap-2 pt-2 animate-fade-in-up">
                                {kb.suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => handleSuggestion(suggestion)}
                                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#D4AF37]/30 text-[#B8860B] bg-[#D4AF37]/5 hover:bg-[#D4AF37]/15 hover:border-[#D4AF37]/50 transition-all duration-200"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1 border border-gray-100 focus-within:border-[#D4AF37]/50 focus-within:ring-2 focus-within:ring-[#D4AF37]/10 transition-all">
                            <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={locale === 'tr' ? 'Mesajınızı yazın...' : 'Type your message...'}
                                className="flex-1 bg-transparent text-sm py-2.5 outline-none placeholder:text-gray-400 text-gray-700"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="p-2 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-white hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[9px] text-gray-400 text-center mt-2 font-medium">
                            {locale === 'tr' ? 'AVCI Kuyumculuk yapay zeka asistanı' : 'AVCI Jewelry AI assistant'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={isOpen ? () => setIsOpen(false) : handleOpen}
                className={`fixed bottom-6 right-4 sm:right-6 z-[9999] group transition-all duration-300 ${
                    isOpen ? 'rotate-0' : 'hover:scale-110'
                }`}
                aria-label="Chat"
            >
                <div className={`relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${
                    isOpen
                        ? 'bg-gradient-to-br from-gray-700 to-gray-900'
                        : 'bg-gradient-to-br from-[#D4AF37] to-[#B8860B] hover:shadow-[#D4AF37]/40 hover:shadow-xl'
                }`}>
                    {isOpen ? (
                        <X className="w-6 h-6 text-white" />
                    ) : (
                        <MessageCircle className="w-6 h-6 text-white fill-current" />
                    )}

                    {/* Pulse ring */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-20" />
                    )}

                    {/* New message badge */}
                    {hasNewMessage && !isOpen && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-bounce">
                            1
                        </span>
                    )}
                </div>
            </button>
        </>
    );
}
