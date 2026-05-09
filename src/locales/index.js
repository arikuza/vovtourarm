import { ru } from './ru'
import { en } from './en'
import { zhCN } from './zh-CN'

export const translations = {
  ru,
  en,
  "zh-CN": zhCN
}

export const getTranslation = (language) => {
  return translations[language] || translations.ru
}
