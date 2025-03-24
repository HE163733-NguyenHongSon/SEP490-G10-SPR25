// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['via.placeholder.com','th.bing.com'], 
    },
    async redirects() {
        return [
          {
            source: '/', 
            // destination: '/patient', 
            destination: '/admin', 
            permanent: false, 
          },
        ]
      },
  };
  
  export default nextConfig;
  