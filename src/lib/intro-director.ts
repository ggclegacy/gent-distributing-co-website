import { gsap } from "gsap";
import { exchangeSignal, INTRO_BEATS } from "./exchange-film";

// Keep the authored duration under a delayed GPU frame.
gsap.ticker.lagSmoothing(0);

export type IntroState =
  | "DORMANT"
  | "PREPARING"
  | "READY"
  | "PLAYING"
  | "RESOLVING"
  | "EXPLORE"
  | "SKIPPED"
  | "FALLBACK";
export type IntroMode = "full" | "reduced" | "fallback";
export const INTRO_SESSION_KEY = "gent-network-complete";

/** The only writer of the entrance signal. PageDirector never imports this signal.
 * Readiness, motion changes, navigation and replay all pass through this owner. */
export class IntroDirector {
  state: IntroState = "DORMANT";
  mode: IntroMode = "full";
  private userPaused = false;
  private hidden = false;
  private ready = false;
  private requested = false;
  private disposed = false;
  private timeline?: gsap.core.Timeline;
  private watchdog?: ReturnType<typeof setTimeout>;
  private unlock?: () => void;
  constructor(private notify: (state: IntroState) => void) {
    exchangeSignal.set(0);
  }

  private transition(state: IntroState) {
    if (this.disposed) return;
    this.state = state;
    this.notify(state);
  }
  restore() {
    try {
      if (sessionStorage.getItem(INTRO_SESSION_KEY) === "yes")
        this.complete("EXPLORE");
    } catch {
      /* Private browsing keeps the entrance usable. */
    }
  }
  setReady() {
    this.ready = true;
    if (this.requested && this.state === "PREPARING") this.play();
    else if (this.state === "DORMANT") this.transition("READY");
  }
  setMode(mode: IntroMode) {
    if (this.mode === mode) return;
    this.mode = mode;
    if (mode !== "full") {
      this.ready = false;
      if (["PREPARING", "PLAYING", "RESOLVING"].includes(this.state)) {
        this.timeline?.kill();
        this.dissolve();
      } else if (this.state === "DORMANT")
        this.transition(mode === "fallback" ? "FALLBACK" : "READY");
    }
  }
  activate() {
    if (this.disposed || this.requested || this.state === "EXPLORE") return;
    this.requested = true;
    this.lockScroll();
    if (this.ready || this.mode !== "full") this.play();
    else {
      this.transition("PREPARING");
      this.watchdog = setTimeout(() => this.setMode("fallback"), 8000);
    }
  }
  private play() {
    clearTimeout(this.watchdog);
    if (this.mode !== "full") {
      this.dissolve();
      return;
    }
    performance.clearMarks("gent:intro-start");
    performance.clearMarks("gent:hero-hold");
    performance.clearMarks("gent:intro-complete");
    performance.mark("gent:intro-start");
    this.transition("PLAYING");
    const playhead = { progress: 0 };
    exchangeSignal.set(0);
    this.timeline = gsap.timeline({
      onComplete: () => {
        performance.mark("gent:intro-complete");
        this.complete("EXPLORE");
      },
    });
    for (const beat of INTRO_BEATS) {
      this.timeline.addLabel(beat.name, beat.at);
      this.timeline.to(playhead, {
        progress: beat.progress,
        duration: beat.duration,
        ease: "none",
        onUpdate: () => exchangeSignal.set(playhead.progress),
      }, beat.name);
    }
    this.timeline.call(() => this.transition("RESOLVING"), [], "Brand Ascension");
    this.timeline.call(() => { performance.mark("gent:hero-hold"); }, [], "Hero Hold");
    this.hidden = document.hidden;
    this.timeline.paused(this.hidden || this.userPaused);
  }
  setVisibility(hidden: boolean) {
    this.hidden = hidden;
    this.timeline?.paused(hidden || this.userPaused);
  }
  setPaused(paused: boolean) {
    this.userPaused = paused;
    this.timeline?.paused(paused || this.hidden);
  }
  /** Adjust the complete score without changing its internal rhythm. */
  setTimeScale(scale: number) {
    this.timeline?.timeScale(Math.max(0.1, scale));
  }

  private dissolve() {
    clearTimeout(this.watchdog);
    this.transition("RESOLVING");
    // The static completed pose dissolves in; no camera/depth travel is sampled.
    exchangeSignal.set(1);
    this.timeline = gsap.timeline({
      onComplete: () => this.complete("EXPLORE"),
    });
    this.userPaused = false;
    this.timeline.to({}, { duration: 0.85 });
    this.timeline.paused(document.hidden);
  }
  skip() {
    if (!this.disposed && this.state !== "EXPLORE") this.complete("SKIPPED");
  }
  private complete(reason: "EXPLORE" | "SKIPPED") {
    this.timeline?.kill();
    clearTimeout(this.watchdog);
    exchangeSignal.set(1);
    this.unlock?.();
    this.unlock = undefined;
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "yes");
    } catch {}
    if (reason === "SKIPPED") this.transition("SKIPPED");
    this.transition("EXPLORE");
  }
  /** Local production-art review only; never enabled in a production bundle. */
  preview(progress: number) {
    if (process.env.NODE_ENV !== "development") return;
    this.timeline?.kill();
    this.transition(
      progress >= 1 ? "EXPLORE" : progress > 0 ? "PLAYING" : "READY",
    );
    exchangeSignal.set(progress);
  }
  replay() {
    this.timeline?.kill();
    clearTimeout(this.watchdog);
    this.unlock?.();
    this.unlock = undefined;
    this.requested = false;
    this.userPaused = false;
    exchangeSignal.set(0);
    this.transition(this.ready ? "READY" : "DORMANT");
    this.activate();
  }
  private lockScroll() {
    if (this.unlock) return;
    const html = document.documentElement,
      body = document.body;
    const y = scrollY,
      x = scrollX;
    const saved = {
      overflow: html.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflowBody: body.style.overflow,
    };
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `${-y}px`;
    body.style.left = `${-x}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    this.unlock = () => {
      html.style.overflow = saved.overflow;
      Object.assign(body.style, {
        position: saved.position,
        top: saved.top,
        left: saved.left,
        width: saved.width,
        overflow: saved.overflowBody,
      });
      // Restore the captured position, never use scroll to play the entrance.
      window.scrollTo({ top: y, left: x, behavior: "instant" });
    };
  }
  dispose() {
    this.disposed = true;
    this.timeline?.kill();
    clearTimeout(this.watchdog);
    this.unlock?.();
    this.unlock = undefined;
  }
}
