# Design QA — Interactive Ovi 404 Page

- Source visual truth: latest user-provided full-width 404 placement reference in the conversation, refined by the request for shared site chrome, separate image elements, and subtle motion.
- Brand grounding: the shared header and footer from `about-ovi-design-academy-chennai.html`, existing `styles.css` tokens, Space Grotesk/Inter typography, and the Ovi logo.
- Implementation: `404.html`, the final 404 styles in `styles.css`, and five layered image assets under `image/ovi-404-*.png`.
- Implementation screenshot: unavailable because no in-app or connected browser surface was available.
- Intended desktop viewport: 1440 × 900 CSS pixels at 1× density.
- Intended mobile viewport: 390 × 844 CSS pixels at 1× density.
- Source pixels: 2048 × 1153 as supplied in the conversation.
- Generated asset pixels: 404 sculpture 1536 × 1024; astronaut 1254 × 1254; tools 1254 × 1254; direction sign 1254 × 1254; moon foreground 1672 × 941.
- Implementation pixels and density normalization: unavailable because browser rendering was blocked.
- State: missing URL response, default page state, pointer-parallax enabled.

## Full-view comparison evidence

Blocked. The source and all three generated transparent assets were opened and inspected, and the implementation was served successfully, but no browser-rendered screenshot could be captured for a normalized side-by-side comparison.

## Focused region comparison evidence

The separate assets were visually inspected after background removal. The direction sign has clean transparent corners and correctly preserves “Wireframe”, “Prototype”, “UI Design”, and “Success”. The moon has transparent upper corners and intentionally opaque lower corners where its surface reaches the frame edge. Header and footer markup compare exactly with the shared site source after removing the source page's `aria-current` marker. Browser-rendered hero composition remains blocked.

## Findings

- [P1] Browser-rendered visual evidence is unavailable.
  - Location: full `/404.html` route at desktop and mobile sizes.
  - Evidence: the supported browser runtime reported no available browser surfaces.
  - Impact: final asset overlap, crop, typography wrapping, parallax response, navigation interactions, footer spacing, and mobile stacking cannot be visually certified.
  - Fix: open the missing route in an available browser, capture desktop and mobile states, test interactions, and compare them with the supplied reference.

## Required fidelity surfaces

- Fonts and typography: the page and shared chrome use the site's established Space Grotesk/Inter system; browser verification blocked.
- Spacing and layout rhythm: desktop now uses the full hero as an unframed canvas, with left recovery copy, upper-right 404, and a full-width moon foreground. Mobile preserves the same open-canvas treatment and moves the illustration cluster below centered copy; browser verification blocked.
- Colors and visual tokens: Ovi ink, sky blue, cobalt, coral, amber, white, and pale primary tokens are used consistently; browser verification blocked.
- Image quality and asset fidelity: five dedicated layered raster elements replace the earlier single composite. The new sign follows the attached direction-board reference, and the moon foreground adds craters, rocks, crystals, and a portal in the matching 3D art direction.
- Copy and content: the original user-flow message is preserved. The full site header/footer, course links, free-demo entry, newsletter form, social links, WhatsApp help, and recovery CTAs are present.

## Primary interactions and runtime checks

- Missing nested routes return HTTP 404 while serving the custom page.
- All five generated assets return HTTP 200.
- The shared header matches the existing source markup exactly after removing page-specific current-state markup.
- The shared footer matches the existing source markup exactly.
- Existing `script.js` passes Node syntax validation and powers the dropdown, mobile menu, demo form, footer year, and shared behavior.
- The hero adds requestAnimationFrame-based pointer parallax, independent drift animations, hover/button states, and a reduced-motion fallback.
- Browser-only click, focus, hover, animation, responsive, and console-error checks remain blocked.

## Comparison history

- First version: one full-scene image with a simplified custom header/footer.
- Current version: exact shared site chrome, five independently arranged image elements on a full-width frameless hero, a lower moon landscape, foreground astronaut and signboard, and both the recovery copy and main 404 sculpture lifted to match the latest placement references.
- Static HTTP, alpha-channel, markup equality, target existence, and JavaScript syntax checks passed. Browser capture was unavailable, so no visual comparison iteration could be performed.

## Implementation checklist

- Capture the missing route at 1440 × 900 and 390 × 844.
- Test desktop parallax, mobile navigation, course dropdown, free-demo modal, newsletter form, and recovery links.
- Confirm there are no browser console errors.
- Fix any P0/P1/P2 visual differences and repeat the comparison.

final result: blocked
