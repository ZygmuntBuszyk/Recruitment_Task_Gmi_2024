import { API_URL } from '@env';

if (!API_URL) {
    throw new Error('API_URL is not defined in environment variables');
}

export const config = {
    apiUrl: API_URL,
};