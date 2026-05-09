import React, { useState, useEffect } from "react"
import { withPrefix } from "gatsby"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import { backgrounds as backgroundImages } from "../data/image-manifest"

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const t = getTranslation(language)
  const localizedHeroSlides = {
    ru: [
      {
        title: "Священные горы",
        subtitle: "Монастыри в облаках",
        description: "Путешествие через тысячелетия духовной архитектуры"
      },
      {
        title: "Озеро Севан",
        subtitle: "Голубая жемчужина",
        description: "Одно из крупнейших высокогорных озёр мира"
      }
    ],
    en: [
      {
        title: "Sacred Mountains",
        subtitle: "Monasteries in the Clouds",
        description: "Journey through millennia of spiritual architecture"
      },
      {
        title: "Lake Sevan",
        subtitle: "The Blue Pearl",
        description: "One of the world's largest high-altitude lakes"
      }
    ],
    "zh-CN": [
      {
        title: "圣山",
        subtitle: "云端修道院",
        description: "穿越千年的精神建筑遗产"
      },
      {
        title: "塞凡湖",
        subtitle: "蓝色明珠",
        description: "世界上最大的高山湖泊之一"
      }
    ]
  }

  const fallbackBackgrounds = [
    withPrefix("/images/IMG_6327.JPG"),
    withPrefix("/images/IMG_6313.JPG"),
    withPrefix("/images/IMG_5357.JPG")
  ]
  const availableBackgrounds =
    backgroundImages.length > 0 ? backgroundImages.map(img => withPrefix(img)) : fallbackBackgrounds

  const additionalHeroSlides =
    localizedHeroSlides[language] || localizedHeroSlides.ru
  const heroMessages = [
    {
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      description: t.hero.description
    }
  ].concat(additionalHeroSlides)
  
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
