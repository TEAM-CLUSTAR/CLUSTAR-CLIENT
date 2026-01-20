export const appConfig = {
  auth: {
    //@TODO 로그인 관련
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  },
} as const;
