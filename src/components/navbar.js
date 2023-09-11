import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Flip } from 'gsap/all';

export default function Navbar() {
    //Navbar on scroll change
    const navBtn = document.querySelector('.button.is-navbar-button');
    const navTl = gsap.timeline({
        ease: 'power4.in',
        scrollTrigger: {
            trigger: '.navbar_component',
            start: '+=48',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                navBtn.classList.add('is-scrolled');
            },
            onLeaveBack: () => {
                navBtn.classList.remove('is-scrolled');
            },
        },
    });

    navTl
        .to(
            '.navbar_logo.is-rest',
            {
                opacity: 0,
                width: 0,
                duration: 0.5,
                ease: 'power4.out',
            },
            0
        )
        .to(
            '.navbar_container',
            {
                margin: '0 2em',
                backgroundColor: '#073742',
                duration: 0.3,
            },
            0
        );

    //Nav links hover
    const navLinks = document.querySelectorAll('.navbar_link');
    const navLinksWrap = document.querySelector('.navbar_menu');
    const currentLink = document.querySelector('.navbar_link.w--current');
    const padInitial = document.querySelector('.navbar_pad-initial');
    const shape = document.querySelector('.navbar_link-pad');

    navLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            const state = Flip.getState(shape, {
                props: 'opacity',
                simple: true,
            });
            shape.classList.add('is-active');

            this.appendChild(shape);

            Flip.from(state, {
                absolute: true,
                duration: 0.3,
                ease: 'power2.out',
            });
        });
    });

    navLinksWrap.addEventListener('mouseleave', function () {
        const state = Flip.getState(shape, { props: 'opacity', simple: true });
        shape.classList.remove('is-active');
        Flip.from(state, {
            absolute: true,
            duration: 0.3,
            ease: 'power2.out',
            scale: true,
        });
    });
}
