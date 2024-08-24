export const themeConfig = {
  defaultTheme: 'dark',
  storageKey: 'vite-ui-theme',
} as const;

export type ThemeConfig = typeof themeConfig;
