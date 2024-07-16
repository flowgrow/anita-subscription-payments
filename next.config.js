module.exports = {
  async headers() {
    return [
      {
        source: '/assets/*.woff2',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
}