'use client';

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { SellerSidebar } from "@/components/seller/SellerSidebar";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);


    if (!isReady) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900">
            {/* Seller Dashboard Responsive Sidebar */}
            <SellerSidebar />

            {/* Main Dashboard Content Area */}
            <main className="flex-1 overflow-x-hidden min-h-screen">
                {children}
            </main>
        </div>
    );
}
