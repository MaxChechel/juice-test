import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import imagesLoaded from 'imagesloaded';

export default function Footer() {
    const body = document.querySelector('body');
    const juiceBox = document.querySelector('.footer_cta-img');
    imagesLoaded('.page-wrapper', () => {
        const footerColorTl = gsap.timeline({
            ease: 'power4.in',
            scrollTrigger: {
                trigger: '.footer_color-trigger',
                start: 'top 100%',
                end: 'top 90%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                    body.classList.remove(...body.classList);
                    body.classList.add('background-color-black');
                },
                onLeaveBack: () => {
                    body.classList.remove(...body.classList);
                    body.classList.add('background-color-white');
                },
            },
        });

        //Juice box animation
        const footerJuiceTl = gsap.timeline({
            ease: 'power4.out',
            transformOrigin: 'right bottom',
            scrollTrigger: {
                trigger: '.footer_color-trigger',
                start: 'top 90%',
                end: 'top 80%',
                //once: true,
                toggleActions: 'play none none reverse',
            },
        });
        footerJuiceTl
            .to(juiceBox, {
                duration: 0.3,
                delay: 0.05,
                opacity: 1,
                rotation: 3,
                y: '0%',
            })
            .to(juiceBox, {
                rotateY: 10,
                rotation: 0,
                duration: 0.05,
            })
            .to(juiceBox, {
                rotateY: -1,
                duration: 0.05,
            })
            .to(juiceBox, {
                rotateY: 0,
                duration: 0.05,
            });
    });
}
