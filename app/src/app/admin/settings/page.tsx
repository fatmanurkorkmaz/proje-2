'use client';

import { useEffect, useState } from 'react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        siteTitle: '',
        founderName: '',
        footerText: '',
        contactEmail: ''
    });

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data.siteTitle) setSettings(data);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                alert('Ayarlar kaydedildi!');
            }
        } catch (error) {
            alert('Hata oluştu.');
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Site Ayarları (CMS)</h1>
            <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Marka İsmi</label>
                    <input
                        type="text"
                        name="siteTitle"
                        value={settings.siteTitle}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kurucu İsmi</label>
                    <input
                        type="text"
                        name="founderName"
                        value={settings.founderName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Footer Metni (Slogan)</label>
                    <textarea
                        name="footerText"
                        rows={3}
                        value={settings.footerText}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">İletişim E-posta</label>
                    <input
                        type="text"
                        name="contactEmail"
                        value={settings.contactEmail}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-sm focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        className="bg-primary text-secondary-foreground px-6 py-3 rounded-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
}
