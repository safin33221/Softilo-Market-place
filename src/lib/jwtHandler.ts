import jwt, { JwtPayload } from 'jsonwebtoken';

export interface TokenVerificationResult {
  success: boolean;
  payload?: JwtPayload;
  message?: string;
}

export async function verifyAccessToken(token: string): Promise<TokenVerificationResult> {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    if (!decoded) {
      return { success: false, message: 'Invalid token format' };
    }

    // Check expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return { success: false, message: 'Token has expired' };
    }

    return { success: true, payload: decoded };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Verification failed' };
  }
}

