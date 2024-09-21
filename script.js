const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight * 0.8);
document.getElementById('scene').appendChild(renderer.domElement);

// Cargar la textura de la flor
const textureLoader = new THREE.TextureLoader();
const flowerTexture = textureLoader.load('assets/flower.png', () => {
    createFlowers();
});

// Crear flores
function createFlowers() {
    const flowerCount = 20; // Aumentar el número de flores
    for (let i = 0; i < flowerCount; i++) {
        const geometry = new THREE.CircleGeometry(0.75, 32);
        const material = new THREE.MeshBasicMaterial({ map: flowerTexture });
        const flower = new THREE.Mesh(geometry, material);

        flower.position.x = Math.random() * 10 - 5;
        flower.position.y = Math.random() * 5 - 2.5;
        flower.position.z = Math.random() * -5;

        flower.scale.set(1, 1, 1);
        scene.add(flower);
    }
}

// Cámara
camera.position.z = 5;

// Animación
const animate = () => {
    requestAnimationFrame(animate);
    scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            child.rotation.z += 0.01;
            child.position.y += Math.sin(Date.now() * 0.001) * 0.05;
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
});
gsap.to(".message", {
    opacity: 1,
    duration: 1,
    delay: 1.5,
});

