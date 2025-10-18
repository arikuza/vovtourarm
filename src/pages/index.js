import React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import ToursGrid from "../components/ToursGrid"
import FeaturedSection from "../components/FeaturedSection"
import ContactSection from "../components/ContactSection"
import "../styles/global.css"

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <ToursGrid />
      <FeaturedSection />
      <ContactSection />
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>VOVTOURARM - Discover the Land of Ancient Heritage</title>
