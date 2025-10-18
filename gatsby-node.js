const path = require("path")
const { toursData } = require("./src/data/tours-data")

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  const tourTemplate = path.resolve(`src/templates/tour-template.js`)

  toursData.forEach(tour => {
    createPage({
      path: `/tours/${tour.slug}`,
      component: tourTemplate,
      context: {
        tour: tour
      }
    })
  })
}
