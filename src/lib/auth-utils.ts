import { IUserRole } from '@/types/user/user';

export function getDefaultDashboard(role?: IUserRole): string {
  switch (role) {
    case 'SELLER_OWNER':
      return '/dashboard';
    case 'SUPER_ADMIN':
      return '/admin';
    default:
      return '/dashboard';
  }
}

