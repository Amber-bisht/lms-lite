# Why Mobile Performance Dropped (92 → 78)

## 🔴 Critical Issue: **LCP 5.9s** (Should be < 2.5s)

### Why Desktop is 98 but Mobile is 78:

| Metric | Mobile | Desktop | Issue |
|--------|--------|---------|-------|
| **LCP** | **5.9s** ❌ | ~1.5s ✅ | Hero image loading slow on mobile |
| **FCP** | 1.1s ✅ | 0.3s ✅ | Good |
| **TBT** | 70ms ✅ | 50ms ✅ | Good |
| **SI** | 2.9s ⚠️ | ~0.8s ✅ | Slow on mobile |

### Why Mobile Suffers More:

1. **Slow 4G Throttling** (Lighthouse default)
   - Desktop: Fast 3G or better
   - Mobile: Slow 4G (1.6 Mbps down, 750 Kbps up)
   - **Result:** Large bundles hurt mobile 10x more

2. **CPU Throttling**
   - Desktop: 4x slowdown
   - Mobile: 6x slowdown (weaker processors)
   - **Result:** JavaScript parsing/execution slower

3. **246 KiB Unused JavaScript** 
   - hls.js (156 KiB) still loading on homepage
   - React-DOM (39 KiB) with 13 KiB unused
   - **Impact:** Mobile can't handle this load

4. **GTM Loading 139 KiB** (55 KiB unused)
   - Blocks main thread on mobile
   - Desktop can parse it faster

## ✅ What We Fixed (But Need to Rebuild):

1. ✅ Dynamic import for hls.js (saves 156 KiB)
2. ✅ Hero image `fetchpriority="high"` + sizes
3. ✅ `.browserslistrc` for modern browsers (saves 14 KiB)

**BUT:** Build hasn't completed yet, so fixes aren't deployed!

## 🔧 What Still Needs Fixing:

### 1. Rebuild Project (CRITICAL)
```bash
npm run build
npm start
```

### 2. Delay GTM Loading (Save 55 KiB, improve LCP)
Currently GTM loads immediately with `strategy="afterInteractive"`. 
We need to delay it or load on user interaction.

### 3. Verify hls.js Dynamic Import Works
Check if it's actually code-split or still in main bundle.

## 📊 Expected After Fixes:

| Metric | Current | Target | Expected |
|--------|---------|--------|----------|
| LCP | 5.9s | < 2.5s | ~2.5s |
| Bundle | 248 KiB | -200 KiB | ~48 KiB |
| Performance | 78 | > 90 | ~92-95 |

## 🎯 Action Items:

1. **REBUILD** - Most important! Fixes won't work until rebuild
2. **Test** - Run Lighthouse again after rebuild
3. **GTM Delay** - Load GTM after 3s or on user interaction
4. **Verify** - Check Network tab to confirm hls.js isn't loading on homepage

