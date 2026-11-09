import React from "react";
import { redirect } from "next/navigation";
import { getMe } from "@/services/auth/getMe";
import { SellerSidebar } from "@/components/seller/SellerSidebar";

export const dynamic = "force-dynamic";

/**
 * Server-Side Dashboard Layout Guard
 * Provides airtight defense: if accessToken is removed, expired, or user has no store,
 * execution redirects immediately on the server before rendering any HTML.
 */
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getMe();

    // 1. If unauthenticated, redirect to login page
    if (!user || !user.id) {
        redirect("/login");
    }

    // 2. If authenticated user has not created a shop yet, redirect to onboarding
    if (!user.tenantId) {
        redirect("/onboard");
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
