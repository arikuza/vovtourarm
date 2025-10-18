import { ru } from './ru'
import { en } from './en'

export const translations = {
  ru,
  en
}

export const getTranslation = (language) => {
  return translations[language] || translations.ru
}