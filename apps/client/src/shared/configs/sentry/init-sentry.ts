import * as Sentry from '@sentry/react';
import { HTTPError } from 'ky';

import { HTTP_STATUS_CODE } from '@shared/constants/HTTP_STATUS_CODE';

const IGNORED_STATUS_SET = new Set<number>([
  HTTP_STATUS_CODE.UNAUTHORIZED,
  HTTP_STATUS_CODE.FORBIDDEN,
  HTTP_STATUS_CODE.NOT_FOUND,
]);

const InitSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    enabled: import.meta.env.PROD,
    sendDefaultPii: false,
    beforeSend(event, hint) {
      const error = hint?.originalException;
      if (error instanceof HTTPError) {
        const status = error.response?.status;
        if (status && IGNORED_STATUS_SET.has(status)) {
          return null;
        }
      }

      return event;
    },
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
};

export default InitSentry;
