import { useSyncExternalStore } from 'react';

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (onMediaQueryChange) => {
      const mediaQueryList = window.matchMedia(query);

      mediaQueryList.addEventListener('change', onMediaQueryChange);

      return () =>
        mediaQueryList.removeEventListener('change', onMediaQueryChange);
    },
    () => window.matchMedia(query).matches,
  );
