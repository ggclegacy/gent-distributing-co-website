import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// Scroll is an absolute film position: never stretch scrub recovery after a slow GPU frame.
gsap.ticker.lagSmoothing(0);

const titles = [
  "THE MACHINE",
  "THE GENT STANDARD",
  "THE COLLECTION",
  "THE NETWORK",
  "THE EXCHANGE",
  "COME IN",
];

/** Scene-specific intelligence has one reversible scroll owner, no fabricated live data. */
function activateFacility(
  timeline: gsap.core.Timeline,
  scene: Element,
  at: number,
  duration = 1,
) {
  if (scene.hasAttribute("data-intelligence")) {
    const signal = { progress: 0 };
    timeline.fromTo(
      signal,
      { progress: 0 },
      {
        progress: 1,
        duration: duration * 1.45,
        ease: "none",
        onUpdate: () =>
          scene.dispatchEvent(
            new CustomEvent("gent-intelligence-progress", {
              detail: signal.progress,
            }),
          ),
      },
      at,
    );
    return;
  }
  const find = (selector: string) => scene.querySelectorAll(selector);
  const animate = (
    selector: string,
    from: gsap.TweenVars,
    to: gsap.TweenVars,
    offset = 0,
  ) => {
    const nodes = find(selector);
    if (nodes.length)
      timeline.fromTo(
        nodes,
        from,
        { ...to, ease: "sine.inOut" },
        at + offset * duration,
      );
  };
  animate(
    ".intelligence-heading",
    { opacity: 0.18 },
    { opacity: 0.55, duration: duration * 0.5 },
  );
  animate(
    ".evaluation-row",
    { opacity: 0.15 },
    { opacity: 1, stagger: duration * 0.09, duration: duration * 0.25 },
    0.08,
  );
  animate(
    ".evaluation-row i",
    { scaleX: 0 },
    { scaleX: 1, stagger: duration * 0.09, duration: duration * 0.25 },
    0.08,
  );
  animate(
    ".evaluation-pass, .evaluation-hold",
    { opacity: 0.12 },
    { opacity: 1, stagger: duration * 0.12, duration: duration * 0.25 },
    0.65,
  );
  animate(
    ".object-tracker:not(.exchange-identity)",
    { opacity: 0.12, y: 5 },
    { opacity: 0.6, y: 0, stagger: duration * 0.2, duration: duration * 0.4 },
    0.3,
  );
  animate(
    ".vault-bay",
    { opacity: 0.06 },
    { opacity: 0.58, stagger: duration * 0.065, duration: duration * 0.25 },
    0.05,
  );
  animate(
    ".vault-bay i",
    { scaleY: 0.1 },
    { scaleY: 1, stagger: duration * 0.065, duration: duration * 0.35 },
    0.05,
  );
  animate(
    ".portfolio-record",
    { opacity: 0.16 },
    { opacity: 0.6, duration: duration * 0.55 },
    0.3,
  );
  animate(
    ".cargo-scan",
    { xPercent: -50, opacity: 0 },
    { xPercent: 50, opacity: 0.35, duration: duration * 0.9 },
    0.08,
  );
  animate(
    ".route-origin",
    { opacity: 0.25 },
    { opacity: 1, duration: duration * 0.2 },
  );
  animate(
    ".route-segment",
    { scaleX: 0 },
    { scaleX: 1, stagger: duration * 0.14, duration: duration * 0.22 },
    0.12,
  );
  animate(
    ".route-destination b, .channel-destination",
    { opacity: 0.12 },
    { opacity: 1, stagger: duration * 0.07, duration: duration * 0.25 },
    0.35,
  );
  animate(
    ".exchange-identity",
    { opacity: 0.08, y: 4 },
    {
      opacity: 0.62,
      y: 0,
      stagger: duration * 0.25,
      duration: duration * 0.45,
    },
    0.2,
  );
  animate(
    ".exchange-record",
    { opacity: 0.15 },
    { opacity: 0.6, duration: duration * 0.6 },
    0.1,
  );
}

/** PageDirector: downstream ScrollTrigger authority, independent of IntroDirector.
 * Called only after completion/skip. Its pin begins below the one-viewport entrance,
 * so refresh adds runway below the visitor without shifting the completed frame. */
