/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ashique.digital',
  generateRobotsTxt: true,
  exclude: ['/api/*', '/studio/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      // Add other sitemaps here if any
    ],
  },
}
