import React from "react"
import { useLanguage } from "../context/LanguageContext"
import { getTranslation } from "../locales"

const ContactSection = () => {
  const { language } = useLanguage()
  const t = getTranslation(language)
  const phoneDisplay = "+374 98 79 78 93"
  const phoneLink = "tel:+37498797893"
  const whatsappLink = "https://wa.me/37498797893"
  const whatsappQr =
    "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=https%3A%2F%2Fwa.me%2F37498797893"

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">{t.contact.subtitle}</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-card">
            <div className="contact-phone">
              <span className="contact-label">{t.contact.phoneLabel}</span>
              <a href={phoneLink} className="contact-phone-link">
                {phoneDisplay}
              </a>
            </div>
            <a href={whatsappLink} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">💬</span>
              {t.contact.whatsappCta}
            </a>
            <p className="contact-note">{t.contact.note}</p>
          </div>

          <div className="qr-card">
            <img
              src={whatsappQr}
              alt={t.contact.qrAlt}
              className="qr-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
