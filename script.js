// Inicializar música de fondo
document.getElementById('background-music').play();

// Animación de aparición
gsap.to(".message", {
    opacity: 1,
    duration: 1,
    delay: 1,
});

gsap.to(".message", {
    yoyo: true,
    repeat: -1,
    duration: 2,
    y: 15,
    ease: "sine.inOut",
});
