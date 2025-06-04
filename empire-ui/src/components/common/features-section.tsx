"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MinecartLCD } from "@/lib/fonts";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import img4 from '@/images/img4.png';
import { AnimatedArrowDynamic } from '@/components/ui/animated-arrow';
import * as THREE from 'three';

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackImageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);
  const isHoveringRef = useRef(false);
  const imageAspectRef = useRef<number>(1);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const initialDataRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const startOffset = windowHeight;
      const endOffset = -sectionHeight;
      const totalDistance = startOffset - endOffset;
      const currentPosition = rect.top;
      
      let progress = (startOffset - currentPosition) / totalDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Grid Distortion Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.borderRadius = '50px';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const vertexShader = `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uDataTexture;
      uniform sampler2D uTexture;
      uniform vec4 resolution;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv;
        vec4 offset = texture2D(uDataTexture, vUv);
        gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
      }
    `;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null as THREE.Texture | null },
      uDataTexture: { value: null as THREE.DataTexture | null },
    };

    const textureLoader = new THREE.TextureLoader();
    
    // Convert the imported image to a proper path for Three.js
    const imagePath = img4.src || '/images/img4.png';
    
    textureLoader.load(
      imagePath,
      (texture) => {
        texture.minFilter = THREE.LinearFilter;
        imageAspectRef.current = texture.image.width / texture.image.height;
        uniforms.uTexture.value = texture;
        setIsThreeLoaded(true);
        if (fallbackImageRef.current) {
          fallbackImageRef.current.style.display = 'none';
        }
        handleResize();
      },
      undefined,
      (error) => {
        console.error('Failed to load texture:', error);
        // Keep fallback image visible
        setIsThreeLoaded(false);
      }
    );

    const grid = 15;
    const mouse = 0.1;
    const strength = 0.15;
    const relaxation = 0.9;
    
    const size = grid;
    const data = new Float32Array(4 * size * size);
    // Initialize with zeros (no distortion) instead of random values
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = 0;     // R channel - no distortion
      data[i * 4 + 1] = 0; // G channel - no distortion
      data[i * 4 + 2] = 0; // B channel - unused
      data[i * 4 + 3] = 0; // A channel - unused
    }
    initialDataRef.current = new Float32Array(data);

    const dataTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const containerAspect = width / height;
      const imageAspect = imageAspectRef.current;

      renderer.setSize(width, height);

      // Calculate scale to cover entire container (like CSS object-fit: cover)
      const scale = Math.max(containerAspect / imageAspect, 1 / (containerAspect / imageAspect));
      
      if (containerAspect > imageAspect) {
        // Container is wider than image - scale to fit width
        plane.scale.set(scale * imageAspect, scale, 1);
      } else {
        // Container is taller than image - scale to fit height
        plane.scale.set(imageAspect * scale, scale, 1);
      }

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);
    };

    const mouseState = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vX: 0,
      vY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHoveringRef.current) return; // Only track mouse when hovering
      
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    };

    // Only listen for mouse movement to track position, hover is handled by React
    container.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.time.value += 0.05;

      const data = dataTexture.image.data as Float32Array;
      
      // Always apply relaxation to smooth out distortions
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      // Only apply mouse distortion when hovering
      if (isHoveringRef.current) {
        const gridMouseX = size * mouseState.x;
        const gridMouseY = size * mouseState.y;
        const maxDist = size * mouse;

        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const distSq =
              Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
            if (distSq < maxDist * maxDist) {
              const index = 4 * (i + size * j);
              const power = Math.min(maxDist / Math.sqrt(distSq), 10);
              data[index] += strength * 100 * mouseState.vX * power;
              data[index + 1] -= strength * 100 * mouseState.vY * power;
            }
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      dataTexture.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen bg-[#202020] overflow-hidden mt-16"
    >
      {/* Content Container - Pulled up to start closer to previous section */}
      <div className="w-[1450px] max-w-[95%] mx-auto mt-4">
        <div 
          className="relative w-full h-[660px] rounded-[50px] overflow-hidden bg-black group"
          onMouseEnter={() => {
            console.log('Hovering over feature card');
            isHoveringRef.current = true;
          }}
          onMouseLeave={() => {
            console.log('Left feature card');
            isHoveringRef.current = false;
            // Reset mouse state for clean transition
            if (containerRef.current) {
              const mouseState = {
                x: 0,
                y: 0,
                prevX: 0,
                prevY: 0,
                vX: 0,
                vY: 0,
              };
            }
          }}
        >
          
          {/* Fallback Image - Always present, hidden when Three.js loads */}
          <div 
            ref={fallbackImageRef}
            className="absolute inset-0 z-0"
            style={{ display: isThreeLoaded ? 'none' : 'block' }}
          >
            <Image 
              src={img4}
              alt="Features Device" 
              fill
              className="object-cover" 
              style={{ objectPosition: 'center center' }}
              priority
            />
          </div>

          {/* Three.js Grid Distortion Background */}
          <div 
            ref={containerRef}
            className="absolute inset-0 z-1 w-full h-full"
            style={{ borderRadius: '50px' }}
          />

          {/* Features Title - Moved up as requested */}
          <div className="absolute top-[8%] left-[5%] z-20 max-w-[40%]">
            <h1 className={cn("text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight", MinecartLCD.className)}>
              Features
            </h1>
            <p className={cn("text-gray-300 text-lg leading-relaxed mt-3", MinecartLCD.className)}>
              Packed With Power. Engineered For Tomorrow.
            </p>
          </div>

          {/* GET UPDATES Button - Same horizontal level as Features title but higher */}
          <div className="absolute top-[6%] right-[3%] z-20">
            <p className={cn("text-gray-400 text-sm mb-4 text-right", MinecartLCD.className)}>
              More Information
            </p>
            <a href="#" className={cn("explore-button group hover:bg-white hover:text-black", MinecartLCD.className)}>
              GET UPDATES
              <span className="flex-grow"></span>
              <AnimatedArrowDynamic 
                size={22} 
                strokeWidth={2.5}
                className="animated-arrow ml-2 group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Main Description - Moved up */}
          <div className="absolute top-[35%] left-[5%] z-20 max-w-[50%]">
            <p className={cn("text-gray-300 text-base md:text-lg leading-relaxed", MinecartLCD.className)}>
              Empire UI Components Blend Sleek Industrial Design With 
              Cutting-Edge Technology To Deliver Powerful Functionality 
              In Every Detail. From Ultra-Fast Integration And Best Looking 
              UI Components, Every Feature Is Designed To Elevate Your 
              Experience And Keep You One Step Ahead Of The Entire 
              Industry.
            </p>
          </div>

          {/* Feature List - Moved to bottom right corner, floating */}
          <div className="absolute bottom-[15%] right-[5%] z-20 max-w-[40%]">
            <div className="space-y-5">
              {/* Feature 1 */}
              <div className="border-b border-gray-600 pb-3">
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  ULTRA-FAST ADDITIONS ⚡
                </h3>
              </div>

              {/* Feature 2 */}
              <div className="border-b border-gray-600 pb-3">
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  LONG-LASTING UI UPDATES 🔋
                </h3>
              </div>

              {/* Feature 3 */}
              <div className="border-b border-gray-600 pb-3">
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  REGULAR UPDATED UI COMPONENTS 🔒
                </h3>
              </div>

              {/* Feature 4 */}
              <div>
                <h3 className={cn("text-white text-lg md:text-xl font-bold", MinecartLCD.className)}>
                  SEAMLESS CONNECTIVITY 🌐
                </h3>
              </div>
            </div>
          </div>

          {/* WATCH DEMO Button - Bottom left corner */}
          <div className="absolute bottom-[8%] left-[5%] z-20">
            <p className={cn("text-gray-400 text-sm mb-4", MinecartLCD.className)}>
              SEE IT IN ACTION
            </p>
            <a href="#" className={cn("explore-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-black group", MinecartLCD.className)}>
              WATCH DEMO
              <span className="flex-grow"></span>
              <AnimatedArrowDynamic 
                size={22} 
                strokeWidth={2.5}
                className="animated-arrow ml-2 group-hover:rotate-45 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}; 