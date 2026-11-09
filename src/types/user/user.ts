export type IUserRole = 'CUSTOMER' | 'SELLER_OWNER' | 'SUPER_ADMIN';

export interface IUser {
  id: string;
  phone: string;
  name?: string | null;
  role: IUserRole;
  tenantId?: string | null;
  loyaltyPoints?: number;
  totalDelivered?: number;
  totalReturned?: number;
}

