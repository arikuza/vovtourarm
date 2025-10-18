import React from "react"
import Navigation from "./Navigation"
import { LanguageProvider } from "../context/LanguageContext"

const Layout = ({ children }) => {
  return (
    <LanguageProvider>
      <div className="layout">
        <Navigation />
        <main>{children}</main>
      </div>
    </LanguageProvider>
  )
}

export default Layout