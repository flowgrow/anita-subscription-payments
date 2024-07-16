module.exports = {
  async headers() {
    return [
      {
        source: '/assets/:all*(.woff2|.woff|.ttf|.eot|.svg)',
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