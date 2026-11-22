import { type ReactNode } from 'react';

import '../styles/reset.css';
import { themeClass } from '../styles/theme.css';

// @TODO createTheme 제거 후 삭제 (reset.css import는 다른 곳으로 이동)
export function ThemeProvider({
  theme,
  className,
  children,
}: {
  children: ReactNode;
  theme?: string;
  className?: string;
}) {
  return (
    <div className={`${theme ?? themeClass} ${className}`}>{children}</div>
  );
}
