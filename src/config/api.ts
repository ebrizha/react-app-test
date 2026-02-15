const rawBaseUrl = process.env.REACT_APP_API_URL || '';

const sanitizeBaseUrl = (value: string): string => value.replace(/\/+$/, '');

export const apiConfig = {
  baseUrl: sanitizeBaseUrl(rawBaseUrl),
};

