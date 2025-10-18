import React, { useMemo } from "react"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import { backgrounds } from "../data/image-manifest"

const FeaturedSection = () => {
  const { language } = useLanguage()
  const t = getTranslation(language)

  const backgroundImage = useMemo(() => {
    return backgrounds[0] || "/images/IMG_6401.JPG"
  }, [])

  const features = [
    {
      icon: "👨‍🏫",
      title: t.featured.experience.title,
      description: t.featured.experience.description
    },
    {
      icon: "🚗",
      title: t.featured.comfort.title,
      description: t.featured.comfort.description
    },
    {
      icon: "⭐",
      title: t.featured.custom.title,
      description: t.featured.custom.description
    },
    {
      icon: "💰",
      title: t.featured.value.title,
      description: t.featured.value.description
    }
  ]

  return (
    <section id="featured" className="featured-section">
      <div className="parallax-bg" style={{
        backgroundImage: `url(${backgroundImage})`
      }}>
        <div className="parallax-overlay" />
      </div>
      
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.featured.title}</h2>
          <p className="section-subtitle">{t.featured.subtitle}</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
