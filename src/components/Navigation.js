import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import { RussiaFlag, UKFlag } from "./FlagIcons"

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { language, changeLanguage } = useLanguage()
  const t = getTranslation(language)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className="logo">VOVTOURARM</h1>
          </Link>
        </div>
        
        <ul className="nav-menu">
          <li><Link to="/">{t.nav.home}</Link></li>
          <li><Link to="/#tours">{t.nav.tours}</Link></li>
          <li><Link to="/#featured">{t.nav.about}</Link></li>
          <li><Link to="/#contact">{t.nav.contact}</Link></li>
        </ul>

        <div className="language-switcher">
          <button 
            className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
            onClick={() => changeLanguage('ru')}
            aria-label="Русский"
          >
            <RussiaFlag />
            <span>RU</span>
          </button>
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
            aria-label="English"
          >
            <UKFlag />
            <span>EN</span>
          </button>
        </div>

        <button 
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>{t.nav.home}</Link></li>
          <li><Link to="/#tours" onClick={() => setMenuOpen(false)}>{t.nav.tours}</Link></li>
          <li><Link to="/#featured" onClick={() => setMenuOpen(false)}>{t.nav.about}</Link></li>
          <li><Link to="/#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</Link></li>
        </ul>
        <div className="mobile-language-switcher">
          <button 
            className={`lang-btn ${language === 'ru' ? 'active' : ''}`}
            onClick={() => {
              changeLanguage('ru')
              setMenuOpen(false)
            }}
          >
            <RussiaFlag />
            <span>RU</span>
          </button>
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => {
              changeLanguage('en')
              setMenuOpen(false)
            }}
          >
            <UKFlag />
            <span>EN</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
