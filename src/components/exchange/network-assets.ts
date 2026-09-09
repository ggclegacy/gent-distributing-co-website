import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import type { NetworkAsset } from "./network-model";
import { disposeNetwork } from "./network-model";

/** Replacement leaves use local coordinates beneath code-owned animation pivots.
 * Validate every node before mutating anything. An invalid optional GLB is harmless. */
export async function replaceNetworkAsset(
  asset: NetworkAsset,
  url: string,
  cancelled: () => boolean,
) {
  const parsed = new URL(url, location.origin);
  if (parsed.origin !== location.origin)
    throw new Error("Network assets must be same-origin");
  const gltf = await new GLTFLoader()
    .setMeshoptDecoder(MeshoptDecoder)
    .loadAsync(parsed.href);
  if (cancelled()) {
    disposeNetwork(gltf.scene);
    return;
  }
  const targets = [
    asset.shell,
    asset.intelligence,
    asset.capsuleShell,
    asset.capsuleCore,
  ];
  const replacements = targets.map((target) => ({
    target,
    source: gltf.scene.getObjectByName(target.name),
  }));
  if (replacements.some((r) => !r.source)) {
    disposeNetwork(gltf.scene);
    throw new Error("Network GLB does not satisfy the visual-leaf contract");
  }
  for (const { source } of replacements) {
    // Incoming leaves may not own one another: the GLB contract is deliberately flat.
    if (
      replacements.some(
        (r) => r.source !== source && source!.getObjectById(r.source!.id),
      )
    ) {
      disposeNetwork(gltf.scene);
      throw new Error("Nested replacement pivots are invalid");
    }
    if (!source!.children.length) {
      disposeNetwork(gltf.scene);
      throw new Error("Empty replacement pivot");
    }
  }
  for (const { target, source } of replacements) {
    for (const child of [...target.children]) {
      asset.retired.add(child);
    }
    target.add(source!);
    source!.position.set(0, 0, 0);
    source!.rotation.set(0, 0, 0);
    source!.scale.set(1, 1, 1);
  }
  asset.retired.add(gltf.scene);
  return gltf.scene;
}
