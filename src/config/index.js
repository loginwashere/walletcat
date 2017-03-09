export const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL
export const API_URL = process.env.REACT_APP_API_URL || `${PUBLIC_URL}api/`
export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID

export const LOCALE_EN = 'en'
export const LOCALE_RU = 'ru'
export const LOCALE_UK = 'uk'
export const DEFAULT_LOCALE = process.env.REACT_APP_DEFAULT_LOCALE || LOCALE_EN

export const LOCALE_LIST = {
  LOCALE_EN,
  LOCALE_RU,
  LOCALE_UK
}

export default {
  API_URL,
  LOCALE_LIST
}