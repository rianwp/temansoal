/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v2/buatsoal",
        destination: `${process.env.CLOUD_FUNCTIONS_URL}/buatsoal`,
      },
    ]
  },

}

module.exports = nextConfig
