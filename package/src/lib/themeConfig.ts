/**
 * Seasonal / Holiday Theme Configuration
 *
 * Set NEXT_PUBLIC_THANKSGIVING_THEME="false" in .env.local to disable,
 * or flip THANKSGIVING_THEME_DEFAULT below.
 */
const THANKSGIVING_THEME_DEFAULT = true;

export function isThanksgivingThemeEnabled(): boolean {
  const envFlag = process.env.NEXT_PUBLIC_THANKSGIVING_THEME;
  if (envFlag === "false" || envFlag === "0") return false;
  if (envFlag === "true" || envFlag === "1") return true;
  return THANKSGIVING_THEME_DEFAULT;
}

