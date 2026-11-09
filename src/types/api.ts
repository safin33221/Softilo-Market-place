/**
 * Softilo Marketplace API Types
 * Mirrors the NestJS backend domain entities and API endpoints defined in api-doc.md
 */

export type UserRole = 'CUSTOMER' | 'SELLER_OWNER' | 'SUPER_ADMIN';

export interface User {
  id: string;
  phone: string;
  name?: string | null;
  role: UserRole;
  tenantId?: string | null;
  loyaltyPoints: number;
  totalDelivered: number;
  totalReturned: number;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  customDomain?: string | null;
  phone: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  commissionRate: string | number;
  trustScore: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  productCount?: number;
  orderCount?: number;
}

export interface TenantWallet {
  id: string;
  tenantId: string;
  pendingBalance: string | number;
  availableBalance: string | number;
  totalEarned: string | number;
  updatedAt?: string;
}

export interface Product {
  id: string;
  tenantId: string;
  title: string;
  slug: string;
  description?: string;
  price: string | number;
  discountPrice?: string | number | null;
  stock: number;
  images: string[];
  isCurated?: boolean;
  createdAt: string;
  updatedAt?: string;
  tenant?: Partial<Tenant>;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_COURIER'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

export type CourierProvider = 'STEADFAST' | 'PATHAO' | 'REDX';

export interface OrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: string | number;
  image?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  tenantId: string;
  customerId?: string | null;
  customerName: string;
  customerPhone: string;
  district: string;
  thana: string;
  fullAddress: string;
  subtotal: string | number;
  deliveryCharge: string | number;
  discountAmount?: string | number;
  totalAmount: string | number;
  platformFee?: string | number;
  netSellerAmount?: string | number;
  status: OrderStatus;
  courierProvider?: CourierProvider | null;
  trackingCode?: string | null;
  createdAt: string;
  items: OrderItem[];
  tenant?: Partial<Tenant>;
  customerDeliveryStats?: {
    totalDelivered: number;
    totalReturned: number;
  };
}

export interface QuickCheckoutPayload {
  tenantId: string; // Tenant UUID or slug
  customerName: string;
  customerPhone: string;
  district: string;
  thana: string;
  fullAddress: string;
  deliveryCharge: number;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  normalizedPhone: string;
  devOtp?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: User;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

