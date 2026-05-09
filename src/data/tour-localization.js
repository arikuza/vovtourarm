import { zhCNTourTranslations } from "./tour-translations-zh-CN"

export const getTourContent = (tour, language) => {
  const translations = tour.translations || {}
  const fallbackTranslation = translations.ru || {}

  if (language === "zh-CN") {
    return zhCNTourTranslations[tour.id] || fallbackTranslation
  }

  return translations[language] || fallbackTranslation
}

export const getIntlLocale = (language) => {
  if (language === "ru") return "ru-RU"
  if (language === "zh-CN") return "zh-CN"
  return "en-US"
}
