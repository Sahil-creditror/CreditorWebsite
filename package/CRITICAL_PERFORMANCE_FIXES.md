# Critical Performance Fixes - Home Page

## Issues Identified
- **LCP: 25.6s** (Target: <2.5s) - CRITICAL
- **FCP: 1.8s** (Acceptable but can improve)
- **TBT: 4,210ms** (Target: <200ms) - CRITICAL
- **Speed Index: 12.2s** (Very high)
- **Total Network Payload: 37,524 KiB** (Enormous)

## Root Causes
1. Hero video loading with `preload="auto"` - downloading entire video upfront
2. Courses component loaded synchronously with heavy Swiper library
3. No code splitting for heavy client components
4. Large JavaScript bundles blocking main thread
5. Video files likely very large (contributing to 37MB payload)

## Fixes Implemented

### 1. Hero Video Optimization ✅
**File:** `package/src/app/components/home/hero/index.tsx`

**Changes:**
- Changed video `preload` from `"auto"` to `"metadata"` for first video, `"none"` for others
- Added poster image as primary LCP element using Next.js Image component
- Video fades in when ready, poster fades out
- Poster image loads immediately with `priority={true}` for first slide

**Impact:**
- LCP now measures poster image (~200KB) instead of video (potentially 10MB+)
- Video loads in background without blocking render
- Expected LCP reduction: **~20-23 seconds**

```tsx
// Poster image loads immediately
<Image
  src={videos[currentIndex].poster}
  fill
  priority={currentIndex === 0}
  quality={85}
/>

// Video loads lazily
<video
  preload={currentIndex === 0 ? "metadata" : "none"}
  onCanPlay={(e) => {
    // Fade in video when ready
  }}
/>
```

### 2. Dynamic Component Loading ✅
**File:** `package/src/app/page.tsx`

**Changes:**
- Made Courses component dynamic with `ssr: false`
- All below-the-fold components now use dynamic imports
- Added `ssr: false` to heavy client components (Swiper, animations)

**Impact:**
- Reduces initial JavaScript bundle by ~300-500KB
- Courses component (with Swiper) loads only when needed
- Expected TBT reduction: **~2-3 seconds**

```tsx
const Courses = dynamic(() => import("./components/home/courses"), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: false, // Disable SSR for heavy component with Swiper
});
```

### 3. Webpack Code Splitting ✅
**File:** `package/next.config.ts`

**Changes:**
- Added custom webpack configuration for better chunk splitting
- Separated framework (React) from other libraries
- Optimized package imports for icon libraries

**Impact:**
- Better code splitting reduces initial bundle size
- Framework code cached separately
- Expected bundle size reduction: **~200-400KB**

### 4. Layout Optimizations ✅
**File:** `package/src/app/layout.tsx`

**Changes:**
- Removed video preload (using poster as primary)
- Changed video preload to DNS prefetch only
- Kept poster image preload with high priority

**Impact:**
- Reduces initial network requests
- Focuses browser on critical LCP element (poster image)

### 5. Image Dimensions ✅
**Status:** All images using `fill` have explicit container dimensions
- Hero poster: Container has `absolute inset-0` with explicit parent dimensions
- Course cards: `aspect-[1/1]` containers
- All other images have explicit width/height

## Expected Performance Improvements

### Before → After
- **LCP:** 25.6s → **<2.5s** (90% improvement)
- **FCP:** 1.8s → **<1.5s** (17% improvement)
- **TBT:** 4,210ms → **<500ms** (88% improvement)
- **Speed Index:** 12.2s → **<3s** (75% improvement)
- **Initial Bundle:** ~2MB → **<800KB** (60% reduction)

## Additional Recommendations

### 1. Video Compression (Manual Action Required)
The 37MB total payload suggests videos are very large. Consider:
- Compress hero videos to <5MB each
- Use WebM format for better compression
- Consider using lower quality for mobile devices
- Use video CDN for better delivery

**Tools:**
- FFmpeg: `ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm`
- HandBrake for GUI compression
- Cloudflare Stream for video CDN

### 2. Image Optimization (Manual Action Required)
- Convert all PNG images to WebP
- Compress hero images to <200KB
- Use responsive images with proper `srcset`

### 3. Further JavaScript Optimization
- Consider lazy loading Framer Motion animations
- Use `will-change` CSS property for animated elements
- Consider replacing heavy libraries with lighter alternatives

### 4. Server-Side Optimizations
- Enable HTTP/2 or HTTP/3
- Use CDN for static assets
- Enable Brotli compression
- Optimize TTFB (Time to First Byte)

## Testing Checklist

After deployment, test:
- [ ] Run Lighthouse audit (target: 90+ Performance score)
- [ ] Test on real mobile device (3G connection)
- [ ] Verify LCP < 2.5s in PageSpeed Insights
- [ ] Check TBT < 200ms
- [ ] Verify video plays smoothly after poster loads
- [ ] Test with slow 3G throttling
- [ ] Monitor Core Web Vitals in Google Search Console

## Monitoring

Monitor these metrics:
1. **LCP:** Should be <2.5s (good), <4s (needs improvement)
2. **FCP:** Should be <1.8s
3. **TBT:** Should be <200ms
4. **CLS:** Should be <0.1
5. **Speed Index:** Should be <3.4s

## Files Modified

1. `package/src/app/page.tsx` - Dynamic imports
2. `package/src/app/components/home/hero/index.tsx` - Video optimization
3. `package/src/app/layout.tsx` - Resource hints
4. `package/next.config.ts` - Webpack optimization

## Notes

- All changes are backward compatible
- Video will still autoplay, just loads more efficiently
- Poster image provides immediate visual feedback
- No breaking changes to functionality

