import { gsap } from 'https://cdn.skypack.dev/gsap';
import { Draggable } from 'https://cdn.skypack.dev/gsap/Draggable';
import { TextPlugin } from 'https://cdn.skypack.dev/gsap/TextPlugin';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
gsap.registerPlugin(Draggable, TextPlugin, ScrollTrigger);

Draggable.create("#red-box", {
    type: "x,y",
    edgeResistance: 1,
    bounds: "#big-box",
    throwProps: true,
    zIndexBoost: false,
    
    onRelease: function() {
        if(this.hitTest("#snap-point-1")){
            this.endDrag();
            const cont = document.querySelector("#snap-point-1");
            const dot = document.querySelector("#red-box");
            const disFTDot = dot.offsetTop;
            const disFLDot = dot.offsetLeft;
            const disFT = cont.offsetTop;
            const disFL = cont.offsetLeft;
            const heightC = cont.offsetHeight;
            const widthC = cont.offsetWidth;
            const heightDot = dot.offsetHeight;
            const widthDot = dot.offsetWidth;
            const offsetX = disFL-disFLDot + widthC/2 - widthDot/2;
            const offsetY = disFT-disFTDot + heightC/2 - heightDot/2;
            gsap.to("#red-box", {
                x: offsetX,
                y: offsetY-30,
                duration: 1,
                onComplete: function() {
                    gsap.to("#red-box", {
                        y: offsetY,
                        opacity: 0,
                        duration: 1,
                        onComplete: function() { 
                            dot.classList.add("hidden");
                        },
                    });
                },
            }); 
            
        }
    },
});

function guardar(){
    const element = document.querySelector("#red-box");
    const transform = window.getComputedStyle(element).getPropertyValue("transform");
    const matrix = new DOMMatrixReadOnly(transform);
    const translateX = matrix.m41;
    const translateY = matrix.m42;
    const translateZ = matrix.m43;
    console.log(`translateX: ${translateX}, translateY: ${translateY}, translateZ: ${translateZ}`);
    if(translateX == -150 && translateY == 0){
        gsap.to("#red-box", {
            opacity: 1,
            y: translateY- 20,
            duration: 1,
            onComplete: function() {
                gsap.to("#red-box", {
                    y: translateY+10,
                    opacity: 0,
                    duration: 1,
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
    const transform = window.getComputedStyle(element).getPropertyValue("transform");
    const matrix = new DOMMatrixReadOnly(transform);
    const translateX = matrix.m41;
    const translateY = matrix.m42;
    const translateZ = matrix.m43;
    console.log(`translateX: ${translateX}, translateY: ${translateY}, translateZ: ${translateZ}`);
    element.classList.remove("hidden");
    gsap.to("#red-box", {
        y: translateY- 20,
        duration: 1,
        opacity: 1,
        onComplete: function() {
            gsap.to("#red-box", {
                y: 0,
                x: 0,
                duration: 1,
            });
        }, 
    });
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
    ease: "none",
    rotation: 360,
    repeat: -1,
    duration: 2,
});

let a =gsap.to(".rotator", {
    rotation: -90,
    ease: "none",
    duration: 1,
    onComplete: function() {
        setTimeout(() => {
            gsap.to(".rotator", {
                rotation: -180,
                ease: "none",
                duration: 1,
                onComplete: function() {
                    setTimeout(() => {
                        gsap.to(".rotator", {   
                            rotation: -270,
                            ease: "none",
                            duration: 1,
                            onComplete: function() {
                                setTimeout(() => {
                                    gsap.to(".rotator", {
                                        rotation: -360,
                                        ease: "none",
                                        duration: 1,
                                        onComplete: function() {
                                            setTimeout(() => {a.restart();}, 3000);
                                        }
                                    });
                                }, 3000);
                            }
                        });
                    }, 3000);
                }   
            });
        }, 3000);
    },
    yoyo: true,
});

gsap.to(".back-cube",{
    ease: "power4.inOut",
    x: window.innerWidth - 115,
    duration: 3,
    yoyo: true,
    repeat: -1,
});

gsap.to(".loading",{
    rotation: 360,
    ease: "none",
    repeat: -1,
    duration: 2,
});

function finishLoading(){
    gsap.to(".loading-back",{
        backgroundColor: "rgba(0, 0, 0, 0.000001)",
        duration: 1,
        onComplete: function() {
            setTimeout(() => {
                gsap.to(".loading",{
                    opacity: 0,
                    duration: 5,
                    onComplete: function() {
                        gsap.killTweensOf(".loading");
                        gsap.killTweensOf(".loading-back");
                        gsap.to(".loading-back",{
                            display: "none",
                        });
                        gsap.to(".loading",{
                            display: "none",
                        });
                    },
                });
            }, 3000);
        },
    });
}

setTimeout(() => {
    gsap.to("#text", {
        duration: 0.75,
        text: "Prueba ya!",
        ease: "none",
    });
    finishLoading();
}, 3000);

document.getElementById("recargar").addEventListener("click", recargar);