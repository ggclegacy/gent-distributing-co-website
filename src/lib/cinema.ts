import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const titles = [
  "ROOTED HERE",
  "THE GENT STANDARD",
  "THE COLLECTION",
  "DISTRIBUTION",
  "COMMUNITY",
  "COME IN",
];

/** A finite scroll sequence; no idle particle loop or per-frame React updates. */
function wakeNetwork(timeline: gsap.core.Timeline, hero: Element, at = 0) {
  const find = (selector: string) => hero.querySelectorAll(selector);
  timeline.fromTo(find(".engine-paths path"), { strokeDashoffset: 1 },
    { strokeDashoffset: 0, stagger: .08, duration: .85, ease: "none" }, at);
  timeline.fromTo(find(".engine-product"), { opacity: .12 },
    { opacity: .9, stagger: .045, duration: .6 }, at + .12);
  timeline.fromTo(find(".exchange-panel"), { y: 0 },
    { y: -42, stagger: .025, duration: .9, ease: "power1.out" }, at);
  timeline.fromTo(find(".exchange-blade, .exchange-blade-edge"), { y: 0, rotation: 0 },
    { y: -44, rotation: -26, duration: 1, transformOrigin: "300px 300px" }, at);
  timeline.fromTo(find(".exchange-confluence"), { opacity: .25 }, { opacity: 1, duration: .4 }, at);
  timeline.fromTo(find(".exchange-monogram"), { opacity: .5 }, { opacity: 1, duration: .4 }, at);
  timeline.to(find(".exchange-panel"), { y: -18, duration: .8 }, at + 2.3);
  timeline.fromTo(find(".engine-expansion"), { opacity: .06 }, { opacity: .7, duration: 1.2 }, at + 1.5);
  timeline.fromTo(find(".engine-expansion path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2 }, at + 1.5);
  // Light, architecture and foreground travel independently, tied to the same playhead.
  timeline.fromTo(find(".exchange-environment"), { opacity: 0 }, { opacity: 1, duration: .22 }, at);
  timeline.fromTo(find(".exchange-aurora"), { xPercent: 18, scale: .8 },
    { xPercent: -14, scale: 1.35, rotation: -18, duration: 3.3 }, at);
  timeline.fromTo(find(".exchange-depth-plane"), { yPercent: 18, rotationX: 68, rotationZ: -12 },
    { yPercent: -12, rotationX: 48, rotationZ: 9, duration: 3.3 }, at);
  timeline.fromTo(find(".exchange-horizons"), { scale: .7, rotation: -20, xPercent: 8 },
    { scale: 1.35, rotation: 28, xPercent: -8, duration: 3.3 }, at);
  timeline.fromTo(find(".exchange-dust i"), { opacity: .15, y: 40 },
    { opacity: .7, y: -90, stagger: .015, duration: 2.9 }, at);
  timeline.fromTo(find(".exchange-light-shaft"), { xPercent: -60, opacity: 0 },
    { xPercent: 45, opacity: .65, duration: 1.5 }, at);
  timeline.to(find(".exchange-light-shaft"), { xPercent: 90, opacity: .1, duration: 1.7 }, at + 1.5);
  timeline.fromTo(find(".exchange-reflection"), { xPercent: -110, opacity: 0 },
    { xPercent: 110, opacity: .65, duration: 1.5 }, at);
  timeline.to(find(".exchange-reflection"), { xPercent: -80, opacity: .15, duration: 1.7 }, at + 1.5);
  timeline.fromTo(find(".engine-waterways"), { y: 0, opacity: .32 },
    { y: -35, x: -45, opacity: .75, duration: 3.3 }, at);
  timeline.fromTo(find(".engine-atmosphere"), { opacity: .4, scale: 1 },
    { opacity: 1, scale: 1.25, duration: .8 }, at);
  timeline.fromTo(find(".exchange-transit"), { opacity: 0 }, { opacity: .8, duration: .15 }, at);
  timeline.fromTo(find(".exchange-transit path"), { strokeDashoffset: 1 },
    { strokeDashoffset: -2, stagger: .12, duration: 3, ease: "none" }, at);
  timeline.to(find(".exchange-transit"), { opacity: 0, duration: .18 }, at + 3.1);
}

function orbitExchange(timeline: gsap.core.Timeline, hero: Element, mobile = false) {
  const tilt = hero.querySelector(".engine-tilt");
  const sculpture = hero.querySelector(".exchange-sculpture");
  const amount = mobile ? .65 : 1;
  timeline.to(tilt, { rotationX: 38, rotationY: -24 * amount, rotationZ: 16, yPercent: -3, duration: .8, ease: "power1.out" }, 0);
  timeline.to(tilt, { rotationX: 7, rotationY: 22 * amount, rotationZ: 52, yPercent: -6, duration: 1.15 }, .8);
  timeline.to(tilt, { rotationX: 28, rotationY: -10, rotationZ: 96, yPercent: -2, duration: 1.35 }, 1.95);
  timeline.to(sculpture, { scale: mobile ? 1.08 : 1.16, transformOrigin: "50% 50%", duration: .85 }, 0);
  timeline.to(sculpture, { scale: mobile ? .88 : .78, duration: 1.35 }, 1.95);
}

/** One stage, one playhead. Scene entrances and exits share a transition interval. */
export function mountCinema(root: HTMLElement, rail: HTMLElement | null) {
  const media = gsap.matchMedia();
  const stage = root.querySelector<HTMLElement>(".cinema-stage")!;
  const scenes = Array.from(
    stage.querySelectorAll<HTMLElement>("[data-scene]"),
  );
  const warmScene = (index: number) => {
    scenes[index]?.querySelectorAll<HTMLImageElement>("img[loading='lazy']").forEach(image => {
      image.loading = "eager";
      void image.decode().catch(() => { /* Text and placeholders remain available offline. */ });
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
        short: "(max-height: 599px)",
      },
      (context) => {

        if (context.conditions?.mobile) {
          root.dataset.nativeCinema = "true";
          const staging = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;
              const index = scenes.indexOf(entry.target as HTMLElement);
              warmScene(index);
              warmScene(index + 1);
            });
          }, { rootMargin: "100% 0px" });
          scenes.forEach(scene => staging.observe(scene));
          // Phones keep native document flow; one bounded scroll-driven camera,
          // no pinned scenes, animation loop, canvas, or high-DPI render target.
          const hero = root.querySelector<HTMLElement>(".hero");
          if (!hero) return;
          const descent = gsap.timeline({ scrollTrigger: {
            trigger: hero, start: "top top", end: "bottom 25%", scrub: true,
          } })
            .to(hero.querySelector(".network-camera"), { scale: .88, yPercent: -2, duration: 3.2, ease: "none" }, 0);
          wakeNetwork(descent, hero);
          orbitExchange(descent, hero, true);
          scenes.slice(1).forEach((scene) => {
            const camera = scene.querySelector(".environment-camera");
            if (!camera) return;
            const sceneFilm = gsap.timeline({ scrollTrigger: {
              trigger: scene, start: "top 90%", end: "bottom top", scrub: true,
            } });
            sceneFilm.fromTo(camera, { scale: 1.07, yPercent: 2 }, { scale: 1, yPercent: -2, ease: "none", duration: 1 }, 0);
            sceneFilm.fromTo(scene.querySelector(".environment-light"), { opacity: .32 }, { opacity: .03, duration: .4 }, 0);
            const caseObject = scene.querySelector(".network-case");
            if (caseObject) sceneFilm.fromTo(caseObject, { x: -45, y: 5 }, { x: 20, y: -10, duration: 1 }, 0);
            const coffee = scene.querySelector(".physical-coffee");
            if (coffee) sceneFilm.fromTo(coffee, { rotationY: -7 }, { rotationY: 3, duration: 1 }, 0);
            const card = scene.querySelector(".physical-card");
            if (card) sceneFilm.fromTo(card, { rotation: -1 }, { rotation: 1, duration: 1 }, 0);
            scene.querySelectorAll(".station-placard, .distribution-stops li, .location-plates > span").forEach((plate, i) => {
              sceneFilm.fromTo(plate, { borderTopColor: "#b3955d40" }, { borderTopColor: "#e8c98e", duration: .2 }, Math.min(.8, i * .15));
            });
          });
          // WebKit can restore the hash before the local font and scene layout
          // settle. Reconcile once after load; subsequent scrolling stays native.
          let cancelled = false;
          let frame = 0;
          const alignNativeHash = () => {
            frame = requestAnimationFrame(() => {
              if (cancelled || !location.hash) return;
              try {
                const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
                if (target && root.contains(target)) target.scrollIntoView({ behavior: "instant", block: "start" });
              } catch { /* Malformed external fragments leave normal flow intact. */ }
            });
          };
          void document.fonts.ready.then(() => {
            if (cancelled) return;
            if (document.readyState === "complete") alignNativeHash();
            else window.addEventListener("load", alignNativeHash, { once: true });
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
        gsap.set(scenes, { autoAlpha: 0 });
        gsap.set(scenes[0], { autoAlpha: 1 });
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
            scene.inert = i !== index;
            scene.setAttribute("aria-hidden", String(i !== index));
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
            let index = 0;
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
        let cursor = hold(0, 0);
        wakeNetwork(film, scenes[0]);
        orbitExchange(film, scenes[0]);
        film.to(select(0, ".hero-copy"), { x: -12, y: -24, duration: .65 }, 0);
        film.to(select(0, ".hero-copy"), { autoAlpha: 0, y: -25, duration: .45 }, .65);
        film.fromTo(select(0, ".network-beat-origin"), { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: .45 }, 1.05);
        film.to(select(0, ".network-beat-origin"), { autoAlpha: 0, y: -20, duration: .3 }, 1.95);
        film.fromTo(select(0, ".network-beat-reach"), { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: .45 }, 2.3);
        film.to(select(0, ".network-beat-reach"), { autoAlpha: 0, y: -20, duration: .35 }, 3.25);
        cursor = 3.4;
        const origins = scenes[0].querySelector<HTMLElement>(".origin-story");
        let originStop = 0;
        if (origins) {
          gsap.set(origins, { autoAlpha: 0 });
          film
            .to(
              select(0, ".hero-copy, .hero-bottom, .landscape-caption"),
              { autoAlpha: 0, y: -45, duration: 0.65 },
              cursor,
            )
            .to(
              select(0, ".network-camera"),
              { scale: 1.75, yPercent: -6, xPercent: -8, duration: 1.5 },
              cursor,
            )
            .fromTo(
              select(0, ".network-threshold"),
              { opacity: 0 },
              { opacity: .9, duration: 1.05 }, cursor + .25,
            )
            .to(select(0, ".engine-surface, .engine-controls"), { autoAlpha: 0, duration: .5 }, cursor + .55)
            .fromTo(origins,
              { autoAlpha: 0, y: 45 },
              { autoAlpha: 1, y: 0, duration: .95 }, cursor + .6)
            .to(select(0, ".network-threshold"), { opacity: 0, duration: .25 }, cursor + 1.5)
            .from(
              select(0, ".acadiana-network"),
              { scale: 0.92, rotation: 0, duration: 1.3 },
              cursor + 0.65,
            );
          film
            .from(select(0, ".connection-outcomes article"), { opacity: 0, y: 20, stagger: .15, duration: .5 }, cursor + 1.1)
            .from(
              select(0, ".origin-products"),
              { opacity: 0, y: 35, duration: 0.65 },
              cursor + 1.9,
            )
            .to({}, { duration: 0.8 }, cursor + 2.55);
          originStop = cursor + 2.6;
          cursor += 3.35;
          film.to(origins, { opacity: 0, scale: 1.15, duration: 0.8 }, cursor);
        }
        // The origin's aperture opens into a real atelier. One continuous playhead
        // owns architecture, light and cargo; content never depends on a renderer.
        let arrived = enter(1, cursor + .25, { opacity: 0, scale: 1.13 }, 1.2);
        film.to(scenes[1], { opacity: 1, duration: .8 }, cursor + .25);
        film.fromTo(select(1, ".environment-camera"), { scale: 1.12, xPercent: 1, yPercent: -2 }, { scale: 1.17, xPercent: -1, yPercent: -2, duration: 1.4 }, cursor + .25);
        film.to(select(1, ".environment-camera"), { scale: 1.28, xPercent: -5, yPercent: 0, duration: .9 }, arrived + .8);
        film.to(select(1, ".environment-camera"), { scale: 1.43, xPercent: -7, yPercent: 8, duration: 1 }, arrived + 1.7);
        film.fromTo(select(1, ".environment-light"), { opacity: .6 }, { opacity: .04, duration: 1.2 }, arrived - .3);
        hold(1, arrived + .2);
        const stations = select(1, ".station-placard");
        stations.forEach((station, i) => {
          film.fromTo(station, { borderTopColor: "#b3955d40" }, { borderTopColor: "#e8c98e", duration: .7 }, arrived + i * .9);
          film.fromTo(select(1, ".environment-foreground"), { xPercent: 0 }, { xPercent: -25, duration: 3 }, arrived);
        });
        cursor = arrived + 3.2;
        // Follow the finished pouch through the dark threshold into its archive.
        film.to(select(1, ".environment-camera"), { scale: 1.3, xPercent: -7, duration: 1.4 }, cursor);
        film.to(select(1, ".environment-light"), { opacity: .88, duration: .8 }, cursor);
        arrived = enter(2, cursor + .55, { opacity: 0, scale: 1.08 }, 1.25);
        film.to(scenes[2], { opacity: 1, duration: .8 }, cursor + .55);
        film.fromTo(select(2, ".environment-light"), { opacity: .92 }, { opacity: .02, duration: 1.15 }, arrived - .5);
        film.fromTo(select(2, ".environment-camera"), { scale: 1.09, xPercent: 1 }, { scale: 1, xPercent: -1, duration: 3 }, arrived - .4);
        film.fromTo(select(2, ".physical-coffee"), { rotationY: -8, xPercent: -2 }, { rotationY: 4, xPercent: 1, duration: 2.8 }, arrived - .4);
        film.fromTo(select(2, ".coffee-glint"), { opacity: 0 }, { opacity: .8, duration: 2 }, arrived);
        cursor = hold(2, arrived + .75) + .6;
        // Widen the archive into the operating house. An architectural column
        // occludes the join while the same physical case enters the foreground.
        const cargo = stage.querySelector<HTMLElement>(".journey-cargo");
        film.to(select(2, ".environment-camera"), { scale: .93, duration: 1.4 }, cursor);
        arrived = enter(3, cursor + .35, { opacity: 0, scale: 1.13 }, 1.2);
        film.to(scenes[3], { opacity: 1, duration: 1 }, cursor + .35);
        film.fromTo(stage.querySelector(".lens-column"), { xPercent: 120, opacity: 1 }, { xPercent: -120, duration: 1.65, immediateRender: false }, cursor);
        film.set(stage.querySelector(".lens-column"), { opacity: 0 }, arrived);
        film.fromTo(select(3, ".environment-camera"), { scale: 1.14, xPercent: -3 }, { scale: 1, xPercent: 2, duration: 4.2 }, cursor + .35);
        film.fromTo(cargo, { autoAlpha: 0, x: -80, y: 25, scale: .8 }, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: .9 }, arrived - .3);
        film.fromTo(cargo?.querySelector(".case-glint") ?? [], { opacity: .1 }, { opacity: 1, duration: .6 }, arrived);
        film.to(cargo, { x: 95, y: -30, scale: .72, duration: 2.5 }, arrived + .7);
        hold(3, arrived + .25);
        select(3, ".distribution-stops li").forEach((stop,i) => {
          film.fromTo(stop, { borderTopColor: "#b2945b40" }, { borderTopColor: "#e8c98e", duration: .55 }, arrived + i * .7);
        });
        select(3, ".location-plates > span").forEach((plate,i) => {
          film.fromTo(plate, { borderColor: "#74644850" }, { borderColor: "#c2a166", duration: .5 }, arrived + i * .55);
        });
        cursor = arrived + 3.4;
        // The case stays in the same DOM layer as the large hall falls away.
        arrived = enter(4, cursor + .25, { opacity: 0, scale: 1.025 }, 1.35);
        film.to(scenes[4], { opacity: 1, duration: 1.1 }, cursor + .25);
        film.to(cargo, { x: 65, y: -45, scale: .8, duration: 1.35 }, cursor + .25);
        film.fromTo(select(4, ".environment-camera"), { scale: 1.025, rotation: -.25 }, { scale: 1, rotation: 0, duration: 2.8 }, cursor + .25);
        film.fromTo(select(4, ".environment-light"), { opacity: .35 }, { opacity: .02, duration: 1.8 }, cursor + .25);
        film.fromTo(select(4, ".physical-card"), { rotation: -1.5, rotationY: -3 }, { rotation: 0, rotationY: 0, duration: 2.5 }, cursor + .25);
        film.fromTo(select(4, ".card-glint"), { opacity: 0 }, { opacity: .7, duration: 2 }, cursor + .4);
        cursor = hold(4, arrived + .65) + .6;
        // A quiet editorial coda in the same room, never another spectacle.
        film.to(cargo, { autoAlpha: 0, duration: .9 }, cursor);
        arrived = enter(5, cursor, { opacity: 0 }, .9);
        film.to(scenes[5], { opacity: 1, duration: .9 }, cursor);
        hold(5, arrived + .3);
        film.to({}, { duration: .5 });
        updateActive(0);
        ScrollTrigger.create({
          animation: film,
          trigger: stage,
          start: "top top",
          end: () =>
            `+=${film.duration() * innerHeight * (desktop ? 0.85 : 0.65)}`,
          pin: true,
          scrub: 0.3,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        const go = (index: number, focus = false) => {
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
