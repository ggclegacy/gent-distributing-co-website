# Gent Network entrance

The opening is a user-triggered, 10.5-second film. Gent is the infrastructure; categories are information carried through it. Louisiana, its routing layers, the national field, and a precision presentation module replace the product-chamber story. Existing catalog, membership, Shopify safeguards and downstream work remain intact.

## Two directors

`src/lib/intro-director.ts` is the sole writer of `exchangeSignal.progress`. One GSAP timeline advances an absolute normalized 0–1 playhead. No ScrollTrigger, wheel delta, touch delta or document position can seek this film. `EXCHANGE_DURATION`, chapter boundaries, and three independently authored camera tracks live in `src/lib/exchange-film.ts`.

`src/lib/cinema.ts` exports `mountPageDirector`. `SceneMotion` mounts it when the entrance publishes `EXPLORE`, and reverts it for Replay or Motion Off. It never imports the entrance signal. The entrance sits outside `.cinema-stage` and occupies one stable viewport. The downstream pin begins below it, so adding the downstream runway at completion does not replace, collapse or move the completed entrance.

Desktop retains the existing scroll transitions and phase events for the Gent Intelligence Layer. Mobile retains natural document scrolling and the intelligence panels' existing intersection-gated scroll sampling. Other downstream environments still use ScrollTrigger. Resize, font readiness and direct links retain the existing layout refresh and hash reconciliation. Direct section links skip the entrance and reach their requested section. Links clicked during the entrance establish their hash before the authority handoff, avoiding a race with Next Link and pinned-scene layout.

## State machine and controls

- Server: `DORMANT`, semantic heading, static Louisiana poster, Activate and Skip.
- First real canvas frame: `READY`.
- Activate before readiness: `PREPARING`, immediately acknowledged by `INITIALIZING NETWORK`; the playhead stays at zero.
- Ready activation: `PLAYING`; the film runs once even if activation is repeated.
- At 8.7 seconds: `RESOLVING`; the module and typography settle.
- At 10.5 seconds: `EXPLORE`; scrolling is restored and PageDirector receives authority.
- Skip or Escape: transient `SKIPPED`, then `EXPLORE` at exactly progress 1.
- Save Data, reported memory <=2 GB, renderer import/render failure or context loss: `FALLBACK` mode retains static artwork and accessible controls.
- Reduced motion or saved Motion Off: activation uses an 850 ms dissolve to the completed static composition. No camera path is sampled. Changing Motion during playback also resolves safely.
- An eight-second readiness watchdog prevents a permanently stuck initialization state.

While preparing/playing/resolving, the director fixes the document at its captured position. Completion, Skip, navigation and unmount restore the exact prior inline styles and position. This position restoration is not film playback. No wheel/touch listener consumes gestures and there is no focus trap. Navigation and Motion stay usable. Explicit Skip moves focus to Explore after React commits the completed controls. Keyboard Escape is available during playback.

Completion is remembered in session storage under `gent-network-complete`. It does not force repeat playback on route return/reload. Completed-session and direct-section visits keep the static final composition and defer the renderer until Replay requests it. `REPLAY NETWORK ↻` tears down downstream authority, resets all absolute poses and starts again. Storage denial remains harmless.

## Choreography

| Film time | Physical action |
| --- | --- |
| Before activation | Dark Louisiana relief; recessed G and edge discovery. |
| 0–1.2 s | Lafayette ignition, then gold routing channels. |
| 1.2–3.0 s | Shell, routing plane and smoked intelligence foundation separate; precision rings emerge from beneath the artifact. |
| 3.0–5.6 s | National relief resolves; routes and destination rings activate in sequence. Sparse projected DOM labels follow real 3D anchors. |
| 5.6–7.3 s | A selected route gains emphasis; the precision transport module arrives and the G travels from origin to authentication. Category identifiers remain typographic information. |
| 7.3–8.7 s | The module opens; the G follows its lid as an authentication seal. No launched product lineup is implied. |
| 8.7–10.5 s | Camera settles, instrumentation clears and the following lab environment softly appears in depth. Final copy and Explore resolve into ordinary page layout. |

