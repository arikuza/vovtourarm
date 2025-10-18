import React, { useState, useEffect } from "react"
import { withPrefix } from "gatsby"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import { backgrounds as backgroundImages } from "../data/image-manifest"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const t = getTranslation(language)

  const fallbackBackgrounds = [
    withPrefix("/images/IMG_6327.JPG"),
    withPrefix("/images/IMG_6313.JPG"),
    withPrefix("/images/IMG_5357.JPG")
  ]
  const availableBackgrounds =
    backgroundImages.length > 0 ? backgroundImages.map(img => withPrefix(img)) : fallbackBackgrounds

  const heroMessages = [
    {
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      description: t.hero.description
    },
    {
      title: language === "ru" ? "Священные горы" : "Sacred Mountains",
      subtitle: language === "ru" ? "Монастыри в облаках" : "Monasteries in the Clouds",
      description:
        language === "ru"
          ? "Путешествие через тысячелетия духовной архитектуры"
          : "Journey through millennia of spiritual architecture"
    },
    {
      title: language === "ru" ? "Озеро Севан" : "Lake Sevan",
      subtitle: language === "ru" ? "Голубая жемчужина" : "The Blue Pearl",
      description:
        language === "ru"
          ? "Одно из крупнейших высокогорных озёр мира"
          : "One of the world's largest high-altitude lakes"
    }
  ]
  
  const slides = heroMessages.map((message, index) => ({
    image: availableBackgrounds[index % availableBackgrounds.length],
    ...message
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">{slide.title}</h1>
            <h2 className="hero-subtitle">{slide.subtitle}</h2>
            <p className="hero-description">{slide.description}</p>
            <button className="hero-cta">{t.hero.cta}</button>
          </div>
        </div>
      ))}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
