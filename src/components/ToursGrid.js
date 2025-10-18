import React from "react"
import { Link } from "gatsby"
import { toursData } from "../data/tours-data"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"
import { tourImages, backgrounds } from "../data/image-manifest"

const ToursGrid = () => {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const tours = toursData

  return (
    <section id="tours" className="tours-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.tours.title}</h2>
          <p className="section-subtitle">{t.tours.subtitle}</p>
        </div>
        
        <div className="tours-grid">
          {tours.map((tour, index) => {
            const translations = tour.translations || {}
            const fallbackTranslation = translations.ru || {}
            const currentTranslation = translations[language] || fallbackTranslation

            const tourName =
              currentTranslation.name ||
              fallbackTranslation.name ||
              ""
            const introText =
              currentTranslation.intro ||
              fallbackTranslation.intro ||
              ""
            const priceSource = Array.isArray(currentTranslation.price) && currentTranslation.price.length > 0
              ? currentTranslation.price
              : fallbackTranslation.price || []

            const formatPriceAmount = (amount) => {
              if (!amount) {
                return ""
              }
              const numericAmount = Number(amount)
              if (Number.isFinite(numericAmount)) {
                return `${new Intl.NumberFormat(
                  language === "ru" ? "ru-RU" : "en-US"
                ).format(numericAmount)} ֏`
              }
              return amount
            }

            const priceSummary = Array.isArray(priceSource)
              ? priceSource
                  .map((item) => {
                    const amount = formatPriceAmount(item.amount)
                    return amount ? `${item.type}: ${amount}` : item.type
                  })
                  .join(" · ")
              : ""

            const manifestImages = tourImages[String(tour.id)] || []
            const selectedImage =
              manifestImages[0] ||
              (backgrounds.length > 0
                ? backgrounds[index % backgrounds.length]
                : null) ||
              "/images/IMG_6327.JPG"

            return (
              <Link
                key={tour.id}
                to={`/tours/${tour.slug}`}
                className="tour-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="tour-image-wrapper">
                  <img src={selectedImage} alt={tourName} />
                  <div className="tour-overlay">
                    <span className="tour-btn">{t.tours.viewDetails}</span>
                  </div>
                </div>
                <div className="tour-info">
                  <h3>{tourName}</h3>
                  <p>{introText}</p>
                  <div className="tour-price">
                    {priceSummary || t.tours.priceOnRequest}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ToursGrid