Routes represent reach, destinations and ambition, not owned facilities. The lower 48 field uses US Atlas 3 / US Census 2017 Albers boundaries. The vendored source, license and deterministic preparation script are local. The field is artistic geographic relief, not an operational GIS or terrain-elevation claim.

## Scene and replacement contract

`src/components/exchange/network-model.ts` builds the procedural production scene. Units are meters, +Y is north/up, +Z faces the visitor, and the Louisiana geographic center is the origin. Camera animation is always in code.

```
gent_network_root
  louisiana
    shell
    routing / origin_channels
    intelligence
    lafayette_node
    mechanism
      origin_ring
      routing_ring
      intelligence_ring
  gent_core                  # independent world pivot permits continuous transfer
  united_states
    terrain / lower_48_relief
    destination_nodes / destination_0…6
    route_anchors / route_0…6
  transport
    capsule_shell / gent_seal
    capsule_core
  hud_anchors / source
  retired_visuals            # invisible resource-lifetime container
```

`NEXT_PUBLIC_GENT_NETWORK_GLB` optionally points to a same-origin GLB. `network-assets.ts` validates all replacement leaves before any mutation. Required named groups: `shell`, `intelligence`, `origin_ring`, `routing_ring`, `intelligence_ring`, `capsule_shell`, `capsule_core`. These groups must not be nested inside one another; each must contain visual descendants at its local origin with applied scale. Their visuals are placed beneath the existing code-owned pivots. Animated routing channels, core transfer, geographic anchors and seal pivot stay in code. Invalid, cross-origin or failed assets leave the procedural scene usable. Meshopt is supported locally; Draco/KTX2/network decoder services are unnecessary for this asset set.

The old Exchange model/loader remain available for historical reference but are not the active opening asset contract. The procedural scene is not represented as a commissioned Blender asset. Replacement leaves and resources are disposed on teardown; shared materials are retained safely while a replacement is installed.

## Responsive composition and loading

Portrait, tablet and desktop camera tracks are separately authored. Portrait compresses the national field while retaining an enlarged origin relief; it does not simply shrink desktop. HUD anchors are projected through the current Three camera into DOM coordinates, and labels outside the safe central field are omitted. Critical CTA, Skip, chapter, status and resolution copy are HTML. Controls clear persistent navigation and the existing Motion control, including short screens and mobile safe areas.

The local dormant poster and semantic HTML arrive without WebGL. The renderer is dynamically imported only for eligible devices. The poster fades only after a real scene frame is ready. The completed fallback is also an export of the same authored scene, with separate portrait and landscape images. No percentage loader, third-party image/font request or postprocessing chain is required.

The renderer uses demand frames. Film updates and resize invalidate it; stationary dormant and completed scenes settle. DPR is capped at 1.25 on standard/mobile and 1.5 on desktop. National geography is combined into one relief mesh and one edge field; mechanical ticks are instanced. Shared textures/materials and absolute poses avoid accumulated transforms and unnecessary React renders.

## Review and verification

Run `npm run lint`, `npm run build`, then start that production build and set `PLAYWRIGHT_BASE_URL` for `playwright.network.config.ts`. The suite covers the new input/state contract, browser wheel/native touch, full timing, Skip/Replay, session persistence, resize, fallbacks, context loss, idle rendering, navigation, and the existing downstream/catalog/product journeys.

For local art review only, `next dev` accepts `?network-frame=0…1`; this seeks through the same director and cannot run in production. `?animatic` retains neutral material review. `scripts/network-frames.mjs` captures representative frames and exports matching posters. It does not simulate visitor playback by scrolling. See `docs/network/verification.md` for the actual results and limits of this delivery.
