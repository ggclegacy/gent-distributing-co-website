/** Single film signal shared by GSAP, the camera, geometry, lighting and copy.
 * Values are absolute: reverse scrolling and resize never accumulate transforms. */
export type Framing = "portrait" | "tablet" | "desktop";
export const EXCHANGE_DURATION = 45;
export const exchangeSignal = {
  progress: 0,
  listeners: new Set<() => void>(),
  set(progress: number) {
    const next = Math.max(0, Math.min(1, progress));
    if (next === this.progress) return;
    this.progress = next;
    this.listeners.forEach((fn) => fn());
  },
};
export const smooth = (a: number, b: number, p: number) => {
  const x = Math.max(0, Math.min(1, (p - a) / (b - a)));
  return x * x * (3 - 2 * x);
};
export const windowAt = (a: number, b: number, p: number, fade = 0.025) =>
  smooth(a, a + fade, p) * (1 - smooth(b - fade, b, p));
export const beats = [
  ["ORIGIN", "Great things begin somewhere."],
  ["DISCOVERY", "Find what deserves to go further."],
  ["DEVELOPMENT", "Shape every detail."],
  ["THE GENT STANDARD", "Give exceptional a standard."],
  ["THE COLLECTION", "A family of exceptional goods."],
  ["DISTRIBUTION", "Connect the maker to the moment."],
  ["ARRIVAL", "The journey becomes an experience."],
  ["GENT", "Louisiana born. Built to move further."],
];
export const INTRO_BEATS = [
  { name: "Ignition", at: 0, duration: 3.2, progress: 0.10 },
  { name: "Discovery", at: 4.5, duration: 4.1, progress: 0.22 },
  { name: "Development", at: 10, duration: 3.7, progress: 0.34 },
  { name: "Authentication", at: 15, duration: 3.6, progress: 0.45 },
  { name: "Product Reveal", at: 20, duration: 5.5, progress: 0.60 },
  { name: "Network Expansion", at: 27, duration: 5.5, progress: 0.77 },
  { name: "Arrival", at: 34, duration: 3.5, progress: 0.87 },
  { name: "Brand Ascension", at: 39, duration: 3, progress: 1 },
  { name: "Hero Hold", at: 42, duration: 3, progress: 1 },
] as const;
export function beatAt(p: number) {
  return p < .10 ? 0 : p < .22 ? 1 : p < .34 ? 2 : p < .45 ? 3 : p < .60 ? 4 : p < .77 ? 5 : p < .87 ? 6 : 7;
}
/** Keep the established Louisiana/case geometry, independently scored within the story. */
export function geometryAt(p: number) {
  const keys = [[0,0],[.10,.286],[.34,.286],[.45,.533],[.49,.695],[.60,1],[1,1]];
  let i=0; while(i<keys.length-2 && p>keys[i+1][0]) i++;
  const [a,x]=keys[i], [b,y]=keys[i+1];
  return x+(y-x)*Math.max(0,Math.min(1,(p-a)/(b-a)));
}
export function storyAt(p: number) {
  const product = smooth(.105,.155,p);
  const reveal = smooth(.49,.595,p);
  const distribution = smooth(.60,.69,p);
  const arrival = smooth(.77,.82,p) * (1-smooth(.86,.9,p));
  const brand = smooth(.88,1,p);
  return {
    product, reveal, distribution, arrival, brand,
    studio: smooth(.10,.16,p)*(1-smooth(.40,.46,p)),
    dossier: smooth(.14,.18,p)*(1-smooth(.43,.47,p)),
    scan: smooth(.34,.39,p)*(1-smooth(.45,.49,p)),
    graph: smooth(.60,.67,p)*(1-smooth(.77,.82,p)),
    branches: smooth(.65,.735,p),
    destination: smooth(.70,.77,p),
    detail: smooth(.22,.32,p),
    // Product temporarily nests in the case, then rises into the collection.
    size: 1 - .55*smooth(.43,.49,p) + .35*reveal - .32*distribution + .23*brand,
    lift: 20*smooth(.43,.49,p)-24*reveal+4*distribution,
    spread: 30*reveal - 9*distribution + 14*brand,
    world: 1-.93*smooth(.105,.155,p)+.65*smooth(.43,.49,p)-.5*distribution,
  };
}
type Key = [number, number, number, number, number, number, number];
// p, eye x/y/z, look x/y/z. Portrait is authored separately, never CSS-scaled.
const cameras: Record<Framing, Key[]> = {
  desktop: [
    [0, 2.1, -3.4, 13, 0, -0.7, 0],
    [0.114, 1.5, -2.4, 12, 0, -0.7, 0],
    [0.286, 2.5, -3.5, 12, 0, 0.7, 0],
    [0.45, -1, -7, 20, -2, 2, 0],
    [0.533, -1, -7, 20, -2, 2, 0],
    [0.695, 2, -2.5, 13, 1, 0.6, 2],
    [0.829, 1.5, -1.2, 12, 1, 0.6, 2],
    [1, 0.5, 0.1, 13, 1, 0.9, 2],
  ],
  tablet: [
    [0, 1, -2.6, 14, 0, -0.7, 0],
    [0.114, 0.8, -2.2, 13, 0, -0.7, 0],
    [0.286, 1.5, -3, 13, 0, 0.5, 0],
    [0.45, -1, -4, 21, -2, 2, 0],
    [0.533, -1, -4, 21, -2, 2, 0],
    [0.695, 1.5, -2, 14, 1, 0.6, 2],
    [0.829, 1.3, -1, 13, 1, 0.6, 2],
    [1, 0.7, 0.1, 14, 1, 0.9, 2],
  ],
  portrait: [
    [0, 0.8, -2.2, 16, 0, -1.25, 0],
    [0.114, 0.6, -1.8, 15, 0, -1.25, 0],
    [0.286, 1, -2.5, 17, 0, 0.7, 0],
    [0.45, 0, -3, 24, -1, 2, 0],
    [0.533, 0, -3, 24, -1, 2, 0],
    [0.695, 1.2, -2, 14, 1, 0.8, 2],
    [0.829, 1.2, -1, 15, 1, 0.8, 2],
    [1, 1.2, -0.5, 15, 1, 0.8, 2],
  ],
};
export function cameraAt(p: number, framing: Framing) {
  const keys = cameras[framing];
  let i = 0;
  while (i < keys.length - 2 && p > keys[i + 1][0]) i++;
  const a = keys[i],
    b = keys[i + 1],
    t = smooth(a[0], b[0], p);
  return a.slice(1).map((v, j) => v + (b[j + 1] - v) * t);
}
export function filmAt(p: number) {
  return {
    ignition: smooth(0, 0.114, p),
    unfold: smooth(0.114, 0.286, p),
    network: smooth(0.286, 0.43, p) * (1 - smooth(0.69, 0.86, p)) + smooth(0.85, 0.94, p) * 0.3,
    movement: smooth(0.533, 0.695, p),
    delivery: smooth(0.695, 0.829, p),
    handoff: smooth(0.94, 1, p) * 0.25,
    reveal: smooth(0.829, 0.89, p),
    ascension: smooth(0.91, 1, p),
    beat: beatAt(p),
  };
}
