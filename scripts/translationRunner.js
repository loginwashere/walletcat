const manageTranslations = require('react-intl-translations-manager').default

manageTranslations({
  messagesDirectory: 'translations/defaultMessages',
  translationsDirectory: 'translations/locales',
  languages: ['ru', 'uk']
})
