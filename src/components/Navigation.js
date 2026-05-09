import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import { ChinaFlag, RussiaFlag, UKFlag } from "./FlagIcons"

const languageOptions = [
  { code: "ru", label: "RU", ariaLabel: "Русский", Flag: RussiaFlag },
  { code: "en", label: "EN", ariaLabel: "English", Flag: UKFlag },
  { code: "zh-CN", label: "中文", ariaLabel: "简体中文", Flag: ChinaFlag }
]

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
          {languageOptions.map(({ code, label, ariaLabel, Flag }) => (
            <button
              key={code}
              className={`lang-btn ${language === code ? 'active' : ''}`}
              onClick={() => changeLanguage(code)}
              aria-label={ariaLabel}
            >
              <Flag />
              <span>{label}</span>
            </button>
          ))}
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
          {languageOptions.map(({ code, label, ariaLabel, Flag }) => (
            <button
              key={code}
              className={`lang-btn ${language === code ? 'active' : ''}`}
              onClick={() => {
                changeLanguage(code)
                setMenuOpen(false)
              }}
              aria-label={ariaLabel}
            >
              <Flag />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
