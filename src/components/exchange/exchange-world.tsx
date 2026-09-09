"use client";
/* eslint-disable react-hooks/immutability -- Three owns its mutable graph; useFrame applies absolute authored poses. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createStudioEnvironment } from "./exchange-studio";
import { disposeObject } from "./exchange-model";
import { cameraAt, exchangeSignal, filmAt, geometryAt, smooth } from "@/lib/exchange-film";
import { createNetwork, disposeNetwork, LAFAYETTE } from "./network-model";
export type HudPoint = { id: string; x: number; y: number; visible: boolean };
export type ExchangeWorldProps = {
  onFail: () => void;
  onReady: () => void;
  onProject: (points: HudPoint[]) => void;
};
function World({ onFail, onReady, onProject }: ExchangeWorldProps) {
  const { gl, scene, camera, size, invalidate } = useThree();
  const standard = size.width < 1000;
  const asset = useMemo(
    () =>
      createNetwork(
        standard,
        new URLSearchParams(location.search).has("animatic"),
      ),
    [standard],
  );
  const rendered = useRef(false),
    readyFrame = useRef(0),
    frameCount = useRef(0);
  const revealLight = useRef<THREE.PointLight>(null);
  const background = useRef<THREE.MeshBasicMaterial>(null);
  const point = useMemo(() => new THREE.Vector3(), []),
    sealPoint = useMemo(() => new THREE.Vector3(), []);
  useEffect(() => {
    rendered.current = false;
    const pmrem = new THREE.PMREMGenerator(gl),
      room = createStudioEnvironment(),
      env = pmrem.fromScene(room, 0.04, 0.1, 100);
    scene.environment = env.texture;
    scene.environmentIntensity = 0.85;
    disposeObject(room);
    pmrem.dispose();
    const update = () => invalidate();
    exchangeSignal.listeners.add(update);
    invalidate();
    const lost = (e: Event) => {
      e.preventDefault();
      onFail();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => {
      cancelAnimationFrame(readyFrame.current);
      exchangeSignal.listeners.delete(update);
      gl.domElement.removeEventListener("webglcontextlost", lost);
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene, invalidate, onFail]);
  useEffect(() => {
    let cancelled = false;
    const url = process.env.NEXT_PUBLIC_GENT_NETWORK_GLB;
    if (url)
      void import("./network-assets")
        .then((m) => m.replaceNetworkAsset(asset, url, () => cancelled))
        .then(() => invalidate())
        .catch(() => {
          /* Validated procedural leaves remain in place. */
        });
    return () => {
      cancelled = true;
      disposeNetwork(asset.root);
    };
  }, [asset, invalidate]);
  useFrame(() => {
    gl.domElement.dataset.frames = String(++frameCount.current);
    const story = exchangeSignal.progress,
      p = geometryAt(story),
      f = filmAt(p);
    if (revealLight.current) revealLight.current.intensity = f.reveal * 1.5;
    if (background.current) background.current.opacity = 1 - f.handoff;
    const framing =
      size.width < 700 && size.height > size.width
        ? "portrait"
        : size.width < 1100
          ? "tablet"
          : "desktop";
    const view = cameraAt(p, framing);
    camera.position.set(view[0], view[1], view[2]);
    camera.lookAt(view[3], view[4], view[5]);
    camera.updateMatrixWorld();
    const expand = smooth(0.27, 0.44, p),
      recede = smooth(0.62, 0.83, p);
    const nationalScale = framing === "portrait" ? 0.45 : 1;
    const originScale = 2.4 - (framing === "portrait" ? 1.55 : 1.4) * expand;
    asset.louisiana.scale.setScalar(originScale);
    asset.louisiana.position.set(0, 0, -recede * 2.5);
    asset.louisiana.rotation.z = -0.045 * (1 - expand);
    // Keep Louisiana assembled: the routes are engraved on its upper surface.
    asset.shell.position.z = 0.04;
    asset.routing.position.z = -0.15;
    asset.intelligence.position.z = -0.3;
    asset.mechanism.visible = false;
    asset.originCurves.forEach(({ path, destination }, i) => {
      const reveal = smooth(0.04 + i * 0.025, 0.16 + i * 0.025, p);
      path.geometry.setDrawRange(0, Math.floor(reveal * (path.geometry.index?.count ?? 0) / 30) * 30);
      destination.visible = reveal > 0.98;
    });
    asset.node.position.z = asset.shell.position.z + 0.19;
    asset.nodeRing.scale.setScalar(0.94 + 0.06 * f.ignition);
    asset.mats.gold.emissiveIntensity = 0.005 + f.ignition * 0.1;
    asset.mats.gold.color.setRGB(
      0.08 + 0.443 * f.ignition,
      0.062 + 0.221 * f.ignition,
      0.033 - 0.004 * f.ignition,
    );
    asset.mats.land.opacity = f.network * 0.88;
    asset.mats.border.opacity = f.network * 0.2;
    asset.unitedStates.visible = f.network > 0.001;
    asset.unitedStates.scale.setScalar(nationalScale);
    // Match the national route origin to the physical Lafayette node at every scale.
    asset.louisiana.updateMatrixWorld(true);
    asset.node.getWorldPosition(point);
    asset.unitedStates.position.copy(point).addScaledVector(LAFAYETTE, -nationalScale);
    asset.routes.forEach((r, i) => {
      const start = [0.285, 0.37, 0.37, 0.30, 0.39, 0.37, 0.455][i];
      const reveal = smooth(start, start + 0.075, p);
      r.path.geometry.setDrawRange(
        0,
        Math.floor((reveal * (r.path.geometry.index?.count ?? 0)) / 3) * 3,
      );
      r.destination.visible = reveal > 0.96;
      r.material.opacity =
        f.network * (1 - smooth(0.533, 0.6, p) * (i === 3 ? 0 : 0.78));
      const travel = reveal;
      r.pulse.visible = travel > 0 && travel < 1;
      r.curve.getPoint(travel, r.pulse.position);
    });
    const movement = smooth(0.533, 0.695, p);
    asset.transport.visible = p > 0.533;
    asset.transport.position.set(
      3.1 - 2.1 * movement,
      1.3 - 1.05 * movement,
      0.2 + 3.1 * movement,
    );
    asset.transport.scale.setScalar((0.08 + 0.92 * movement) * (1 - .65*smooth(.60,.75,story)));
    asset.transport.rotation.set(
      -0.08 * (1 - f.delivery),
      -0.3 + 0.18 * f.delivery,
      0.035 * (1 - f.delivery),
    );
    asset.capsuleShell.position.set(0, f.delivery * 0.55 + f.reveal * 0.8, f.delivery * 0.38 - f.reveal * 0.3);
    asset.products.position.z = f.reveal * 0.42;

    asset.capsuleShell.rotation.x = -f.delivery * 0.28;
    asset.root.updateMatrixWorld(true);
    // One continuous G moves from recessed origin to authentication on the module.
    asset.node.getWorldPosition(point);
    const seal = asset.seal.getWorldPosition(sealPoint);
    asset.core.position.copy(point).lerp(seal, smooth(0.565, 0.73, p));
    asset.core.position.z +=
      0.1 + Math.sin(smooth(0.565, 0.73, p) * Math.PI) * 1.2;
    asset.core.scale.setScalar(
      0.45 * originScale * (1 - smooth(0.565, 0.73, p)) +
        (0.75 + f.ascension * 0.6) * smooth(0.565, 0.73, p),
    );
    asset.core.position.y += f.ascension * 0.75;
    asset.core.visible = story < .48;
    asset.core.position.z += f.ascension * 0.2;
    asset.core.rotation.set(
      asset.transport.rotation.x * smooth(0.565, 0.73, p),
      asset.transport.rotation.y * smooth(0.565, 0.73, p),
      asset.transport.rotation.z * smooth(0.565, 0.73, p),
    );
    scene.environmentIntensity = 0.38 + 0.52 * f.ignition + 0.22 * f.reveal;
    asset.mats.gold.emissiveIntensity += f.reveal * 0.18;
    const project = (id: string, object: THREE.Object3D): HudPoint => {
      object.getWorldPosition(point);
      point.project(camera);
      return {
        id,
        x: (point.x * 0.5 + 0.5) * size.width,
        y: (-0.5 * point.y + 0.5) * size.height,
        visible:
          p > 0.37 &&
          p < 0.67 &&
          point.z < 1 &&
          Math.abs(point.x) < 0.75 &&
          (point.x * 0.5 + 0.5) * size.width < size.width - 180 &&
          point.y < 0.5 &&
          point.y > -0.35,
      };
    };
    onProject([
      project("origin", asset.node),
      project("destination", asset.routes[3].destination),
    ]);
    if (!rendered.current) {
      rendered.current = true;
      readyFrame.current = requestAnimationFrame(onReady);
    }
  });
  return (
    <>
      <primitive object={asset.root} />
      <pointLight ref={revealLight} position={[1, 0.5, 4.5]} intensity={0} color="#82bf95" distance={8} decay={2} />
      <directionalLight position={[-4, 5, 9]} intensity={1.6} color="#f3e8cc" />
      <directionalLight position={[5, -1, 4]} intensity={1.2} color="#c0cfc6" />
      <directionalLight
        position={[-4, -3, 2]}
        intensity={0.2}
        color="#c4912f"
      />
      <mesh position={[0, 0, -4]}>
        <planeGeometry args={[80, 60]} />
        <meshBasicMaterial
          ref={background}
          color="#030a07"
          transparent
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
export function ExchangeWorld(props: ExchangeWorldProps) {
  return (
    <Canvas
      className="exchange-webgl"
      frameloop="demand"
      dpr={[1, innerWidth < 1000 ? 1.25 : 1.5]}
      camera={{ position: [2, -3, 11], fov: 38, near: 0.1, far: 80 }}
      gl={(defaults) => {
        try {
          return new THREE.WebGLRenderer({
            ...defaults,
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          });
        } catch (error) {
          // R3F configures asynchronously, outside the React error boundary.
          // Release the entrance explicitly even when no context was created.
          queueMicrotask(props.onFail);
          throw error;
        }
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1;
      }}
      fallback={null}
    >
      <World {...props} />
    </Canvas>
  );
}
