/** Mobile playback owns only presentation; IntroDirector still owns time and scrolling. */
export function enterMobilePresentation(root: HTMLElement, exit: () => void) {
  if (!matchMedia('(max-width: 699px), (max-height: 550px) and (pointer: coarse)').matches) return;
  const placeholder = document.createElement('div');
  placeholder.style.height = `${root.getBoundingClientRect().height}px`;
  placeholder.setAttribute('aria-hidden', 'true');
  root.before(placeholder);
  const restore: (() => void)[] = [];
  // Neutralize containing blocks on older Safari as well as isolating background UI.
  let branch: HTMLElement = root;
  while (branch.parentElement) {
    const parent = branch.parentElement;
    for (const sibling of Array.from(parent.children)) {
      if (!(sibling instanceof HTMLElement) || sibling === branch || sibling === placeholder || ['SCRIPT','STYLE','LINK'].includes(sibling.tagName)) continue;
      const inert = sibling.inert, visibility = sibling.style.getPropertyValue('visibility'), priority = sibling.style.getPropertyPriority('visibility');
      sibling.inert = true;
      sibling.style.setProperty('visibility', 'hidden', 'important');
      restore.push(() => { sibling.inert = inert; if (visibility) sibling.style.setProperty('visibility', visibility, priority); else sibling.style.removeProperty('visibility'); });
    }
    if (parent !== document.body && parent !== document.documentElement) {
      for (const [property, value] of Object.entries({transform:'none',filter:'none',perspective:'none',contain:'none','clip-path':'none',overflow:'visible','z-index':'2147483647'})) {
        const old = parent.style.getPropertyValue(property), priority = parent.style.getPropertyPriority(property);
        parent.style.setProperty(property,value,'important');
        restore.push(() => { if (old) parent.style.setProperty(property,old,priority); else parent.style.removeProperty(property); });
      }
    }
    branch = parent;
  }
  const labelledBy = root.getAttribute('aria-labelledby');
  root.removeAttribute('aria-labelledby');
  root.dataset.immersive = 'true';
  root.setAttribute('role','dialog');
  root.setAttribute('aria-modal','true');
  root.setAttribute('aria-label','Gent Reserve cinematic');
  let active = true, enteredFullscreen = false;
  const fullscreen = () => {
    if (document.fullscreenElement === root) enteredFullscreen = true;
    else if (enteredFullscreen && active) exit();
  };
  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const buttons = Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')).filter(el => !el.hidden && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
    const first = buttons[0], last = buttons.at(-1);
    if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
  };
  document.addEventListener('fullscreenchange',fullscreen);
  document.addEventListener('keydown',trapFocus);
  // Called directly in the tap handler to preserve transient user activation.
  // Safari without element fullscreen, or a rejected request, keeps the fixed overlay.
  if (document.fullscreenEnabled && root.requestFullscreen) {
    try {
      void root.requestFullscreen({navigationUI:'hide'}).then(() => {
        if (!active && document.fullscreenElement === root) void document.exitFullscreen().catch(() => {});
      }).catch(() => {});
    } catch { /* Fixed viewport presentation is already active. */ }
  }
  return () => {
    active = false;
    document.removeEventListener('fullscreenchange',fullscreen);
    document.removeEventListener('keydown',trapFocus);
    if (document.fullscreenElement === root) void document.exitFullscreen().catch(() => {});
    delete root.dataset.immersive;
    root.removeAttribute('role'); root.removeAttribute('aria-modal'); root.removeAttribute('aria-label');
    if (labelledBy !== null) root.setAttribute('aria-labelledby',labelledBy);
    restore.reverse().forEach(fn => fn());
    placeholder.remove();
  };
}
