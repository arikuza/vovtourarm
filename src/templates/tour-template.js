import React, { useState, useEffect, useMemo } from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import { getTranslation } from "../locales"
import { tourImages, backgrounds } from "../data/image-manifest"
import "../styles/tour-page.css"

const TourTemplate = ({ pageContext }) => {
  const { tour } = pageContext
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [language, setLanguage] = useState("ru")
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    // Check for saved language preference
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'ru'
      setLanguage(savedLanguage)

      // Listen for storage changes (when language is changed in another component)
      const handleStorageChange = () => {
        const newLanguage = localStorage.getItem('preferredLanguage') || 'ru'
        setLanguage(newLanguage)
      }

      window.addEventListener('storage', handleStorageChange)

      // Custom event listener for same-window changes
      const handleLanguageChange = (e) => {
        setLanguage(e.detail)
      }
      window.addEventListener('languageChange', handleLanguageChange)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('languageChange', handleLanguageChange)
      }
    }
  }, [])

  const currentTour = tour
  const translationsData = currentTour.translations || {}
  const fallbackTranslation = translationsData.ru || {}
  const tourContent = translationsData[language] || fallbackTranslation

  const tourName =
    tourContent.name ||
    fallbackTranslation.name ||
    ""
  const heroIntro =
    tourContent.intro ||
    fallbackTranslation.intro ||
    ""
  const routeSteps =
    Array.isArray(tourContent.route) && tourContent.route.length > 0
      ? tourContent.route
      : fallbackTranslation.route || []
  const includedList =
    Array.isArray(tourContent.included) && tourContent.included.length > 0
      ? tourContent.included
      : fallbackTranslation.included || []
  const priceList =
    Array.isArray(tourContent.price) && tourContent.price.length > 0
      ? tourContent.price
      : fallbackTranslation.price || []
  const notes = tourContent.notes || fallbackTranslation.notes || ""

  const translation = getTranslation(language)
  const toursText = translation.tours
  const contactText = translation.contact

  const defaultFallbacks = [
    "/images/IMG_6169.JPG",
    "/images/IMG_6300.JPG",
    "/images/IMG_6313.JPG",
    "/images/IMG_6327.JPG"
  ]

  const fallbackPool = [...backgrounds, ...defaultFallbacks]
  const fallbackImages = fallbackPool.slice(0, 4).map((url) => ({
    url,
    title: "",
    caption: ""
  }))

  const metadataImages = Array.isArray(currentTour.images) ? currentTour.images : []
  const manifestImages = tourImages[String(currentTour.id)] || []
  const galleryImages = manifestImages.length > 0
    ? manifestImages.map((url, index) => ({
        url,
        title: metadataImages[index]?.title || "",
        caption: metadataImages[index]?.caption || ""
      }))
    : metadataImages

  const tourGalleryImages =
    galleryImages.length > 0
      ? galleryImages
      : fallbackImages

  const formatPriceAmount = (amount) => {
    if (amount === null || amount === undefined || amount === "") {
      return toursText.priceOnRequest
    }
    const numericAmount = Number(amount)
    if (Number.isFinite(numericAmount)) {
      return `${new Intl.NumberFormat(
        language === "ru" ? "ru-RU" : "en-US"
      ).format(numericAmount)} ֏`
    }
    return amount
  }

  const heroSubtitle = (() => {
    if (!heroIntro) return ""
    const sentenceEnd = heroIntro.indexOf(". ")
    if (sentenceEnd !== -1 && sentenceEnd < 180) {
      return `${heroIntro.substring(0, sentenceEnd + 1)}`
    }
    return heroIntro.length > 220
      ? `${heroIntro.substring(0, 217).trim()}...`
      : heroIntro
  })()

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? tourGalleryImages.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % tourGalleryImages.length
    )
  }

  return (
    <Layout>
      <div className="tour-page">
        <div className="tour-hero" style={{
          backgroundImage: `url(${tourGalleryImages[0].url})`
        }}>
          <div className="tour-hero-overlay" />
          <div className="tour-hero-content">
            <Link to="/#tours" className="back-link">{toursText.backToTours}</Link>
            <h1 className="tour-page-title">{tourName}</h1>
            <p className="tour-page-subtitle">{heroSubtitle}</p>
          </div>
        </div>

        <div className="tour-details-section">
          <div className="container">
            <div className="tour-info-grid">
              <div className="tour-main-content">
                <h2>{toursText.aboutTour}</h2>
                {heroIntro && <p className="tour-full-description">{heroIntro}</p>}

                {routeSteps.length > 0 && (
                  <>
                    <h3>{toursText.route}</h3>
                    <ul className="route-details">
                      {routeSteps.map((segment, index) => (
                        <li key={index}>
                          <div className="route-step-head">
                            <span className="route-step-number">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h4>{segment.title}</h4>
                          </div>
                          <p>{segment.text}</p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {includedList.length > 0 && (
                  <>
                    <h3>{toursText.included}</h3>
                    <ul className="included-list">
                      {includedList.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="tour-sidebar">
                <div className="booking-card">
                  <h3>{toursText.price}</h3>
                  <div className="tour-meta">
                    {priceList.length > 0 ? (
                      priceList.map((item, index) => (
                        <div key={index} className="meta-item">
                          <span className="meta-label">{item.type}</span>
                          <span className="meta-value">{formatPriceAmount(item.amount)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="meta-item">
                        <span className="meta-value">{toursText.priceOnRequest}</span>
                      </div>
                    )}
                    {notes && (
                      <p className="price-notes">
                        <strong>{toursText.priceNotes}:</strong>{" "}
                        {notes}
                      </p>
                    )}
                  </div>
                  {contactVisible ? (
                    <div className="tour-contact-block">
                      <div className="tour-contact-item">
                        <span className="contact-label">{contactText.phoneLabel}</span>
                        <a href="tel:+37498797893" className="contact-phone-link">
                          +374 98 79 78 93
                        </a>
                      </div>
                      <a
                        href="https://wa.me/37498797893"
                        className="whatsapp-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span aria-hidden="true">💬</span>
                        {contactText.whatsappCta}
                      </a>
                      <div className="tour-contact-qr">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https%3A%2F%2Fwa.me%2F37498797893"
                          alt={contactText.qrAlt}
                          loading="lazy"
                        />
                      </div>
                      <p className="contact-note">{contactText.note}</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="book-now-btn"
                      onClick={() => setContactVisible(true)}
                    >
                      {toursText.bookNow}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="tour-gallery">
              <h2>{toursText.gallery}</h2>
              <div className="gallery-grid">
                {tourGalleryImages.map((image, index) => (
                  <div key={index} className="gallery-image" onClick={() => openModal(index)}>
                    <img src={image.url} alt={image.title || tourName} />
                    <div className="image-caption">
                      <h4>{image.title}</h4>
                      <p>{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {modalOpen && (
          <div className="image-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <button className="modal-prev" onClick={goToPrevious}>‹</button>
              <button className="modal-next" onClick={goToNext}>›</button>
              <img 
                src={tourGalleryImages[currentImageIndex].url} 
                alt={tourGalleryImages[currentImageIndex].title}
                className="modal-image"
              />
              <div className="modal-caption">
                <h4>{tourGalleryImages[currentImageIndex].title}</h4>
                <p>{tourGalleryImages[currentImageIndex].caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default TourTemplate

export const Head = ({ pageContext }) => {
  const { tour } = pageContext
  const translationsData = tour.translations || {}
  const ruName = translationsData.ru?.name
  const enName = translationsData.en?.name
  const title = ruName || enName || "Tour"
  return <title>{title} | VOVTOURARM</title>
}
