/** Single film signal shared by GSAP, the camera, geometry, lighting and copy.
 * Values are absolute: reverse scrolling and resize never accumulate transforms. */
export type Framing = 'portrait' | 'tablet' | 'desktop';
export const EXCHANGE_DURATION = 12;
export const exchangeSignal = {
  progress: 0,
  listeners: new Set<() => void>(),
  set(progress: number) {
    this.progress = Math.max(0, Math.min(1, progress));
    this.listeners.forEach(fn => fn());
  },
};
export const smooth = (a: number, b: number, p: number) => {
  const x = Math.max(0, Math.min(1, (p-a)/(b-a)));
  return x*x*(3-2*x);
};
export const windowAt = (a: number, b: number, p: number, fade = .025) => smooth(a,a+fade,p)*(1-smooth(b-fade,b,p));
export const beats = [
  ['ARTIFACT', 'A world of possibility.'],
  ['RECOGNITION', 'Lafayette, Louisiana.'],
  ['PRECISION', 'Every detail earns its place.'],
  ['DISCOVERY', 'Different categories. One standard.'],
  ['NETWORK', 'An origin. An open horizon.'],
  ['COLLECTION', 'A house of exceptional goods.'],
  ['REASSEMBLY', 'Everything finds its purpose.'],
  ['CAMPAIGN', 'Rooted here. Built to move further.'],
  ['PORTAL', 'Enter the Gent standard.'],
];
export function beatAt(p: number) { return p<.08?0:p<.17?1:p<.28?2:p<.55?3:p<.64?4:p<.73?5:p<.84?6:p<.94?7:8; }
type Key = [number, number, number, number, number, number, number];
// p, eye x/y/z, look x/y/z. Portrait is authored separately, never CSS-scaled.
const cameras: Record<Framing, Key[]> = {
 desktop: [[0,3.4,1.6,5.6,0,.4,0],[.08,3,.8,11.5,0,0,0],[.17,4,1.4,11,0,0,0],[.27,3.2,.7,12,0,0,0],[.32,.35,.25,8,0,0,2],[.37,.35,.25,8,0,0,2],[.41,-.4,.1,8,0,0,2],[.46,-.4,.1,8,0,0,2],[.50,.4,.2,8,0,0,2],[.54,.4,.2,8,0,0,2],[.60,1.2,2.8,12,0,0,-1],[.68,3,1.5,14,0,0,0],[.75,2,.8,12,0,0,0],[.84,1.5,.4,10.5,0,0,0],[.92,1.5,.4,10.5,0,0,0],[.97,0,0,2.3,0,0,-4],[1,0,0,-5,0,0,-10]],
 tablet: [[0,2,1,6,0,.3,0],[.08,2,.6,13,0,0,0],[.17,3,1,13,0,0,0],[.27,2,.7,13,0,0,0],[.32,.2,.1,8,0,0,2],[.37,.2,.1,8,0,0,2],[.41,-.3,.1,8,0,0,2],[.46,-.3,.1,8,0,0,2],[.50,.2,.1,8,0,0,2],[.54,.2,.1,8,0,0,2],[.60,1,2,14,0,0,-1],[.68,2,1,15,0,0,0],[.75,1,.5,13,0,0,0],[.84,1,.3,12,0,0,0],[.92,1,.3,12,0,0,0],[.97,0,0,2.3,0,0,-4],[1,0,0,-5,0,0,-10]],
 portrait: [[0,1.4,1,6.8,0,.3,0],[.08,1.8,.6,16,0,.1,0],[.17,2.4,.9,16,0,.1,0],[.27,1.5,.5,15,0,0,0],[.32,.15,.2,8,0,.1,2],[.37,.15,.2,8,0,.1,2],[.41,-.2,.15,8,0,.1,2],[.46,-.2,.15,8,0,.1,2],[.50,.2,.15,8,0,.1,2],[.54,.2,.15,8,0,.1,2],[.60,.7,2,16,0,0,-1],[.68,1.4,.8,17,0,0,0],[.75,1,.5,15,0,0,0],[.84,.6,.3,14,0,0,0],[.92,.6,.3,14,0,0,0],[.97,0,0,2.3,0,0,-4],[1,0,0,-5,0,0,-10]],
};
export function cameraAt(p: number, framing: Framing) {
 const keys=cameras[framing]; let i=0;
 while(i<keys.length-2 && p>keys[i+1][0]) i++;
 const a=keys[i],b=keys[i+1],t=smooth(a[0],b[0],p);
 return a.slice(1).map((v,j)=>v+(b[j+1]-v)*t);
}
export function filmAt(p: number) {
 return { explosion: smooth(.16,.28,p)*(1-smooth(.73,.83,p)),
  products: smooth(.26,.30,p), network: windowAt(.55,.66,p),
  portal: smooth(.945,1,p), beat:beatAt(p) };
}
