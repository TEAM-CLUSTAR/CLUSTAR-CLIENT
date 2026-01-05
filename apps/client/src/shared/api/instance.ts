import { createClient } from '@cds/api';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = createClient(BASE_URL);
