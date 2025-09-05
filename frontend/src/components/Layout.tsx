'use client';

import { useEffect, useState } from 'react';
import { strapiApi } from '@/lib/api';
import { Global } from '@/types/strapi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [globalData, setGlobalData] = useState<Global | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGlobalData() {
            try {
                const response = await strapiApi.getGlobal();
                setGlobalData(response.data);
            } catch (error) {
                console.error('Failed to fetch global data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchGlobalData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header header={globalData?.header} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer footer={globalData?.footer} />
        </div>
    );
}
