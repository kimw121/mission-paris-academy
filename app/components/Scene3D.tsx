

"use client";

import { useEffect, useRef } from "react";

import * as THREE from "three";

type Scene3DProps = {

  topic?: number;

  height?: number;

};

export default function Scene3D({

  topic = 0,

  height = 350,

}: Scene3DProps) {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const container = containerRef.current;

    if (!container) return;

    const scene = new THREE.Scene();

    scene.background = new THREE.Color("#f0ece7");

    const camera = new THREE.PerspectiveCamera(

      42,

      Math.max(container.clientWidth, 1) / height,

      0.1,

      100

    );

    camera.position.set(4.2, 3.1, 6.5);

    camera.lookAt(0, 0.35, 0);

    const renderer = new THREE.WebGLRenderer({

      antialias: true,

    });

    renderer.setPixelRatio(

      Math.min(window.devicePixelRatio || 1, 2)

    );

    renderer.setSize(

      Math.max(container.clientWidth, 1),

      height

    );

    renderer.shadowMap.enabled = true;

    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    container.appendChild(renderer.domElement);

    const ambient = new THREE.HemisphereLight(

      "#ffffff",

      "#9b8d83",

      2.5

    );

    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(

      "#ffffff",

      3.5

    );

    mainLight.position.set(4, 8, 5);

    mainLight.castShadow = true;

    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(

      "#c4d8ff",

      1.2

    );

    fillLight.position.set(-5, 3, -4);

    scene.add(fillLight);

    const platform = new THREE.Mesh(

      new THREE.CylinderGeometry(

        2.8,

        2.8,

        0.14,

        64

      ),

      new THREE.MeshStandardMaterial({

        color: "#ddd5ca",

        roughness: 0.8,

      })

    );

    platform.position.y = -0.85;

    platform.receiveShadow = true;

    scene.add(platform);

    const objectGroup = new THREE.Group();

    scene.add(objectGroup);

    function makeMesh(

      geometry: THREE.BufferGeometry,

      color: string,

      x = 0,

      y = 0,

      z = 0

    ) {

      const mesh = new THREE.Mesh(

        geometry,

        new THREE.MeshStandardMaterial({

          color,

          metalness: 0.08,

          roughness: 0.42,

        })

      );

      mesh.position.set(x, y, z);

      mesh.castShadow = true;

      mesh.receiveShadow = true;

      objectGroup.add(mesh);

      return mesh;

    }

    function box(

      width: number,

      boxHeight: number,

      depth: number,

      color: string,

      x = 0,

      y = 0,

      z = 0

    ) {

      return makeMesh(

        new THREE.BoxGeometry(

          width,

          boxHeight,

          depth

        ),

        color,

        x,

        y,

        z

      );

    }

    function sphere(

      radius: number,

      color: string,

      x = 0,

      y = 0,

      z = 0

    ) {

      return makeMesh(

        new THREE.SphereGeometry(

          radius,

          32,

          24

        ),

        color,

        x,

        y,

        z

      );

    }

    function cylinder(

      topRadius: number,

      bottomRadius: number,

      cylinderHeight: number,

      color: string,

      x = 0,

      y = 0,

      z = 0

    ) {

      return makeMesh(

        new THREE.CylinderGeometry(

          topRadius,

          bottomRadius,

          cylinderHeight,

          48

        ),

        color,

        x,

        y,

        z

      );

    }

    const mode = ((topic % 10) + 10) % 10;

    // 1. LES SALUTATIONS — CAFÉ

    if (mode === 0) {

      cylinder(1.45, 1.45, 0.12, "#78533f", 0, -0.2);

      cylinder(0.9, 0.9, 0.07, "#f5f0e9", 0, 0);

      cylinder(0.52, 0.42, 0.9, "#f7f4ef", 0, 0.46);

      cylinder(0.43, 0.43, 0.025, "#503025", 0, 0.93);

      const handle = makeMesh(

        new THREE.TorusGeometry(

          0.32,

          0.085,

          12,

          36

        ),

        "#f7f4ef",

        0.55,

        0.48

      );

      handle.rotation.y = Math.PI / 2;

    }

    // 2. L'ALPHABET — BLOCKS

    else if (mode === 1) {

      const colors = [

        "#bf6852",

        "#5e8293",

        "#bba066",

      ];

      for (let i = 0; i < 3; i++) {

        const block = box(

          1.15,

          1.15,

          1.15,

          colors[i],

          (i - 1) * 1.25,

          0.05 + (i === 1 ? 0.3 : 0)

        );

        block.rotation.y = (i - 1) * 0.18;

      }

    }

    // 3. LES NOMBRES — TRAIN

    else if (mode === 2) {

      box(3.5, 1.5, 1.35, "#b5c5c8", 0, 0.3);

      box(3.6, 0.22, 1.4, "#294f63", 0, 1.13);

      for (let i = -1; i <= 1; i++) {

        box(

          0.68,

          0.52,

          0.03,

          "#376077",

          i * 1.02,

          0.58,

          0.69

        );

      }

      for (const x of [-1.15, 1.15]) {

        const wheel = cylinder(

          0.38,

          0.38,

          0.22,

          "#30343b",

          x,

          -0.57,

          0.6

        );

        wheel.rotation.x = Math.PI / 2;

      }

    }

    // 4. MA FAMILLE ET MOI — PHOTO FRAME

    else if (mode === 3) {

      box(3.1, 2.35, 0.18, "#986b45", 0, 0.5);

      box(2.75, 2.0, 0.2, "#eee2d2", 0, 0.5, 0.1);

      const colors = [

        "#597c8c",

        "#ad665e",

        "#7c8b64",

      ];

      for (let i = 0; i < 3; i++) {

        const x = (i - 1) * 0.85;

        sphere(0.28, "#c79b77", x, 0.75, 0.3);

        cylinder(

          0.36,

          0.45,

          0.8,

          colors[i],

          x,

          0.02,

          0.3

        );

      }

    }

    // 5. LA MÉTÉO — WEATHER GLOBE

    else if (mode === 4) {

      sphere(1.15, "#5c92b2", 0, 0.45);

      for (let i = 0; i < 5; i++) {

        const angle = i * 1.3;

        sphere(

          0.26,

          "#8eb6a3",

          Math.cos(angle) * 1.04,

          0.45 + Math.sin(angle) * 0.7,

          Math.sin(angle) * 0.8

        );

      }

      for (let i = 0; i < 3; i++) {

        sphere(

          0.4,

          "#f5f5f2",

          -1.25 + i * 0.35,

          1.55 + i * 0.06,

          0.3

        );

      }

    }

    // 6. LES VÊTEMENTS — DRESS MANNEQUIN

    else if (mode === 5) {

      cylinder(0.3, 0.3, 0.12, "#49413e", 0, -0.65);

      cylinder(0.055, 0.055, 1, "#b4a6a0", 0, -0.18);

      makeMesh(

        new THREE.ConeGeometry(1, 1.8, 48),

        "#a74f60",

        0,

        0.42

      );

      sphere(0.35, "#d8b89b", 0, 1.4);

    }

    // 7. LES SAISONS — TREE

    else if (mode === 6) {

      cylinder(0.18, 0.23, 1.8, "#76513b", 0, 0.05);

      sphere(0.85, "#a6ad70", 0, 1.22);

      sphere(0.65, "#c6a06c", -0.5, 0.85);

      sphere(0.6, "#77916d", 0.55, 0.92);

    }

    // 8–9. DAYS AND MONTHS — CALENDAR

    else if (mode === 7 || mode === 8) {

      box(2.9, 2.5, 0.16, "#f7f4ed", 0, 0.35);

      box(2.9, 0.55, 0.19, "#a75e55", 0, 1.33);

      for (let row = 0; row < 3; row++) {

        for (let col = 0; col < 5; col++) {

          box(

            0.35,

            0.28,

            0.025,

            col === 2 && row === 1

              ? "#d0a55c"

              : "#c8c7c1",

            (col - 2) * 0.49,

            0.65 - row * 0.47,

            0.11

          );

        }

      }

    }

    // 10. MON ANNIVERSAIRE — CAKE

    else if (mode === 9) {

      cylinder(1.15, 1.15, 0.65, "#e6c3ad", 0, -0.25);

      cylinder(0.9, 0.9, 0.55, "#f1dfd0", 0, 0.35);

      cylinder(0.65, 0.65, 0.45, "#d6a0a5", 0, 0.85);

      for (let i = -1; i <= 1; i++) {

        cylinder(

          0.055,

          0.055,

          0.4,

          "#f8f1df",

          i * 0.28,

          1.25

        );

        sphere(

          0.09,

          "#f3b54d",

          i * 0.28,

          1.51

        );

      }

    }

    // DRAG TO ROTATE

    let dragging = false;

    let previousX = 0;

    let previousY = 0;

    const canvas = renderer.domElement;

    canvas.style.cursor = "grab";

    canvas.style.touchAction = "none";

    function pointerDown(event: PointerEvent) {

      dragging = true;

      previousX = event.clientX;

      previousY = event.clientY;

      canvas.setPointerCapture(event.pointerId);

      canvas.style.cursor = "grabbing";

    }

    function pointerMove(event: PointerEvent) {

      if (!dragging) return;

      const deltaX = event.clientX - previousX;

      const deltaY = event.clientY - previousY;

      objectGroup.rotation.y += deltaX * 0.009;

      objectGroup.rotation.x = THREE.MathUtils.clamp(

        objectGroup.rotation.x + deltaY * 0.006,

        -0.45,

        0.45

      );

      previousX = event.clientX;

      previousY = event.clientY;

    }

    function pointerUp() {

      dragging = false;

      canvas.style.cursor = "grab";

    }

    canvas.addEventListener("pointerdown", pointerDown);

    canvas.addEventListener("pointermove", pointerMove);

    canvas.addEventListener("pointerup", pointerUp);

    canvas.addEventListener("pointercancel", pointerUp);

    // RESPONSIVE SIZE

    const resizeObserver = new ResizeObserver(() => {

      const width = Math.max(container.clientWidth, 1);

      camera.aspect = width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(width, height);

    });

    resizeObserver.observe(container);

    // ANIMATION

    let animationFrame = 0;

    let running = true;

    function animate() {

      if (!running) return;

      animationFrame = requestAnimationFrame(animate);

      if (!dragging) {

        objectGroup.rotation.y += 0.002;

      }

      renderer.render(scene, camera);

    }

    animate();

    // CLEANUP

    return () => {

      running = false;

      cancelAnimationFrame(animationFrame);

      resizeObserver.disconnect();

      canvas.removeEventListener("pointerdown", pointerDown);

      canvas.removeEventListener("pointermove", pointerMove);

      canvas.removeEventListener("pointerup", pointerUp);

      canvas.removeEventListener("pointercancel", pointerUp);

      scene.traverse((child: THREE.Object3D) => {

        if (child instanceof THREE.Mesh) {

          child.geometry.dispose();

          const materials: THREE.Material[] =

            Array.isArray(child.material)

              ? child.material

              : [child.material];

          materials.forEach((material: THREE.Material) => {

            material.dispose();

          });

        }

      });

      renderer.dispose();

      if (container.contains(canvas)) {

        container.removeChild(canvas);

      }

    };

  }, [topic, height]);

  return (

    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-[#f0ece7]">

      <div

        ref={containerRef}

        style={{

          width: "100%",

          height: `${height}px`,

        }}

        aria-label={`Interactive 3D model for French lesson ${

          topic + 1

        }`}

      />

      <p className="px-4 pb-4 text-center text-xs font-medium text-stone-500">

        Drag to rotate the three-dimensional model

      </p>

    </div>

  );

}