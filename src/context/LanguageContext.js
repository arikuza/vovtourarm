import React, { createContext, useState, useContext, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check localStorage only on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage')
      if (savedLanguage) {
        setLanguage(savedLanguage)
      }
    }
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang)
      // Dispatch custom event for same-window updates
      window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }))
    }
  }

  // Force re-render when language changes
  const value = {
    language,
    changeLanguage,
    isClient
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}