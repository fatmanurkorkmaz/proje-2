'use client';

import { Upload, X } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
    const { addProduct } = useProducts();
    const router = useRouter();

    const [formData, setFormData] = useState({
        nameTr: '',
        nameEn: '',
        descriptionTr: '',
        descriptionEn: '',
        price: '',
        weight: '',
        category: 'Rings',
        status: 'Published',
        image: '',
        stock: '0'
    });
    const [uploading, setUploading] = useState(false);

    // File Upload Handler
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: data });
            if (!res.ok) throw new Error('Upload failed');
            const json = await res.json();
            setFormData(prev => ({ ...prev, image: json.url }));
        } catch (error) {
            alert('Görsel yüklenemedi!');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        if (!formData.nameTr || !formData.nameEn || !formData.price || !formData.image) {
            alert('Lütfen zorunlu alanları (İsimler, Fiyat, Görsel) doldurun.');
            return;
        }

        const newProduct = {
            nameTr: formData.nameTr,
            nameEn: formData.nameEn,
            descriptionTr: formData.descriptionTr || '',
            descriptionEn: formData.descriptionEn || '',
            price: parseFloat(formData.price) || 0,
            weight: parseFloat(formData.weight) || 0,
            image: formData.image,
            category: formData.category,
            isNew: true,
            stock: parseInt(formData.stock) || 0
        };

        try {
            await addProduct(newProduct as any);
            router.push('/admin/products');
        } catch (error) {
            alert('Ürün eklenirken bir hata oluştu.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
                    <p className="text-gray-500 text-sm">Mağazanız için yeni bir ürün kartı oluşturun.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => router.back()} className="px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50">İptal</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-secondary-foreground rounded-sm text-sm font-bold hover:bg-primary/90">Yayınla</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Ürün Detayları</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-primary uppercase tracking-widest">Türkçe Bilgiler</h4>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Ürün Adı (TR)</label>
                                    <input
                                        type="text"
                                        value={formData.nameTr}
                                        onChange={(e) => setFormData({ ...formData, nameTr: e.target.value })}
                                        placeholder="Örn. 18k Altın Yüzük"
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Açıklama (TR)</label>
                                    <textarea
                                        rows={4}
                                        value={formData.descriptionTr}
                                        onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                                        placeholder="Ürün açıklaması..."
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-primary uppercase tracking-widest">English Details</h4>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Product Name (EN)</label>
                                    <input
                                        type="text"
                                        value={formData.nameEn}
                                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                        placeholder="Ex. 18k Gold Ring"
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Description (EN)</label>
                                    <textarea
                                        rows={4}
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        placeholder="Product description in English..."
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Medya</h3>
                        <div className="border-2 border-dashed border-gray-100 rounded-sm p-8 text-center hover:bg-gray-50/50 transition-colors cursor-pointer relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />

                            {uploading ? (
                                <p className="text-primary font-bold animate-pulse">Yükleniyor...</p>
                            ) : formData.image ? (
                                <div className="relative w-full h-64 group">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain rounded-md" />
                                    <button
                                        onClick={(e) => { e.preventDefault(); setFormData({ ...formData, image: '' }); }}
                                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-red-50 transition-colors group-hover:scale-110"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ) : (
                                <div className="py-4">
                                    <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-sm font-bold text-secondary">Ürün Görseli Yükle</p>
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest leading-relaxed">PNG, JPG veya WEBP desteği</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Özellikler & Fiyat</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Satış Fiyatı (₺)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Gramaj (Gram)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Stok Miktarı</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="0"
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Organizasyon</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Kategori</label>
                                <select
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none bg-white text-sm font-bold text-secondary cursor-pointer"
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    value={formData.category}
                                >
                                    <option value="Rings">Yüzükler</option>
                                    <option value="Necklaces">Kolyeler</option>
                                    <option value="Earrings">Küpeler</option>
                                    <option value="Bracelets">Bileklikler</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Durum</label>
                                <select className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none bg-white text-sm font-bold text-secondary cursor-pointer">
                                    <option>Yayında</option>
                                    <option>Taslak</option>
                                    <option>Arşiv</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
