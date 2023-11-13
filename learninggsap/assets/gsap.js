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
    liveSnap: {
        points: [
            { x: -150, y: -150 },
            { x: 150, y: 150 },
        ],
        radius: 20,
    },
    inertia: true,
});

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
