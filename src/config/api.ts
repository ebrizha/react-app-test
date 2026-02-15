const runtimeBaseUrl =
  typeof window !== 'undefined' && window.__ENV__?.REACT_APP_API_URL
    ? window.__ENV__.REACT_APP_API_URL
    : '';

const rawBaseUrl = runtimeBaseUrl || process.env.REACT_APP_API_URL || '';

const sanitizeBaseUrl = (value: string): string => value.replace(/\/+$/, '');

export const apiConfig = {
  baseUrl: sanitizeBaseUrl(rawBaseUrl),
};
