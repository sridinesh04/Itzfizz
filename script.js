// GSAP Animation on Page Load
gsap.to(".hero-title", { opacity: 1, duration: 1.5, y: -10 });

// Smooth Scrolling for CTA Button
function scrollToAbout() {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });

    // GSAP Scale Animation on Click
    gsap.to(".hero-title", { scale: 1.2, duration: 0.5, yoyo: true, repeat: 1 });

    // Show Popup Alert
    setTimeout(() => {
        alert("Welcome to Pha5e! 🚀");
    }, 1000);
}

// Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("webgl"), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Glowing Sphere Shader
const vertexShader = `
    varying vec3 vNormal;
    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec3 vNormal;
    void main() {
        float intensity = pow(0.9 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
        gl_FragColor = vec4(1.0, 0.2, 0.5, 1.0) * intensity;
    }
`;

const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: true
});

// Glowing Sphere
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);
scene.add(sphere);

// Particle Effect
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({ color: 0xff4d6d, size: 0.1 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 10;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.003;
    sphere.rotation.y += 0.003;
    particles.rotation.y += 0.001;
    particles.rotation.x += 0.001;
    renderer.render(scene, camera);
}
animate();

// 🔹 Mouse Parallax Effect (Hero Section)
document.addEventListener("mousemove", (event) => {
    let x = (event.clientX / window.innerWidth - 0.5) * 2;
    let y = (event.clientY / window.innerHeight - 0.5) * 2;

    // Move Sphere Based on Mouse
    gsap.to(sphere.rotation, { x: y * 0.5, y: x * 0.5, duration: 0.5 });

    // Apply Parallax Effect on Hero Section
    gsap.to(".hero", { x: x * 20, y: y * 20, duration: 0.5 });
});

// 🔹 Click Particle Effect
document.addEventListener("click", (event) => {
    const particle = document.createElement("div");
    particle.classList.add("click-particle");
    document.body.appendChild(particle);

    // Set Position
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;

    // Remove Particle After Animation
    setTimeout(() => {
        particle.remove();
    }, 600);
});

// 🔹 Hover Glow Effect for Buttons & Links
document.querySelectorAll("a, .cta").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        gsap.to(element, { boxShadow: "0px 0px 10px rgba(255, 77, 109, 0.8)", duration: 0.3 });
    });

    element.addEventListener("mouseleave", () => {
        gsap.to(element, { boxShadow: "none", duration: 0.3 });
    });
});
