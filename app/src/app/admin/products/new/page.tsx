'use client';

import { Upload, X } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
    const { addProduct } = useProducts();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Rings',
        status: 'Published',
        material: 'Yellow Gold',
        image: ''
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

    const handleSubmit = () => {
        const newProduct = {
            id: Date.now().toString(),
            name: formData.name || 'Yeni Ürün',
            description: formData.description || 'Açıklama yok',
            price: parseFloat(formData.price) || 0,
            image: formData.image || 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800',
            category: formData.category,
            material: formData.material,
            inStock: true,
            isNew: true
        };

        // @ts-ignore
        addProduct(newProduct);
        router.push('/admin/products');
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
                        <h3 className="font-bold text-lg mb-4">Genel Bilgiler</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Örn. 18k Altın Yüzük"
                                    className="w-full p-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Ürün açıklaması..."
                                    className="w-full p-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Medya</h3>
                        <div className="border-2 border-dashed border-gray-200 rounded-sm p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />

                            {uploading ? (
                                <p className="text-primary font-bold">Yükleniyor...</p>
                            ) : formData.image ? (
                                <div className="relative w-full h-64">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain rounded-md" />
                                    <button
                                        onClick={(e) => { e.preventDefault(); setFormData({ ...formData, image: '' }); }}
                                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                                    >
                                        <X className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">Görsel yüklemek için tıklayın (YENİ: Gerçek Yükleme)</p>
                                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG veya GIF (max. 800x400px)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Fiyatlandırma</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Satış Fiyatı (₺)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="0.00"
                                    className="w-full p-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4">Organizasyon</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <select
                                    className="w-full p-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Rings">Yüzükler</option>
                                    <option value="Necklaces">Kolyeler</option>
                                    <option value="Earrings">Küpeler</option>
                                    <option value="Bracelets">Bileklikler</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Materyal</label>
                                <select
                                    className="w-full p-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                >
                                    <option value="Yellow Gold">Sarı Altın</option>
                                    <option value="White Gold">Beyaz Altın</option>
                                    <option value="Rose Gold">Rose Altın</option>
                                    <option value="Silver">Gümüş</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                                <select className="w-full p-2 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none bg-white">
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
