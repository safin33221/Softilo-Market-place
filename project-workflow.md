## ⚠️ AI AGENT MANDATORY CODING RULES (READ FIRST)

You MUST strictly follow these engineering standards across every file, component, and module:

1. **Minimalist & Concise Code (KISS & YAGNI):** Write the shortest, cleanest code possible to solve the problem. Avoid over-engineering, redundant wrappers, or unnecessary boilerplate.
2. **Maximum Reusability (DRY Principle):** Build modular, reusable components, hooks, utilities, and services. Never duplicate logic—extract shared code into `utils/`, `hooks/`, or `common/`.
3. **Industry-Grade Maintainability:** Enforce strict TypeScript types (no `any`), clear separation of concerns, single-responsibility functions, and clean folder architecture.
4. **Line-by-Line & Workflow Commenting:** Explain the "WHY" and "HOW" clearly. Add concise JSDoc/header comments for every workflow, function, and API route, plus inline comments on critical business logic, multi-tenant filtering, and complex lines.

--------------------------------------------------------------------------------------------
# 🛍️ Frontend Project Workflow: `shop.softilo.io` (Seller Hub & Dashboard)

> **Scope:** Pure Frontend Architecture (Next.js App Router). Backend API is completely decoupled and resides in a separate repository.
> **Target Audience:** E-commerce Merchants & F-commerce Sellers in Bangladesh.

## ⚠️ AI AGENT MANDATORY CODING RULES (READ FIRST)

You MUST strictly follow these engineering standards across every file, component, and hook:

1. **Minimalist & Concise Code (KISS & YAGNI):** Write the shortest, cleanest code possible to solve the problem. Avoid over-engineering, redundant wrappers, or unnecessary boilerplate.
2. **Maximum Reusability (DRY Principle):** Build modular, reusable UI components (`components/ui/`), custom hooks (`hooks/`), and helper utilities (`lib/utils.ts`). Never duplicate UI patterns or validation logic.
3. **Industry-Grade Maintainability:** Enforce strict TypeScript interfaces (zero `any`), clear separation between UI presentation and API fetching logic, and clean Next.js App Router conventions.
4. **Line-by-Line & Workflow Commenting:** Explain the "WHY" and "HOW" clearly. Add concise JSDoc headers for every component/hook and inline comments on complex state changes, form validations, and API mutations.

---

## 🎯 1. Project Overview

`shop.softilo.io` is a standalone Next.js frontend application dedicated exclusively to **Sellers/Merchants**. Customer-facing marketplace browsing happens on a separate domain and is OUT OF SCOPE for this repository.

**Core Frontend Journeys:**
1. **SaaS Pitch & Landing Page (`/`):** Explains the "Zero Monthly Fee, Pay-Only-On-Sale" business model, showcases an interactive commission calculator, and converts visitors into registered sellers.
2. **Phone-First Onboarding (`/login`, `/onboarding`):** Bangladeshi mobile number (`01XXXXXXXXX`) + OTP authentication, followed by a 2-step store setup wizard.
3. **Merchant Dashboard (`/dashboard/*`):** Mobile-first control panel for managing products, verifying customer fraud scores on orders, one-click courier booking UI, and wallet payout tracking.

---

## 🛠️ 2. Frontend Tech Stack

- **Framework:** Next.js 14/15 (App Router, TypeScript)
- **Styling & UI:** Tailwind CSS, Shadcn UI, Lucide React Icons
- **State & Data Fetching:** TanStack React Query (Server State) + Zustand (Lightweight Client/Auth State)
- **Forms & Validation:** React Hook Form + Zod
- **HTTP Client:** Axios or native `fetch` wrapper with automatic JWT token injection (`lib/api-client.ts`)

---

## 📂 3. Directory Structure (Pure Frontend)

```text
src/
├── app/
│   ├── (marketing)/               # Public Seller Landing Pages
│   │   ├── page.tsx               # Hero, Interactive Calculator, Trust Pitch
│   │   └── layout.tsx             # Public Navbar & Footer
│   ├── (auth)/                    # Passwordless Phone Auth & Setup
│   │   ├── login/page.tsx         # 11-digit BD Phone Input + 4-digit OTP UI
│   │   └── onboarding/page.tsx    # Store Name, Live Subdomain Preview & Category
│   └── (dashboard)/               # Protected Seller Workspace
│       ├── layout.tsx             # Sidebar (Desktop) + Bottom Nav (Mobile)
│       └── dashboard/
│           ├── page.tsx           # KPI Cards, Quick Actions, Recent Orders
│           ├── products/          # Product List Table/Grid + Slide-over Add Drawer
│           ├── orders/            # Order List with Courier Fraud Ratio Badges
│           ├── wallet/            # Escrow Balance, Net Earnings & Withdrawal Modal
│           └── settings/          # Storefront Branding (Logo, Banner, Social Links)
├── components/
│   ├── ui/                        # Reusable primitives (Button, Input, Drawer, Badge)
│   ├── marketing/                 # CommissionCalculator, FeatureGrid, HeroSection
│   └── dashboard/                 # StatCard, FraudBadge, ProductFormDrawer, OrderRow
├── hooks/                         # Custom React Query & UI hooks (useAuth, useDebounce)
├── lib/
│   ├── api-client.ts              # Centralized API caller pointing to NEXT_PUBLIC_API_URL
│   ├── validators.ts              # Zod schemas (BD phone normalizer, product form)
│   └── utils.ts                   # cn(), currency formatter (৳), Bangla-to-English digit converter
└── types/
    └── index.ts                   # Shared TypeScript interfaces (Seller, Product, Order, Wallet)
```

