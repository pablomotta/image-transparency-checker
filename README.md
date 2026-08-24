# image-transparency-checker

Detects whether an image has a transparent background by inspecting its pixels,
and pads the layout differently depending on the answer.

The use case is product imagery: a cut-out PNG on a transparent background wants
horizontal padding so it doesn't touch the edges of its container, while a
full-bleed photograph should sit flush. Rather than tagging each asset by hand,
this reads the image and decides.

## How it works

The image is drawn to an off-screen `<canvas>`, then `getImageData` returns a
flat `Uint8ClampedArray` of RGBA bytes. Every fourth byte is the alpha channel,
so the check walks the array from index 3 in steps of 4 and stops at the first
value below 255:

```js
for (let i = 3; i < pixels.length; i += 4) {
  if (pixels[i] < 255) { hasTransparency = true; break; }
}
```

Breaking on the first hit means a mostly-transparent image costs almost
nothing; the worst case is a fully opaque one, which reads every pixel.

The canvas is loaded with `crossOrigin = 'Anonymous'`, which the remote host
must answer with permissive CORS headers — without them the canvas is tainted
and `getImageData` throws a security error rather than returning data.

## Running it

```bash
npm install
npm run dev
```

`npm run build` type-checks with `vue-tsc` and builds; `npm run preview` serves
the build.

## Notes

The sample images are three hardcoded Shopify CDN URLs in `src/App.vue` — swap
them for your own. The component uses the Options API rather than
`<script setup>`.

## Stack

Vue 3 · TypeScript · Vite · Tailwind CSS
