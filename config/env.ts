import dotenv from 'dotenv';
import path from 'path';

// Charge le .env s'il existe
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const BASE_URL = process.env.BASE_URL || 'https://practicesoftwaretesting.com';
export const API_URL = process.env.API_URL || 'https://api.practicesoftwaretesting.com';

export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || '',
  password: process.env.ADMIN_PASSWORD || '',
};