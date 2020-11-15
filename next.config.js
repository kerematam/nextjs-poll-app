module.exports = {
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string' ? process.env.LOCALE_SUBPATHS : 'all',
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/questions',
  //       destination: '/',
  //       permanent: true
  //     }
  //   ]
  // }
};
