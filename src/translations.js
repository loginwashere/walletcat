import { LOCALE_RU, LOCALE_UK, LOCALE_EN } from './config'

import ruMessages from '../translations/locales/ru'
import ukMessages from '../translations/locales/uk'

const localeMessages = {
  [LOCALE_EN]: null,
  [LOCALE_RU]: ruMessages,
  [LOCALE_UK]: ukMessages
}

export default localeMessages