---

## 🎨 4. UI/UX & Design System Guidelines

1. **Mobile-First Ergonomics (85% Sellers use smartphones):**
   - Dashboard must feature a fixed **Bottom Navigation Bar** on screens `< 768px` (Overview, Products, Orders, Wallet) and a collapsible left sidebar on desktop.
   - Replace complex multi-page forms with **Slide-over Drawers / Bottom Sheets** (e.g., adding a product or viewing order details).
2. **Bangladeshi Localization & Smart Inputs:**
   - **Auto Digit Normalizer:** Automatically convert Bangla numerals (`০১৭...`) typed by sellers into English digits (`017...`) in real time inside phone and price inputs.
   - **Bilingual Micro-copy:** Keep primary labels clean in English alongside helpful Bangla hints (e.g., *"Store Link (আপনার শপের লিংক)"*).
   - **Currency Formatting:** Always format amounts with the Taka symbol (`৳ ১,২৫০` or `৳ 1,250`).
3. **Color Palette & Trust Aesthetics:**
   - **Primary Accent:** Deep Emerald (`#059669`) — represents growth, profit, and verified trust.
   - **Surface/Background:** Clean Slate (`#F8FAFC`) with crisp `#FFFFFF` cards and subtle `1px solid #E2E8F0` borders.
   - **Risk Indicators (Courier Fraud Badges):**
     - High Success (`> 80%`): Soft Green Badge (`Safe Delivery`)
     - Medium Risk (`50% - 79%`): Amber Badge (`Call to Confirm`)
     - High Risk (`< 50%`): Rose Red Badge (`High Return Risk - Verify First`)

---

## 🔄 5. Core Frontend Workflows & Screen Specs

### Workflow A: High-Converting Seller Landing Page (`/`)
- **Hero Section:** Bold headline highlighting *"০ টাকা মাসিক ফি—শুধু সেল হলেই সামান্য কমিশন"* with a primary CTA (`ফ্রি স্টোর খুলুন -> /login`).
- **Interactive Profit Calculator Component:**
  - Seller drags a slider for Monthly Sales Volume (e.g., `৳ ৫০,০০০`).
  - Real-time comparison card shows: **Traditional Website Cost** (Hosting + Maint. = `৳ ৩,০০০/মাস fixed`) vs **`shop.softilo.io` Cost** (`৳ ০ ফিক্সড চার্জ`).
- **Visual Storefront Preview:** Interactive mockup showing how their store link (`yourbrand.marketplace.com`) looks on a customer's phone.

### Workflow B: Phone OTP & Instant Store Setup (`/login` -> `/onboarding`)
- **Step 1 (`/login`):** Single input field for 11-digit BD mobile number. On submit, transitions smoothly to a 4-digit OTP input with auto-focus and a 60s resend timer.
- **Step 2 (`/onboarding`):**
  - Input: `Store Name` (e.g., *"Noman Gadgets"*).
  - Auto-generated debounced slug preview: `nomangadgets.marketplace.com` with a real-time green availability badge (`✓ লিংকটি খালি আছে`).
  - Input: Pickup Address & Primary Payment Number (bKash/Nagad for receiving payouts).

### Workflow C: Versioned Dashboard Rollout (MVP First)

#### 🚀 Version 1.0 (MVP - Build Immediately)
- **Overview (`/dashboard`):** 4 clean KPI cards (Total Sales, Active Orders, Pending Balance, Store Link Copy Button with 1-click WhatsApp/Facebook share).
- **Product Management (`/dashboard/products`):**
  - Searchable product list with quick stock toggle switch (In-Stock / Out-of-Stock).
  - `ProductFormDrawer`: Upload up to 4 images (client-side compression before upload), Title, Price (`৳`), Discount Price, and Stock count.
- **Order Processing (`/dashboard/orders`):**
  - Filter tabs: `All`, `Pending`, `Confirmed`, `Shipped`, `Delivered`, `Returned`.
  - Each order card displays Customer Name, Phone (1-tap call button on mobile), Address, Total Price, and **Platform Commission Breakdown** (e.g., *Order: ৳1000 | Fee (5%): ৳50 | Your Earning: ৳950*).
- **Wallet View (`/dashboard/wallet`):**
  - Shows `Available for Withdrawal` vs `In Escrow (Pending Delivery)` and a clean payout request modal.

#### ⚡ Version 2.0 (Trust & AI Assist UI - Phase 2)
- **Courier Fraud Score Badge UI:** Inside the Order table, display a visual meter showing the customer's historical parcel reception rate across Steadfast/Pathao/RedX.
- **1-Click Courier Booking Modal:** Select courier provider and send parcel directly from the order row without re-typing customer details.
- **AI Studio Button inside Product Drawer:** *"✨ Generate Description & Remove Image BG"* button that calls the backend AI endpoint and populates the form fields with skeleton loading states.

---

## 🔌 6. Frontend-to-Backend API Contract (`lib/api-client.ts`)

D:\Projects\Softilo_Products\Market_place\softilo-marketplace\api-doc.md