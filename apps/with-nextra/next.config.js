const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
  unstable_staticImage: true,
})

module.exports = withNextra({
  async redirects() {
    return [
    {
      source: '/sudoers',
      destination: 'https://raw.githubusercontent.com/j5pu/sudoers/main/sudoers',
      permanent: true,
    },
    ]
  }
});
