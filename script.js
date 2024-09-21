const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight * 0.6); // Ajustado para pantallas pequeñas
document.getElementById('scene').appendChild(renderer.domElement);

// Cargar la textura de la flor
const textureLoader = new THREE.TextureLoader();
const flowerTexture = textureLoader.load('assets/flower.png', createFlowers);

// Crear flores
function createFlowers() {
    const flowerCount = 50; // Aumentar el número de flores
    const radius = 4; // Radio de dispersión

    for (let i = 0; i < flowerCount; i++) {
        const geometry = new THREE.CircleGeometry(0.5, 32); // Tamaño de flores ajustado
        const material = new THREE.MeshBasicMaterial({ map: flowerTexture });
        const flower = new THREE.Mesh(geometry, material);

        // Posición aleatoria dentro de un círculo
        const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
        const x = radius * Math.cos(angle); // Posición x
        const y = radius * Math.sin(angle); // Posición y

        flower.position.x = x; // Asignar posición x
        flower.position.y = y; // Asignar posición y
        flower.position.z = -5; // Posición z fija para que todas las flores se vean

        scene.add(flower);
    }
}

// Configurar cámara
camera.position.z = 5;

// Animación
const animate = () => {
    requestAnimationFrame(animate);
    scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            child.rotation.z += 0.01;
            child.position.y += Math.sin(Date.now() * 0.001) * 0.05; // Movimiento de flotación
        }
    });
    renderer.render(scene, camera);
};

animate();

// Animación del mensaje
gsap.from(".message", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 1,
    ease: "power2.out", // Suavizar la entrada
});
gsap.to(".message", {
    opacity: 1,
    duration: 1,
    delay: 1.5,
    ease: "power2.out", // Suavizar la entrada
});
