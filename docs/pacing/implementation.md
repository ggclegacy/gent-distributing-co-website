# Gent cinematic pacing revision

The introduction now uses a named master GSAP timeline. Composition progress stays absolute, so existing geometry, responsive camera paths, skip, replay and fallback remain deterministic. `IntroDirector.setTimeScale()` adjusts the full score, including holds.

| Beat | Start | Movement | Settle / hold |
|---|---:|---:|---:|
| Ignition | 0.00 | 0.85 | 0.70 |
| Discovery | 1.55 | 1.10 | 0.70 |
| System Activation | 3.35 | 1.10 | 0.70 |
| Product Reveal | 5.15 | 2.15 | 0.70 |
| Network Expansion | 8.00 | 1.05 | 0.70 |
| Brand Ascension | 9.75 | 2.45 | — |
| Hero Hold | 12.20 | — | 2.60 |

At 14.8 seconds the entry action becomes available. The case opens, the existing smoked presentation forms lift, the network returns subtly, the Gent mark rises, and the final camera settles with the statement “LOUISIANA BORN. BUILT TO MOVE FURTHER.” Existing imagery and downstream chapters are preserved. The presentation forms are the existing conceptual inserts, not new product packaging or product availability claims.

Ambient CSS particles and orbit motion continue while the completed WebGL frame sleeps. Offscreen/tab-hidden ambient animation pauses. Hidden tabs pause the master timeline; reduced motion and Motion off retain the short static transition. Skip, session restoration and replay continue through the original director.

Validation: production build, TypeScript, ESLint, desktop/390px screenshots, and focused Chromium playback/navigation/motion tests. Final frames are in `docs/pacing/`; test diagnostics are in `test-results/`.

The software-rendered Chromium checks measured roughly 15.8–16.5 seconds elapsed for the authored 14.8-second score, with delayed frame callbacks. The observed final hold was about 2.1 seconds in one such run (authored 2.6). Wall-clock duration can vary on slow GPUs. Real-device Safari testing is not included.
