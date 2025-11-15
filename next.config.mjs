/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/thanksforsubscribing.html',
          destination: '/thanksforsubscribing',
          permanent: true, 
        },
      ];
    },
  };
  
  export default nextConfig;
  