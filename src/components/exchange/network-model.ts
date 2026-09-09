import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { networkStates } from "@/lib/network-geography";
export const LAFAYETTE = new THREE.Vector3(-0.38, -0.26, 0.28);
const LOGO = [
  [37, 14],
  [30, 7],
  [17, 7],
  [7, 17],
  [7, 31],
  [17, 41],
  [31, 41],
  [41, 31],
  [41, 23],
  [24, 23],
  [24, 30],
  [33, 30],
  [28, 35],
  [20, 35],
  [14, 29],
  [14, 20],
  [20, 14],
  [28, 14],
  [32, 18],
];
export type NetworkAsset = ReturnType<typeof createNetwork>;

/** Physical visual leaves sit below stable named animation pivots. +Z is the face. */
export function createNetwork(standard: boolean, graybox = false) {
  const root = new THREE.Group();
  root.name = "gent_network_root";
  function group(name: string, parent: THREE.Object3D = root) {
    const g = new THREE.Group();
    g.name = name;
    parent.add(g);
    return g;
  }
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const data = ctx.createImageData(128, 128);
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 128; x++) {
      const i = (y * 128 + x) * 4,
        v =
          196 +
          4 * Math.sin(x * 127.1 + y * 311.7) * Math.sin(x * 269.5 - y * 183.3);
      data.data[i] = data.data[i + 1] = data.data[i + 2] = v;
      data.data[i + 3] = 255;
    }
  ctx.putImageData(data, 0, 0);
  const grain = new THREE.CanvasTexture(canvas);
  grain.wrapS = grain.wrapT = THREE.RepeatWrapping;
  const mats = {
    titanium: new THREE.MeshPhysicalMaterial({
      color: "#141c18",
      metalness: 0.72,
      roughness: 0.44,
      roughnessMap: grain,
      clearcoat: 0.18,
    }),
    edge: new THREE.MeshStandardMaterial({
      color: "#566058",
      metalness: 0.92,
      roughness: 0.32,
    }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#0b2018",
      metalness: 0.42,
      roughness: 0.25,
      clearcoat: 0.7,
    }),
    gold: new THREE.MeshStandardMaterial({
      color: "#c4912f",
      metalness: 1,
      roughness: 0.31,
      emissive: "#c4912f",
      emissiveIntensity: 0.08,
    }),
    land: new THREE.MeshStandardMaterial({
      color: "#17221d",
      metalness: 0.65,
      roughness: 0.5,
      transparent: true,
      opacity: 0,
    }),
    border: new THREE.LineBasicMaterial({
      color: "#657066",
      transparent: true,
      opacity: 0,
    }),
    inlay: new THREE.MeshStandardMaterial({
      color: "#070d0a",
      metalness: 0.5,
      roughness: 0.5,
    }),
  };
  if (graybox) Object.values(mats).forEach((m) => m.color.set("#777777"));
  function mesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    parent: THREE.Object3D,
    x = 0,
    y = 0,
    z = 0,
  ) {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function box(
    parent: THREE.Object3D,
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    material: THREE.Material = mats.titanium,
    r = 0.035,
  ) {
    return mesh(
      new RoundedBoxGeometry(w, h, d, standard ? 2 : 3, r),
      material,
      parent,
      x,
      y,
      z,
    );
  }
  const retired = group("retired_visuals");
  retired.visible = false;
  const louisiana = group("louisiana");
  const shell = group("shell", louisiana),
    routing = group("routing", louisiana),
    intelligence = group("intelligence", louisiana);
  const shapeOf = (points: number[][]) =>
    new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
  const la = networkStates.find((s) => s.id === "22")!;
  const shapes = la.rings.map(shapeOf);
  function slab(parent: THREE.Group, depth: number, material: THREE.Material) {
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelSize: 0.009,
      bevelThickness: 0.009,
      bevelSegments: 2,
      steps: 1,
    });
    mesh(geo, material, parent);
    const line = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo, 38),
      new THREE.LineBasicMaterial({
        color: "#807250",
        transparent: true,
        opacity: 0.28,
      }),
    );
    parent.add(line);
  }
  slab(shell, 0.14, mats.titanium);
  slab(routing, 0.055, mats.edge);
  slab(intelligence, 0.085, mats.glass);
  const node = group("lafayette_node", louisiana);
  node.position.copy(LAFAYETTE);
  const nodeDisk = mesh(
    new THREE.CylinderGeometry(0.125, 0.125, 0.035, 48),
    mats.inlay,
    node,
  );
  nodeDisk.rotation.x = Math.PI / 2;
  const nodeRing = mesh(
    new THREE.TorusGeometry(0.14, 0.009, 6, 48),
    mats.gold,
    node,
    0,
    0,
    0.03,
  );
  const core = group("gent_core");
  const logoPoints = LOGO.map(
    ([x, y]) => new THREE.Vector2((x - 24) * 0.012, (24 - y) * 0.012),
  );
  const left: THREE.Vector2[] = [],
    right: THREE.Vector2[] = [];
  logoPoints.forEach((p, i) => {
    const prev = p
        .clone()
        .sub(logoPoints[Math.max(0, i - 1)])
        .normalize(),
      next = logoPoints[Math.min(logoPoints.length - 1, i + 1)]
        .clone()
        .sub(p)
        .normalize();
    if (i === 0) prev.copy(next);
    if (i === logoPoints.length - 1) next.copy(prev);
    const n = new THREE.Vector2(-prev.y, prev.x),
      bis = n.clone().add(new THREE.Vector2(-next.y, next.x)).normalize();
    bis.multiplyScalar(0.009 / Math.max(0.3, n.dot(bis)));
    left.push(p.clone().add(bis));
    right.push(p.clone().sub(bis));
  });
  mesh(
    new THREE.ExtrudeGeometry(new THREE.Shape([...left, ...right.reverse()]), {
      depth: 0.018,
      bevelEnabled: true,
      bevelSize: 0.003,
      bevelThickness: 0.003,
      bevelSegments: 2,
    }),
    mats.gold,
    core,
  );
  const mechanism = group("mechanism", louisiana);
  // Surface connections belong to the origin, not to a decorative mechanism.
  const channels = group("origin_channels", louisiana);
  const localStops = [
    [-0.58, 0.48], // northwestern Louisiana
    [-0.15, 0.52], // northern Louisiana
    [0.05, -0.18], // capital corridor
    [0.36, -0.43], // southeastern Louisiana
  ];
  const originCurves = localStops.map(([x, y]) => {
    const end = new THREE.Vector3(x, y, 0.22);
    const mid = LAFAYETTE.clone().lerp(end, 0.5);
    mid.z = 0.22;
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(LAFAYETTE.x, LAFAYETTE.y, 0.22), mid, end,
    );
    const path = mesh(new THREE.TubeGeometry(curve, 32, 0.007, 5, false), mats.gold, channels);
    const destination = mesh(new THREE.SphereGeometry(0.025, 12, 8), mats.gold, channels, x, y, 0.22);
    return { path, destination };
  });
  const unitedStates = group("united_states"),
    terrain = group("terrain", unitedStates);
  const nationalShapes = networkStates
    .filter((s) => s.id !== "22")
    .flatMap((s) => s.rings.map(shapeOf));
  const nationalGeometry = new THREE.ExtrudeGeometry(nationalShapes, {
    depth: 0.055,
    bevelEnabled: false,
  });
  mesh(nationalGeometry, mats.land, terrain, 0, 0, -0.35).name =
    "lower_48_relief";
  const nationalEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(nationalGeometry, 50),
    mats.border,
  );
  nationalEdges.position.z = -0.349;
  terrain.add(nationalEdges);
  const destinations = group("destination_nodes", unitedStates),
    anchors = group("route_anchors", unitedStates);
  const endpoints = [
    [-2.2, 0.12],
    [-7.6, 3.5],
    [0.3, 4],
    [3.1, 1.3],
    [4.6, 4.4],
    [-3.7, 3.3],
    [-6.6, 6.5],
  ];
  const routes = endpoints.map(([x, y], i) => {
    const end = new THREE.Vector3(x, y, -0.23),
      mid = LAFAYETTE.clone().lerp(end, 0.5);
    mid.z = 0.65 + Math.abs(x) * 0.09;
    const parent = [null, 0, 0, null, 3, 0, 5][i];
    const start = parent === null ? LAFAYETTE.clone() : new THREE.Vector3(...endpoints[parent], -0.23);
    mid.copy(start).lerp(end, 0.5);
    mid.z = 0.45 + Math.abs(end.x - start.x) * 0.06;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const material = mats.gold.clone();
    material.transparent = true;
    material.emissiveIntensity = 0.65;
    const path = mesh(
      new THREE.TubeGeometry(curve, 64, 0.012, 5, false),
      material,
      anchors,
    );
    path.name = `route_${i}`;
    const destination = group(`destination_${i}`, destinations);
    destination.position.copy(end);
    mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.028, 24),
      mats.edge,
      destination,
    ).rotation.x = Math.PI / 2;
    mesh(
      new THREE.TorusGeometry(0.09, 0.008, 5, 32),
      material,
      destination,
      0,
      0,
      0.02,
    );
    const pulse = mesh(
      new THREE.SphereGeometry(0.025, 8, 6),
      material,
      anchors,
    );
    return { curve, path, destination, pulse, material };
  });
  const transport = group("transport"),
    capsuleShell = group("capsule_shell", transport),
    capsuleCore = group("capsule_core", transport),
    seal = group("gent_seal", capsuleShell);
  box(capsuleCore, 2.6, 1.5, 0.64, 0, 0, 0);
  box(capsuleCore, 2.48, 1.38, 0.03, 0, 0, 0.34, mats.edge);
  box(capsuleCore, 2.39, 1.29, 0.06, 0, 0, 0.37, mats.inlay);
  // The high-resolution product cutouts are choreographed in the composited story plane.
  // Keep an empty fitted tray here; never use anonymous blocks as products.
  const products = group("product_reveal", capsuleCore);
  box(capsuleShell, 2.61, 1.51, 0.2, 0, 0, 0.58);
  box(capsuleShell, 2.58, 0.012, 0.015, 0, -0.53, 0.686, mats.gold, 0.003);
  for (const x of [-1.05, 1.05])
    box(capsuleShell, 0.025, 0.18, 0.01, x, -0.52, 0.69, mats.edge, 0.003);
  seal.position.set(0, 0.04, 0.71);
  const hud = group("hud_anchors");
  const source = group("source", hud);
  source.position.set(-3.7, 3.3, 0.2);
  return {
    root,
    retired,
    louisiana,
    shell,
    routing,
    intelligence,
    node,
    nodeRing,
    core,
    mechanism,
    channels,
    originCurves,
    unitedStates,
    terrain,
    routes,
    transport,
    capsuleShell,
    capsuleCore,
    products,
    seal,
    hud,
    source,
    mats,
  };
}

/** Dispose shared resources exactly once, including detached/replaced visual leaves. */
export function disposeNetwork(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>(),
    materials = new Set<THREE.Material>(),
    textures = new Set<THREE.Texture>();
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.geometry) geometries.add(m.geometry);
    if (m.material)
      for (const mat of Array.isArray(m.material) ? m.material : [m.material]) {
        materials.add(mat);
        Object.values(mat).forEach((v) => {
          if (v instanceof THREE.Texture) textures.add(v);
        });
      }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  textures.forEach((t) => t.dispose());
}
