# Cloudflare CDN Configuration

This project is configured to work with Cloudflare CDN for optimal image delivery and performance.

## Image Optimization

- Next.js Image Optimization is enabled in `next.config.ts`
- Images are automatically optimized and served in WebP/AVIF format when supported
- Cloudflare will automatically cache optimized images at the edge

## Setup Instructions

1. **Deploy to Cloudflare Pages:**
   - Connect your repository to Cloudflare Pages
   - Build command: `npm run build` or `yarn build`
   - Output directory: `.next`

2. **Cloudflare Image Resizing (Optional):**
   - Enable Cloudflare Image Resizing in your Cloudflare dashboard
   - This provides additional image optimization at the edge

3. **Cache Configuration:**
   - Cloudflare will automatically cache static assets including optimized images
   - Cache-Control headers are set by Next.js automatically

## Performance Benefits

- **Faster Load Times:** Images served from Cloudflare's global edge network
- **Automatic Optimization:** Next.js optimizes images on-the-fly
- **WebP/AVIF Support:** Modern formats for smaller file sizes
- **Lazy Loading:** Below-the-fold images load only when needed

## Notes

- Hero/banner images use `priority` for above-the-fold content
- Below-the-fold images use `loading="lazy"` for better performance
- All images should be in WebP format when possible for best compression

