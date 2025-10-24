/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'm.media-amazon.com',
            'images.unsplash.com',
            'unsplash.com',
            'plus.unsplash.com'
            // Add any other external image hosts here (e.g., 'cdn.shopify.com', 'fakestoreapi.com')
        ],
    },
};

export default nextConfig;
