/**
 * Seasonal / Holiday Theme Configuration
 *
 * Temporarily disabled per instructions.
 * To re-enable the Thanksgiving theme in the future:
 * Set THANKSGIVING_THEME_DEFAULT = true, or set NEXT_PUBLIC_THANKSGIVING_THEME="true" in .env.local
 */
const THANKSGIVING_THEME_DEFAULT = false;

export function isThanksgivingThemeEnabled(): boolean {
  const envFlag = process.env.NEXT_PUBLIC_THANKSGIVING_THEME;
  if (envFlag === "false" || envFlag === "0") return false;
  if (envFlag === "true" || envFlag === "1") return true;
  return THANKSGIVING_THEME_DEFAULT;
}

