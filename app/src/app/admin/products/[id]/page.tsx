'use client';

import { Upload, X, ArrowLeft, Save } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
    const { products } = useProducts();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

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
        stock: '0',
        isNew: false
    });
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        nameTr: data.nameTr || '',
                        nameEn: data.nameEn || '',
                        descriptionTr: data.descriptionTr || '',
                        descriptionEn: data.descriptionEn || '',
                        price: data.price.toString() || '',
                        weight: data.weight?.toString() || '',
                        category: data.category || 'Rings',
                        status: 'Published',
                        image: data.image || '',
                        stock: data.stock?.toString() || '0',
                        isNew: data.isNew || false
                    });
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

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
            alert('Lütfen zorunlu alanları doldurun.');
            return;
        }

        const updatedProduct = {
            ...formData,
            price: parseFloat(formData.price),
            weight: parseFloat(formData.weight) || 0,
            stock: parseInt(formData.stock) || 0
        };

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });

            if (res.ok) {
                router.push('/admin/products');
                router.refresh();
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            alert('Ürün güncellenirken bir hata oluştu.');
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20 animate-pulse text-gray-400 font-bold uppercase tracking-widest">Yükleniyor...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Ürünü Düzenle</h1>
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">{id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => router.back()} className="px-4 py-2 border border-gray-200 rounded-sm text-sm font-medium text-gray-600 hover:bg-gray-50">İptal</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-secondary text-white rounded-sm text-sm font-bold flex items-center gap-2 hover:bg-secondary/90 shadow-lg">
                        <Save className="w-4 h-4" /> Güncelle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Ürün Bilgileri</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-primary uppercase tracking-widest">Türkçe</h4>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">İsim</label>
                                    <input
                                        type="text"
                                        value={formData.nameTr}
                                        onChange={(e) => setFormData({ ...formData, nameTr: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Açıklama</label>
                                    <textarea
                                        rows={4}
                                        value={formData.descriptionTr}
                                        onChange={(e) => setFormData({ ...formData, descriptionTr: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                                    ></textarea>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-primary uppercase tracking-widest">English</h4>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={formData.nameEn}
                                        onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Description</label>
                                    <textarea
                                        rows={4}
                                        value={formData.descriptionEn}
                                        onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Görsel</h3>
                        <div className="border-2 border-dashed border-gray-100 rounded-sm p-8 text-center relative">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            {uploading ? (
                                <p className="animate-pulse text-primary font-bold">Yükleniyor...</p>
                            ) : formData.image ? (
                                <div className="relative h-64">
                                    <img src={formData.image} className="w-full h-full object-contain" />
                                    <button onClick={() => setFormData({ ...formData, image: '' })} className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md"><X className="w-4 h-4 text-red-500" /></button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload className="w-10 h-10 text-gray-300 mb-2" />
                                    <p className="text-sm text-gray-400">Yeni görsel yüklemek için tıklayın</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing and Stock */}
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Fiyat & Stok</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Fiyat (₺)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Ağırlık (Gram)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.weight}
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Stok Miktarı</label>
                                <input
                                    type="number"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-secondary">Kategori</h3>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-2.5 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none text-sm font-bold"
                        >
                            <option value="Rings">Yüzükler</option>
                            <option value="Necklaces">Kolyeler</option>
                            <option value="Earrings">Küpeler</option>
                            <option value="Bracelets">Bileklikler</option>
                        </select>
                    </div>

                    <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isNew}
                                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                                className="w-4 h-4 text-primary rounded-sm"
                            />
                            <span className="text-sm font-bold text-secondary uppercase tracking-widest">Yeni Ürün (New)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