export function mountPageDirector(root: HTMLElement, rail: HTMLElement | null) {
  const media = gsap.matchMedia();
  const stage = root.querySelector<HTMLElement>(".cinema-stage")!;
  const scenes = [
    root.querySelector<HTMLElement>(".network-entrance")!,
    ...Array.from(stage.querySelectorAll<HTMLElement>("[data-scene]")),
  ];
  const warmScene = (index: number) => {
    scenes[index]
      ?.querySelectorAll<HTMLImageElement>("img[loading='lazy']")
      .forEach((image) => {
        image.loading = "eager";
        void image.decode().catch(() => {
          /* Text and placeholders remain available offline. */
        });
      });
  };
  let active = 0;
  let destroyed = false;
  const originalFocus = new Map<HTMLElement, string | null>();
  const setLabel = (index: number) => {
    const label = rail?.querySelector("[data-act-label]");
    if (label)
      label.textContent = `${String(index + 1).padStart(2, "0")} / ${titles[index]}`;
    rail
      ?.querySelector<HTMLButtonElement>("[data-scene-prev]")
      ?.toggleAttribute("disabled", index === 0);
    rail
      ?.querySelector<HTMLButtonElement>("[data-scene-next]")
      ?.toggleAttribute("disabled", index === scenes.length - 1);
  };
  try {
    media.add(
      {
        desktop: "(min-width: 1000px) and (min-height: 700px)",
        mobile: "(max-width: 999px), (max-height: 699px)",
        short: "(max-height: 599px) and (orientation: landscape)",
      },
      (context) => {
        if (context.conditions?.mobile) {
          root.dataset.nativeCinema = "true";
          const staging = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const index = scenes.indexOf(entry.target as HTMLElement);
                warmScene(index);
                warmScene(index + 1);
              });
            },
            { rootMargin: "100% 0px" },
          );
          scenes.forEach((scene) => staging.observe(scene));
          scenes.slice(1).forEach((scene) => {
            if (scene.hasAttribute("data-intelligence")) return;
            const camera = scene.querySelector(".environment-camera");
            if (!camera) return;
            const sceneFilm = gsap.timeline({
              scrollTrigger: {
                trigger: scene,
                start: "top 90%",
                end: "bottom top",
                scrub: 0.85,
              },
            });
            activateFacility(sceneFilm, scene, 0);
            sceneFilm.fromTo(
              camera,
              { scale: 1.025, yPercent: 1 },
              { scale: 1, yPercent: -1, ease: "none", duration: 1 },
              0,
            );
            sceneFilm.fromTo(
              scene.querySelector(".environment-light"),
              { opacity: 0.32 },
              { opacity: 0.03, duration: 0.4 },
              0,
            );
            scene
              .querySelectorAll(
                ".station-placard, .distribution-stops li, .location-plates > span",
              )
              .forEach((plate, i) => {
                sceneFilm.fromTo(
                  plate,
                  { borderTopColor: "#b3955d40" },
                  { borderTopColor: "#e8c98e", duration: 0.2 },
                  Math.min(0.8, i * 0.15),
                );
              });
          });
          // WebKit can restore the hash before the local font and scene layout
          // settle. Reconcile once after load; subsequent scrolling stays native.
          const initialHash = location.hash;
          let cancelled = false;
          let frame = 0;
          const alignNativeHash = () => {
            frame = requestAnimationFrame(() => {
              if (cancelled || !initialHash || location.hash !== initialHash)
                return;
              try {
                const target = document.getElementById(
                  decodeURIComponent(location.hash.slice(1)),
                );
                if (target && root.contains(target))
                  target.scrollIntoView({
                    behavior: "instant",
                    block: "start",
                  });
              } catch {
                /* Malformed external fragments leave normal flow intact. */
              }
            });
          };
          void document.fonts.ready.then(() => {
            if (cancelled) return;
            if (document.readyState === "complete") alignNativeHash();
            else
              window.addEventListener("load", alignNativeHash, { once: true });
          });
          return () => {
            staging.disconnect();
            root.removeAttribute("data-native-cinema");
            cancelled = true;
            cancelAnimationFrame(frame);
            window.removeEventListener("load", alignNativeHash);
          };
        }
        const desktop = Boolean(context.conditions?.desktop);
        root.dataset.cinemaReady = desktop ? "desktop" : "small";
        const select = (index: number, selector: string) =>
          scenes[index].querySelectorAll<HTMLElement>(selector);
        gsap.set(scenes.slice(1), { autoAlpha: 0 });
        gsap.set(scenes[1], { autoAlpha: 1 });
        const stops: number[] = [];
        const starts: number[] = [];
        const pans: { start: number; duration: number; overflow: number }[] =
          [];
        let current = -1;
        const updateActive = (index: number) => {
          if (current === index) return;
          current = active = index;
          warmScene(index);
          warmScene(index + 1);
          root.dataset.activeScene = String(index);
          scenes.forEach((scene, i) => {
            if (i > 0) {
              scene.inert = i !== index;
              scene.setAttribute("aria-hidden", String(i !== index));
            }
          });
          setLabel(index);
        };
        const progressElement = rail?.querySelector("[data-act-progress]");
        const setProgress = progressElement
          ? gsap.quickSetter(progressElement, "scaleX")
          : undefined;
        const film = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate() {
            const time = this.time();
            let index = 1;
            starts.forEach((start, i) => {
              if (time >= start) index = i;
            });
            updateActive(index);
            setProgress?.(this.progress());
          },
        });

        /** Every scene gets a readable hold. Tall mobile scenes pan within the same stage. */
        const hold = (index: number, at: number) => {
          const content =
            scenes[index].querySelector<HTMLElement>(".scene-content");
          const overflow = content
            ? Math.max(0, content.scrollHeight - stage.clientHeight)
            : 0;
          if (index > 0) activateFacility(film, scenes[index], at, 1.5);
          starts[index] = Math.max(0, at - (index ? 0.32 : 0));
          stops[index] = at + 0.12;
          film.addLabel(`scene-${index}`, stops[index]);
          if (index === 0) {
            film.to({}, { duration: 0.12 }, at);
            return 0.15;
          }
          film.to({}, { duration: desktop ? 0.8 : 0.45 }, at);
          if (content && overflow > 0) {
            const duration = Math.max(0.9, overflow / innerHeight);
            pans[index] = { start: at + 0.45, duration, overflow };
            film.fromTo(
              content,
              { y: 0 },
              { y: -overflow, duration },
              at + 0.45,
            );
          }
          return Math.max(at + (desktop ? 1.15 : 0.85), film.duration() + 0.3);
        };
        /** Incoming scene covers the outgoing scene on the same viewport; no page gap. */
        const enter = (
          index: number,
          at: number,
          from: gsap.TweenVars,
          duration = 1.2,
        ) => {
          gsap.set(scenes[index], { zIndex: index + 1 });
          film
            .set(scenes[index], { autoAlpha: 1 }, at)
            .fromTo(
              scenes[index],
              from,
              {
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                rotation: 0,
                clipPath: "inset(0% 0% 0% 0%)",
                duration,
              },
              at,
            )
            .set(scenes[index - 1], { autoAlpha: 0 }, at + duration);
          return at + duration;
        };
        // The entrance has already resolved. Scroll owns only Scene 02 onward.
        let cursor = 0;
        const originStop = 0;
        let arrived = 0;
        film.fromTo(
          select(1, ".environment-camera"),
          { scale: 1.12, xPercent: 1, yPercent: -2 },
          { scale: 1.06, xPercent: -1, yPercent: -2, duration: 1.4 },
          cursor + 0.25,
        );
        film.to(
          select(1, ".environment-camera"),
          { scale: 1.075, xPercent: -1, yPercent: 0, duration: 0.9 },
          arrived + 0.8,
        );
        film.to(
          select(1, ".environment-camera"),
          { scale: 1.09, xPercent: -2, yPercent: 1, duration: 1 },
          arrived + 1.7,
        );
        film.fromTo(
          select(1, ".environment-light"),
          { opacity: 0.6 },
          { opacity: 0.04, duration: 1.2 },
          arrived - 0.3,
        );
        hold(1, arrived + 0.2);
        const stations = select(1, ".station-placard");
        stations.forEach((station, i) => {
          film.fromTo(
            station,
            { borderTopColor: "#b3955d40" },
            { borderTopColor: "#e8c98e", duration: 0.7 },
            arrived + i * 0.9,
          );
          film.fromTo(
            select(1, ".environment-foreground"),
            { xPercent: 0 },
            { xPercent: -25, duration: 3 },
            arrived,
          );
        });
        cursor = arrived + 3.2;
        // The approved sample opens into the multi-category product vault.
        film.to(
          select(1, ".environment-camera"),
          { scale: 1.1, xPercent: -2, duration: 1.4 },
          cursor,
        );
        film.to(
          select(1, ".environment-light"),
          { opacity: 0.88, duration: 0.8 },
          cursor,
        );
        arrived = enter(2, cursor + 0.55, { opacity: 0, scale: 1.08 }, 1.25);
        film.to(scenes[2], { opacity: 1, duration: 0.8 }, cursor + 0.55);
        film.fromTo(
          select(2, ".environment-light"),
          { opacity: 0.92 },
          { opacity: 0.02, duration: 1.15 },
          arrived - 0.5,
        );
        film.fromTo(
          select(2, ".environment-camera"),
          { scale: 1.09, xPercent: 1 },
          { scale: 1, xPercent: -1, duration: 3 },
          arrived - 0.4,
        );
        cursor = hold(2, arrived + 0.75) + 0.6;
        // Widen the archive into the operating house. An architectural column
        // occludes the join while the same physical case enters the foreground.
        film.to(
          select(2, ".environment-camera"),
          { scale: 1.02, duration: 1.4 },
          cursor,
        );
        arrived = enter(3, cursor + 0.35, { opacity: 0, scale: 1.13 }, 1.2);
        film.to(scenes[3], { opacity: 1, duration: 1 }, cursor + 0.35);
        film.fromTo(
          stage.querySelector(".lens-column"),
          { xPercent: 120, opacity: 1 },
          { xPercent: -120, duration: 1.65, immediateRender: false },
          cursor,
        );
        film.set(stage.querySelector(".lens-column"), { opacity: 0 }, arrived);
        film.fromTo(
          select(3, ".environment-camera"),
          { scale: 1.14, xPercent: -3 },
          { scale: 1, xPercent: 2, duration: 4.2 },
          cursor + 0.35,
        );
        hold(3, arrived + 0.25);
        select(3, ".distribution-stops li").forEach((stop, i) => {
          film.fromTo(
            stop,
            { borderTopColor: "#b2945b40" },
            { borderTopColor: "#e8c98e", duration: 0.55 },
            arrived + i * 0.7,
          );
        });
        select(3, ".location-plates > span").forEach((plate, i) => {
          film.fromTo(
            plate,
            { borderColor: "#74644850" },
            { borderColor: "#c2a166", duration: 0.5 },
            arrived + i * 0.55,
          );
        });
        cursor = arrived + 3.4;
        // Follow the product network into its human destination: the Exchange.
        arrived = enter(4, cursor + 0.25, { opacity: 0, scale: 1.025 }, 1.35);
        film.to(scenes[4], { opacity: 1, duration: 1.1 }, cursor + 0.25);
        film.fromTo(
          select(4, ".environment-camera"),
          { scale: 1.025, rotation: -0.25 },
          { scale: 1, rotation: 0, duration: 2.8 },
          cursor + 0.25,
        );
        film.fromTo(
          select(4, ".environment-light"),
          { opacity: 0.35 },
          { opacity: 0.02, duration: 1.8 },
          cursor + 0.25,
        );
        cursor = hold(4, arrived + 0.65) + 0.6;
        // A quiet editorial coda in the same room, never another spectacle.
        arrived = enter(5, cursor, { opacity: 0 }, 0.9);
        film.to(scenes[5], { opacity: 1, duration: 0.9 }, cursor);
        hold(5, arrived + 0.3);
        film.to({}, { duration: 0.5 });
        updateActive(1);
        ScrollTrigger.create({
          animation: film,
          trigger: stage,
          start: "top top",
          end: () =>
            `+=${film.duration() * innerHeight * (desktop ? 0.85 : 0.65)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        const go = (index: number, focus = false) => {
          if (index === 0) {
            scenes[0].scrollIntoView({ behavior: "instant", block: "start" });
            return;
          }
          const trigger = film.scrollTrigger!;
          const time =
            index === 0 && location.hash === "#origins"
              ? originStop
              : stops[index];
          window.scrollTo({
            top:
              trigger.start +
              (time / film.duration()) * (trigger.end - trigger.start),
            behavior: "instant",
          });
          ScrollTrigger.update();
          trigger.getTween()?.progress(1);
          film.time(time);
          updateActive(index);
          if (focus) {
            const target = scenes[index];
            if (!originalFocus.has(target))
              originalFocus.set(target, target.getAttribute("tabindex"));
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
          }
        };
        const hashIndex = (hash: string) => {
          try {
            if (hash === "#origins") return 0;
            return scenes.findIndex(
              (scene) => scene.id === decodeURIComponent(hash.slice(1)),
            );
          } catch {
            return -1;
          }
        };
        const click = (event: MouseEvent) => {
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const link = (event.target as Element).closest<HTMLAnchorElement>(
            "a[href]",
          );
          if (!link) return;
          const url = new URL(link.href);
          if (
            url.origin !== location.origin ||
            url.pathname !== location.pathname
          )
            return;
          const index = hashIndex(url.hash);
          if (index < 0) return;
          event.preventDefault();
          history.pushState(null, "", url.hash);
          go(index, true);
        };
        const hashChange = () => {
          const index = hashIndex(location.hash);
          if (index >= 0) go(index);
        };
        const step = (event: Event) => {
          const delta = (event as CustomEvent<number>).detail;
          const index = Math.max(
            0,
            Math.min(scenes.length - 1, active + delta),
          );
          history.pushState(null, "", `#${scenes[index].id}`);
          go(index, true);
        };
        // A keyboard user entering the tall scene's last controls gets a visible camera position.
        const focusIn = (event: FocusEvent) => {
          const target = event.target as HTMLElement;
          const content =
            scenes[active].querySelector<HTMLElement>(".scene-content");
          if (!content?.contains(target)) return;
          const rect = target.getBoundingClientRect();
          if (rect.bottom <= innerHeight - 80 && rect.top >= 95) return;
          const pan = pans[active];
          if (!pan) return;
          const localTop = rect.top - content.getBoundingClientRect().top;
          const ratio = gsap.utils.clamp(
            0,
            1,
            (localTop - innerHeight * 0.4) / pan.overflow,
          );
          const time = pan.start + ratio * pan.duration;
          const trigger = film.scrollTrigger!;
          window.scrollTo({
            top:
              trigger.start +
              (time / film.duration()) * (trigger.end - trigger.start),
            behavior: "instant",
          });
          ScrollTrigger.update();
          trigger.getTween()?.progress(1);
          film.time(time);
        };
        document.addEventListener("click", click, true);
        window.addEventListener("hashchange", hashChange);
        window.addEventListener("gent-scene-step", step);
        stage.addEventListener("focusin", focusIn);
        let cancelled = false;
        let frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        const align = () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            if (!cancelled) {
              ScrollTrigger.refresh();
              hashChange();
            }
          });
        };
        void document.fonts.ready.then(() => {
          if (cancelled) return;
          if (document.readyState === "complete") align();
          else window.addEventListener("load", align, { once: true });
        });
        // Rebuild the content-pan distances after a resize, even within the same breakpoint.
        let width = innerWidth,
          height = innerHeight;
        let resizeTimer: ReturnType<typeof setTimeout>;
        const resize = () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (
              cancelled ||
              destroyed ||
              (width === innerWidth && Math.abs(height - innerHeight) < 100)
            )
              return;
            width = innerWidth;
            height = innerHeight;
            gsap.matchMediaRefresh();
          }, 220);
        };
        window.addEventListener("resize", resize);
        return () => {
          cancelled = true;
          cancelAnimationFrame(frame);
          clearTimeout(resizeTimer);
          window.removeEventListener("load", align);
          window.removeEventListener("resize", resize);
          document.removeEventListener("click", click, true);
          window.removeEventListener("hashchange", hashChange);
          window.removeEventListener("gent-scene-step", step);
          stage.removeEventListener("focusin", focusIn);
          scenes.forEach((scene) => {
            scene.inert = false;
            scene.removeAttribute("aria-hidden");
          });
          root.removeAttribute("data-cinema-ready");
          root.removeAttribute("data-active-scene");
        };
      },
      root,
    );
  } catch (error) {
    media.revert();
    scenes.forEach((scene) => {
      scene.inert = false;
      scene.removeAttribute("aria-hidden");
    });
    root.removeAttribute("data-cinema-ready");
    root.removeAttribute("data-native-cinema");
    root.removeAttribute("data-active-scene");
    throw error;
  }
  return () => {
    destroyed = true;
    media.revert();
    originalFocus.forEach((value, node) => {
      if (value === null) node.removeAttribute("tabindex");
      else node.setAttribute("tabindex", value);
    });
  };
}
