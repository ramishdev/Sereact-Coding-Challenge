import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeSphere = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / 2 / (window.innerHeight / 2), // aspect ratio to match half the width and height
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    renderer.setSize(width, height);    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5; // Move the camera away from the origin

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const width = window.innerWidth / 2;
      const height = window.innerHeight / 2;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}/>;
};

export default ThreeSphere;
