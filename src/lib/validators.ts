/**
 * Bangladeshi Phone & Data Validation Utilities
 * 
 * Implements strict zero-friction formatting:
 * 1. Automatically converts Bengali numerals (০-৯) to English digits (0-9).
 * 2. Cleans spaces, dashes, and country prefixes (+880, 880).
 * 3. Restricts to 11 digits: 01XXXXXXXXX (BD operator prefixes: 013, 014, 015, 016, 017, 018, 019).
 */

const banglaToEnglishDigits: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
};

const englishToBanglaDigits: Record<string, string> = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
};

/**
 * Normalizes user phone input in real-time.
 * Converts Bangla digits, eliminates special characters, trims +88/88,
 * and caps at 11 standard digits.
 */
export function cleanBdPhoneInput(input: string): string {
  if (!input) return '';

  // 1. Convert Bengali numerals to ASCII English digits
  let cleaned = input
    .split('')
    .map((char) => banglaToEnglishDigits[char] ?? char)
    .join('');

  // 2. Strip all non-numeric characters (spaces, dashes, parentheses, pluses)
  cleaned = cleaned.replace(/\D/g, '');

  // 3. Remove country codes (8801... -> 01...)
  if (cleaned.startsWith('8801') && cleaned.length >= 13) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('88') && cleaned.length >= 13) {
    cleaned = cleaned.slice(2);
  }

  // 4. Return up to 11 digits
  return cleaned.slice(0, 11);
}

export const normalizeBdPhone = cleanBdPhoneInput;

/**
 * Validates whether the given string is a valid 11-digit Bangladeshi mobile number.
 * Operator codes: 013 (GP), 014 (Banglalink), 015 (Teletalk), 016 (Airtel), 017 (GP), 018 (Robi), 019 (Banglalink).
 */
export function isValidBdPhone(phone: string): boolean {
  const cleaned = cleanBdPhoneInput(phone);
  return /^01[3-9]\d{8}$/.test(cleaned);
}

/**
 * Converts English number/digits string to Bengali digits for UI display (e.g., 1250 -> ১২৫০).
 */
export function toBanglaNumber(value: number | string): string {
  const str = String(value);
  return str
    .split('')
    .map((char) => englishToBanglaDigits[char] ?? char)
    .join('');
}

/**
 * Formats a monetary amount into Bangladeshi Taka notation (e.g. ৳ 1,250).
 */
export function formatTaka(amount: number | string, useBanglaDigits = false): string {
  const num = typeof amount === 'string' ? parseFloat(amount) || 0 : amount;
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(num);

  if (useBanglaDigits) {
    return `৳ ${toBanglaNumber(formatted)}`;
  }

  return `৳ ${formatted}`;
}

