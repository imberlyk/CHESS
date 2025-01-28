// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Load the GLB model
const loader = new THREE.GLTFLoader();
loader.load(
  './models/chess.glb', // Path to your GLB file
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5); // Adjust the scale of the model
    model.position.set(0, -1, 0);   // Position the model
    scene.add(model);

    console.log('Model loaded successfully:', model);
  },
  (xhr) => {
    console.log(`Model loading progress: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
  },
  (error) => {
    console.error('An error occurred while loading the model:', error);
  }
);

// Camera setup
camera.position.set(0, 2, 5); // Adjust camera position
camera.lookAt(0, 0, 0);       // Point the camera at the center of the scene

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
