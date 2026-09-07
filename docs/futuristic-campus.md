# Gent innovation campus — September 7, 2026

## Implementation

Preserves the current hero, Louisiana opening, shared GSAP stage, native mobile flow, chapter navigation, product tabs, accessibility cleanup and prelaunch product/membership status.

- Scene 02: private glass R&D lab; four stations explain source, develop, vet and approve.
- Scene 03: robotic development/reveal chamber and the existing separate Legacy Reserve package; explicit coffee, food, beverage, supplement and lifestyle horizon.
- Scene 04: automated logistics and world-network environment; Louisiana origin, national direction and global ambition; new black-metal transit case replaces walnut.
- Scene 05: contemporary green/glass members atrium, product discovery and private access. The closing scene shares this architecture.
- Related coffee and partner pages use the same new rooms.
- Restrained #C4912F accents, graphite/glass materials, localized text shading and clearer architectural lighting.
- Decorative data bars, route nodes and a light sweep scrub alongside existing room, foreground and object transforms. No additional animation library, timer, canvas or per-frame React state.
- Mobile camera uses the existing shared room plane with intentional right-side crop. Compact overlays avoid the package; persistent controls occupy a strip below the header. Touch controls retain a 44px minimum.
- Reduced motion and user pause restore a readable document and static interfaces. No-JavaScript content remains available.

## Assets and generation

Built-in image generation was used. Four 1536×1024 rooms were converted to WebP at quality 82; the transparent case was resized to 720px and converted at quality 85. Original files remain in the Codex generated-images folder. Website assets live in `public/images/cinema/`:

| Asset | Bytes |
| --- | ---: |
| innovation-lab.webp | 159584 |
| reveal-chamber.webp | 183482 |
| distribution-center.webp | 213168 |
| private-network.webp | 228108 |

Next Image delivers responsive variants with lazy loading, small refreshed blur placeholders and existing adjacent-scene warming. These images are illustrative brand environments, not a representation of an operational facility or live network. Product packaging and membership remain in development.

## Generation prompts

### Lab
Create a photorealistic architectural campaign image for Gent Distribution Co, a futuristic premium product development and distribution company. Wide landscape 1536x1024. Same coherent ultra-advanced innovation campus: obsidian precision-machined metal, glass, polished graphite stone, restrained luxury gold #C4912F light strips, occasional deep masculine green, clear bright dimensional architectural lighting. Sophisticated masculine luxury, believable next-generation technology. No rustic wood, vintage machinery, brown/sepia grading, dusty warehouse, roastery nostalgia, speakeasy, neon cyberpunk or gloomy darkness. No captions, no watermark. Composition: architecture and key subjects in center/right; left side calmer for website copy, but still illuminated. SCENE 02 PRODUCT DEVELOPMENT LAB. Spectacular glass-walled private R&D lab, precision analytical instruments, robotic formulation arm, ingredient sample capsules, digital analytical glass screens, immaculate black stone island. Sourcing, testing and approval visual story. Central-right main laboratory island and floor-to-ceiling atrium beyond, bright neutral daylight with controlled warm-gold accents. Not a hospital. No large product packaging.

### Reveal
Photorealistic futuristic luxury Gent product reveal chamber, landscape 1536x1024. Obsidian precision black metal, polished graphite stone, glass, restrained gold #C4912F light strips, bright clear dimensional daylight. Empty illuminated circular stone pedestal centered at 68% across, top surface at 70% down for a separate package layer. Robotic packaging arms behind glass, crisp vertical architectural light, distant display of bottles, food tins, supplements and lifestyle goods. Wide campaign architecture shot. Left third calmer for website copy. Sophisticated masculine advanced innovation campus. NO foreground package, rustic wood, vintage machinery, coffee beans, old roastery, sepia, gloom, cyberpunk, text or watermark.

### Distribution
Photorealistic futuristic Gent Distribution Co intelligent distribution command center. Landscape 1536x1024. Spectacular contemporary glass innovation campus, obsidian precision black metal, polished graphite stone, restrained warm gold #C4912F light strips, bright clear neutral daylight. Automated conveyors carrying matte black packages with small gold bands, precision shelving, advanced robot arms. Glass digital world-network visualization in upper right. Two small contemporary makers/engineers collaborating at a control desk convey human partnership. Architectural vanishing point at center-right. Left third quieter for website copy. Luxury masculine cinematic future-facing company, optimistic and sophisticated. NO old warehouse, rustic wood, vintage equipment, sepia brown, dim gloom, neon cyberpunk, captions or watermark.

### Community
Photorealistic future-luxury private members product-discovery atrium for Gent Distribution Co. Landscape 1536x1024. Same advanced innovation campus: soaring contemporary glass, precision obsidian metal, polished graphite stone, restrained luxury gold #C4912F light strips, deep green modern seating and living greenery. Elegant sculptural black stone table center-right with clear surface, refined futuristic product display niches and intelligent glass surfaces. A few elegantly dressed contemporary people connecting in the distance. Clear bright daylight and warm architectural lighting, sophisticated masculine premium inviting optimistic mood. Wide architectural campaign image, left third quieter for website copy. No cigar club, speakeasy, rustic wood, retro furniture, brown sepia, darkness, captions or watermark.

### Case
Generate a single premium Gent Distribution Co transit case isolated on genuinely transparent background, landscape 3:2 composition. Perspective view from slightly above, top front and right side visible. A low rectangular precision-machined OBSIDIAN BLACK METAL shipping/sample case with a restrained thin gold #C4912F band and very small elegant GENT lettering, no other text. Photorealistic product cutout, clean beveled edges, refined satin material, flush latches, controlled neutral highlights, fully visible with margin. No wood grain, leather, wax seals, vintage trunk, handles protruding, distressed finish, floor, scenery or cast background. Silhouette proportions width 1.8 times height.

## Reference limitation
The referenced ChatGPT task exposed four old screenshots but did not expose the approved generated composite. Implementation follows the detailed approved direction in the current request; no claim of a pixel match to an unavailable image.

## Validation

- Final ESLint and Next.js production build passed; all 11 static pages generated.
- Full production-build browser suite: 39 of 40 passed on the first production run. The 768px navigation test exposed a delayed initial-hash reconciliation race; constrained reconciliation to the original incoming hash. The previously failing test passed three consecutive production-build repetitions after the fix.
- All 12 focused material/campus tests passed in Chromium and WebKit, covering 320px, 390px, 768px and 1440px, new asset loading, reduced motion and unobstructed membership CTA hit testing.
- Full suite also exercised 1024px, landscape, scene stepping/reversal, direct links, keyboard tabs, no JavaScript, user motion preferences, product routes and hero preservation.
- Inspected desktop and iPhone-sized WebKit screenshots of Scenes 02–05; checked linked coffee detail presentation. Local captures are in docs/campus-review (not bundled into site assets).
- New decorative data motion verified against real scroll progression. No new runtime dependency was added.
- Earlier concurrent development-server checks had two timeout failures; both passed isolated reruns. Production validation used one worker.
- Testing uses browser emulation, not a physical iPhone.
