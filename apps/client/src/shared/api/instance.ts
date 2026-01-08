import axios from 'axios';

import { SentryInterceptor } from './interceptors/sentry.interceptor';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const api = SentryInterceptor(instance);
