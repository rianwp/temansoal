/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v2/buatsoal",
        destination: "https://us-central1-temansoal.cloudfunctions.net/buatsoal",
      },
    ]
  },

}

module.exports = nextConfig
