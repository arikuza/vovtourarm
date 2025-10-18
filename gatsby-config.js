module.exports = {
  pathPrefix: "/vovtourarm",
  siteMetadata: {
    title: `VOVTOURARM`,
    description: `Discover the beauty of Armenia through our exclusive tours`,
    author: `@vovtourarm`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
  ],
  
}