import type { StringLiteralUnion, ThemeRegistrationAny } from 'shiki/types.mjs';

// DOMAIN: Shiki

export interface ShikiCodeProps {
  codeTheme?: ThemeRegistrationAny | StringLiteralUnion<any>;
  language?: string;
  code: string;
}
