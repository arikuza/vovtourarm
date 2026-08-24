import React from "react"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import RotatingBackground from "./RotatingBackground"

const Hero = () => {
  const { language } = useLanguage()
  const t = getTranslation(language)

  return (
    <div className="hero">
      <RotatingBackground />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-description">{t.hero.description}</p>
        <button
          className="hero-cta"
          onClick={() => {
            const toursSection = document.getElementById("tours")
            if (toursSection) {
              toursSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          {t.hero.cta}
        </button>
      </div>
    </div>
  )
}

export default Hero
