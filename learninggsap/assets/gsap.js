import { gsap } from 'https://cdn.skypack.dev/gsap';
import { Draggable } from 'https://cdn.skypack.dev/gsap/Draggable';
import { TextPlugin } from 'https://cdn.skypack.dev/gsap/TextPlugin';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
gsap.registerPlugin(Draggable, TextPlugin, ScrollTrigger);

Draggable.create("#red-box", {
    type: "x,y",
    edgeResistance: 0.65,
    bounds: "#big-box",
    throwProps: true,
    liveSnap:{
        points: [
            { x: -150, y: 0 },
        ],
        radius: 20,
    },
    onRelease: guardar,
    inertia: true,
});

function guardar(){
    const element = document.querySelector("#red-box");
    const transform = window.getComputedStyle(element).getPropertyValue("transform");
    const matrix = new DOMMatrixReadOnly(transform);
    const translateX = matrix.m41;
    const translateY = matrix.m42;
    const translateZ = matrix.m43;
    console.log(`translateX: ${translateX}, translateY: ${translateY}, translateZ: ${translateZ}`);
    // Crea la animación
    if(translateX == -150 && translateY == 0){
        gsap.to("#red-box", {
            y: translateY- 20, // Mueve la caja roja 50px hacia arriba
            duration: 1, // Duración de 1 segundo
            onComplete: function() { // Función que se ejecuta cuando termina la primera animación
                gsap.to("#red-box", {
                    y: translateY+10, // Mueve la caja roja a su posición original
                    opacity: 0,
                    duration: 1, // Duración de 1 segundo
                    onComplete: function() { 
                        element.classList.add("hidden");
                    }, 
                });
            },
        });
    }
}

function recargar(){
    const element = document.querySelector("#red-box");
    element.style.transform = ``;
    element.style.transform = `translate3d(0px, 0px, 0px)`;
    element.classList.remove("hidden");
}

gsap.to(".box", {
    scrollTrigger: {
        trigger: ".box",
        start: "top bottom",
        end: "bottom top",
        scrub: false,
        toggleActions: "restart pause resume reset",
        triggerOnce: false,
    },
    rotation: 360,
    repeat: -1,
    duration: 2,
});

setTimeout(() => {
    gsap.to("#text", {
        duration: 0.75,
        text: "Prueba ya!",
        ease: "none",
    });
}, 3000);

document.getElementById("recargar").addEventListener("click", recargar);