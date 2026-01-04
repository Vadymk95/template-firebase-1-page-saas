/**
 * i18n Constants
 *
 * Supported languages and namespaces configuration
 */

export const SUPPORTED_LANGUAGES = ['en'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * Namespaces to load on initial mount
 * - common: UI elements, buttons, general phrases
 * - errors: API/HTTP/validation errors
 * - home: HomePage content (default route)
 */
export const DEFAULT_NAMESPACES = ['common', 'errors', 'home'] as const;

/**
 * Additional namespaces loaded on demand (lazy-loaded)
 */
const LAZY_NAMESPACES = ['feedback'] as const;

/**
 * All available namespaces in the application
 * Dynamically created from DEFAULT_NAMESPACES + LAZY_NAMESPACES
 * Used for test setup and complete i18n initialization
 */
export const ALL_NAMESPACES = [...DEFAULT_NAMESPACES, ...LAZY_NAMESPACES] as const;

/**
 * Default namespace (first namespace from DEFAULT_NAMESPACES)
 * Backward compatibility alias for cleaner code
 */
export const DEFAULT_NAMESPACE = DEFAULT_NAMESPACES[0];

export type Namespace = (typeof ALL_NAMESPACES)[number];

export const LOAD_PATH = '/locales/{{lng}}/{{ns}}.json';

export const LOCALES_DIR = 'locales';

export const I18N_STORAGE_KEY = 'i18nextLng';

export const I18N_LOAD_MODE = 'languageOnly';

export const I18N_HMR_EVENT = 'i18n-reload';

export const I18N_ERROR_MESSAGE = '[i18n] Failed to reload translations:';
