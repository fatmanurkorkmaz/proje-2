'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface Settings {
    siteTitle: string;
    founderName: string;
    footerText: string;
    contactEmail: string;
}

const defaultSettings: Settings = {
    siteTitle: 'AVCI Kuyumculuk',
    founderName: 'Aykal Avcı',
    footerText: '1995\'ten beri zamansız hikayeler işliyoruz.',
    contactEmail: 'hello@avcijewelry.com'
};

const SettingsContext = createContext<Settings>(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    useEffect(() => {
        fetch('/api/settings')
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setSettings(prev => ({ ...prev, ...data }));
                }
            })
            .catch((err) => console.error('Failed to fetch settings', err));
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => useContext(SettingsContext);
