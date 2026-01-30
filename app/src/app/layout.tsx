import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ProductProvider } from '@/context/ProductContext';
import { CartProvider } from '@/context/CartContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { migrateJsonToSql } from '@/lib/db';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'AVCI Kuyumculuk | Zarafetin ve Lüksün Adresi',
  description: '1995\'ten beri el yapımı mücevherler. Avcı Kuyumculuk koleksiyonunu keşfedin.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Trigger migration from JSON to SQL on startup
  try {
    await migrateJsonToSql();
  } catch (e) {
    console.error('Initial migration failed:', e);
  }
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        <SettingsProvider>
          <LanguageProvider>
            <AuthProvider>
              <ProductProvider>
                <CartProvider>
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </CartProvider>
              </ProductProvider>
            </AuthProvider>
          </LanguageProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
