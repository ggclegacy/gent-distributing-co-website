import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One owner per property; every timeline is scoped and reverted on route/preference changes. */
export function mountCinema(root: HTMLElement, rail: HTMLElement | null) {
  const media = gsap.matchMedia();
  const q = (selector: string) => root.querySelectorAll<HTMLElement>(selector);
  const opening = root.querySelector<HTMLElement>(".opening-act")!;
  const philosophy = root.querySelector<HTMLElement>("#philosophy")!;
  const hero = root.querySelector<HTMLElement>(".hero")!;
  const label = rail?.querySelector("[data-act-label]");
  const progress = rail?.querySelector("[data-act-progress]");
  media.add(
    {
      desktop: "(min-width: 1000px) and (min-height: 760px)",
      small: "(max-width: 999px), (max-height: 759px)",
    },
    (context) => {
      const desktop = Boolean(context.conditions?.desktop);
      root.dataset.cinemaReady = desktop ? "desktop" : "small";
      const timeline = (trigger: HTMLElement, distance: number, pin = false) =>
        gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger,
            start: pin ? "top top" : "top 85%",
            end: pin ? () => `+=${innerHeight * distance}` : "top 15%",
            pin,
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

      // ACT I: approach the portal. The second scene occupies the same stage.
      const intro = timeline(
        desktop ? opening : hero,
        desktop ? 2.3 : 0.65,
        true,
      );
      intro
        .to(q(".hero-copy"), { y: -65, autoAlpha: 0, duration: 0.25 }, 0)
        .to(
          q(".portal-label, .hero-bottom"),
          { autoAlpha: 0, duration: 0.15 },
          0,
        )
        .to(
          q(".hero-visual"),
          {
            scale: desktop ? 3.8 : 1.65,
            xPercent: desktop ? -18 : -5,
            duration: 0.7,
          },
          0,
        )
        .fromTo(
          q(".portal-light"),
          { opacity: 0 },
          { opacity: 0.7, scale: 2, duration: 0.3 },
          0.22,
        )
        .to(q(".portal-light"), { opacity: 0, duration: 0.25 }, 0.52);
      if (desktop) {
        gsap.set(philosophy, { autoAlpha: 0 });
        intro
          .to(philosophy, { autoAlpha: 1, duration: 0.24 }, 0.5)
          .from(
            q(".standard-intro"),
            { y: 55, scale: 0.94, duration: 0.3 },
            0.5,
          )
          .from(
            q(".principle-grid article"),
            { y: 35, opacity: 0, stagger: 0.09, duration: 0.18 },
            0.72,
          )
          .to({}, { duration: 0.15 });
      } else {
        // Touch devices get a brief camera move; all later content stays in document flow.
        intro.to(q(".hero-visual"), { opacity: 0.2, duration: 0.18 }, 0.52);
        timeline(philosophy, 1).from(q(".standard-intro h2"), {
          y: 24,
          duration: 1,
        });
      }

      // ACT II: the display opens from its center, then stays available for browsing.
      const collection = root.querySelector<HTMLElement>("#collection")!;
      timeline(collection, 1)
        .from(
          q(".collection-scene .section-heading"),
          { x: desktop ? -70 : -18, duration: 0.45 },
          0,
        )
        .from(
          q(".product-explorer"),
          {
            clipPath: desktop ? "inset(0 42% 0 42%)" : "inset(8% 0 0 0)",
            y: 35,
            duration: 0.65,
          },
          0.1,
        );

      // ACT III: trace the maker's journey, with an independent orbit rather than another zoom.
      const makers = root.querySelector<HTMLElement>("#ecosystem")!;
      const network = timeline(makers, 1.05, desktop);
      const paths = root.querySelectorAll<SVGPathElement>(
        ".network-lines path",
      );
      paths.forEach((path) => {
        const length = path.getTotalLength();
        network.fromTo(
          path,
          { strokeDasharray: `${length}`, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.65 },
          0.1,
        );
      });
      network
        .from(
          q(".ecosystem-map"),
          { rotation: desktop ? -12 : -3, scale: 0.88, duration: 0.8 },
          0,
        )
        .from(
          q(".network-node"),
          { opacity: 0, stagger: 0.13, duration: 0.18 },
          0.2,
        )
        .from(
          q(".ecosystem-grid .scene-copy"),
          { x: desktop ? -45 : -12, duration: 0.5 },
          0,
        )
        .to({}, { duration: 0.2 });

      // ACT IV: a card turns into the light. Text and the membership link remain usable.
      const membership = root.querySelector<HTMLElement>("#membership")!;
      timeline(membership, 0.95, desktop)
        .fromTo(
          q("#membership .member-card"),
          { rotationY: desktop ? -45 : -15, rotationZ: -14, y: 50 },
          { rotationY: 0, rotationZ: -3, y: 0, duration: 0.8 },
          0,
        )
        .fromTo(
          q("#membership .member-card"),
          { "--card-light": "-100%" },
          { "--card-light": "100%", duration: 0.8 },
          0,
        )
        .from(q("#membership .scene-copy"), { y: 35, duration: 0.55 }, 0.15)
        .to({}, { duration: 0.2 });

      // CODA: the final word rises behind the invitation.
      timeline(root.querySelector<HTMLElement>(".closing")!, 1)
        .from(
          q(".closing-word"),
          { yPercent: 45, letterSpacing: "0.12em", duration: 1 },
          0,
        )
        .from(q(".closing-inner"), { y: 40, duration: 0.7 }, 0);

      const acts = [
        [hero, "01 / THE OPEN DOOR"],
        [philosophy, "02 / THE GENT STANDARD"],
        [collection, "03 / THE COLLECTION"],
        [makers, "04 / THE MAKERS"],
        [membership, "05 / GOOD COMPANY"],
        [root.querySelector<HTMLElement>(".closing")!, "06 / COME IN"],
      ] as const;
      const setProgress = progress
        ? gsap.quickSetter(progress, "scaleX")
        : undefined;
      let currentLabel = "";
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate(self) {
          setProgress?.(self.progress);
          let active: string = acts[0][1];
          for (const [node, title] of acts)
            if (node.getBoundingClientRect().top < innerHeight * 0.5)
              active = title;
          if (desktop && intro.scrollTrigger?.isActive)
            active =
              intro.scrollTrigger.progress < 0.53 ? acts[0][1] : acts[1][1];
          if (label && active !== currentLabel) {
            label.textContent = active;
            currentLabel = active;
          }
        },
      });

      // Anchor jumps bypass the film, including the overlaid standard's narrative position.
      const goToHash = (hash: string, focus = false) => {
        let id: string;
        try {
          id = decodeURIComponent(hash.slice(1));
        } catch {
          return false;
        }
        const target = document.getElementById(id);
        if (!target || !root.contains(target)) return false;
        const pinned = ScrollTrigger.getAll().find(
          (item) => item.trigger === target && item.pin,
        );
        const y =
          desktop && target === philosophy && intro.scrollTrigger
            ? intro.scrollTrigger.start +
              (intro.scrollTrigger.end - intro.scrollTrigger.start) * 0.96
            : pinned
              ? pinned.start + (pinned.end - pinned.start) * 0.9
              : target.getBoundingClientRect().top + scrollY - 96;
        window.scrollTo({ top: y, behavior: "instant" });
        ScrollTrigger.update();
        if (focus) {
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
        }
        return true;
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
          url.origin === location.origin &&
          url.pathname === location.pathname &&
          url.hash &&
          goToHash(url.hash, true)
        ) {
          event.preventDefault();
          history.pushState(null, "", url.hash);
        }
      };
      const hashChange = () => goToHash(location.hash);
      document.addEventListener("click", click, true);
      window.addEventListener("hashchange", hashChange);
      let cancelled = false;
      let frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      const alignInitialHash = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          if (cancelled) return;
          ScrollTrigger.refresh();
          if (location.hash) goToHash(location.hash);
        });
      };
      // Native hash positioning and image/font layout must settle before we choose a film beat.
      void document.fonts.ready.then(() => {
        if (cancelled) return;
        if (document.readyState === "complete") alignInitialHash();
        else window.addEventListener("load", alignInitialHash, { once: true });
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(frame);
        window.removeEventListener("load", alignInitialHash);
        document.removeEventListener("click", click, true);
        window.removeEventListener("hashchange", hashChange);
        root.removeAttribute("data-cinema-ready");
      };
    },
    root,
  );
  return () => {
    media.revert();
    root.removeAttribute("data-cinema-ready");
  };
}
