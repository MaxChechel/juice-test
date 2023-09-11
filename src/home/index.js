import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { CustomEase } from 'gsap/all';
import { Flip } from 'gsap/all';
import Swiper from 'swiper';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ButtonHover from '../components/ButtonHover';
import LogoGarden from '../components/LogoGarden';

gsap.registerPlugin(ScrollTrigger, CustomEase, Flip);

window.addEventListener('beforeunload', function (event) {
    // Check if the event's type is 'beforeunload', indicating a page refresh.
    if (event.type === 'beforeunload') {
        window.scrollTo(0, 0);
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    Footer();
    Navbar();
    ButtonHover();
    LogoGarden();
    let hoverMm = gsap.matchMedia();
    //Swiper init
    const slides = document.querySelectorAll('.swiper-slide');

    const swiper = new Swiper('.swiper', {
        slidesPerView: 'auto',
        freeMode: true,
        momentumRatio: 0.5,
        on: {
            sliderMove: () => {
                hoverMm.add('(hover:hover)', () => {
                    slides.forEach((slide) => {
                        let isAnimating = false;
                        let progressThreshold = 0.5;
                        const tl = gsap.timeline();
                        if (isAnimating) {
                            // If animation is already in progress, exit the function
                            return;
                        }
                        // Set the isAnimating flag to true to prevent multiple animations
                        isAnimating = true;
                        tl.to(slide, {
                            css: { marginRight: '1.6em' },
                            duration: 0.2,
                        }).to(slide, {
                            css: { marginRight: '2em' },
                            duration: 0.2,
                        });
                        // Listen for the "onUpdate" event of the timeline to check animation progress
                        tl.eventCallback('onUpdate', () => {
                            if (tl.progress() >= progressThreshold) {
                                isAnimating = false; // Reset the flag once animation progresses beyond the threshold
                            }
                        });
                    });
                });
            },
        },
    });

    gsap.set('.swiper', {
        pointerEvents: 'none',
    });
    // Slides initial setup
    slides.forEach((slide, index) => {
        //Set z-index for slides
        gsap.set(slide, {
            css: { zIndex: slides.length - index },
        });
        //Set starting position for slides
        gsap.set(slide, {
            x: `-${slide.offsetLeft - 32 - index * 20}/16 em`,
        });
        //Slides aniamtion on scroll

        CustomEase.create(
            'slide-ease',
            'M0,0 C0.046,0.368 0.2,0.718 0.318,0.852 0.562,1.13 0.588,0.982 1,1 '
        );
        CustomEase.create(
            'custom',
            'M0,0,C0.11,0.494,0.14,1.054,0.266,1.18,0.308,1.222,0.29,0.962,0.39,0.94,0.464,0.923,0.486,1.058,0.552,1.084,0.588,1.098,0.598,0.968,0.662,0.978,0.706,0.984,0.724,1.04,0.776,1.04,0.799,1.04,0.829,0.988,0.864,0.982,0.924,0.97,0.958,1,1,1'
        );
        const tl = gsap.timeline({
            overwrite: true,
            onComplete: () => {
                gsap.set('.swiper', {
                    pointerEvents: 'all',
                });
            },
            scrollTrigger: {
                trigger: '.swiper',
                start: 'top 40%',
                end: 'top 20%',
            },
        });
        tl.to(slide, {
            x: 0,
            duration: 0.6,
            ease: 'slide-ease',
        });
        if (index % 2 === 0) {
            tl.to(
                slide,
                {
                    y: 10,
                    duration: 0.3,
                },
                0
            )
                .to(
                    slide,
                    {
                        y: -2.5,
                        duration: 0.2,
                    },
                    '>'
                )
                .to(
                    slide,
                    {
                        y: 0,
                        duration: 0.4,
                        ease: 'custom',
                        clearProps: 'all',
                    },
                    '>'
                );
        }
    });

    //Case studies cards
    const caseStudiesCards = document.querySelectorAll(
        '.case-studies_component:first-child .case-studies_item'
    );
    const caseStudiesSecRow = document.querySelector(
        '.case-studies_list.is-4-items'
    );
    const caseStudiesWrapper = document.querySelector('.case-studies_wrapper');
    const caseStudies = document.querySelectorAll('.case-studies_link-wrap');
    const cursor = document.querySelector('.cursor_item-inner');

    caseStudiesCards.forEach((element, i) => {
        if (i > 2) caseStudiesSecRow.appendChild(element);

        element.addEventListener('mouseover', (e) => {
            //Dark overlay on hover

            caseStudiesCards.forEach((study) => {
                const overlay = study.querySelector(
                    '.case-studies_item-overlay'
                );
                if (study !== element) overlay.style.opacity = 1;
            });

            const dataHolder = element.querySelector('.data-holder');

            cursor.style.backgroundColor = dataHolder.style.backgroundColor;
            cursor.style.color = dataHolder.style.color;
            gsap.to(cursor, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power4.inOut',
            });
        });

        element.addEventListener('mouseleave', (e) => {
            //Dark overlay on hover out
            caseStudiesCards.forEach((study) => {
                const overlay = study.querySelector(
                    '.case-studies_item-overlay'
                );
                overlay.style.opacity = 0;
            });

            gsap.to(cursor, {
                opacity: 0,
                scale: 0,
                duration: 0.25,
                ease: 'power4.out',
            });
            setTimeout(() => {
                if (!isMouseStillWithinParent(e.relatedTarget)) {
                    gsap.to(cursor, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.25,
                        ease: 'power4.out',
                    });
                }
            }, 200);
        });
    });

    function isMouseStillWithinParent(relatedTarget) {
        // Check if the related target is a child of the parent container
        return caseStudiesWrapper.contains(relatedTarget);
    }

    //Case studies section rows move

    const caseStTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section_case-studies',
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: 1,
        },
    });

    caseStTl
        .to(
            '.case-studies_component:first-child',
            {
                x: '5%',
            },
            0
        )
        .to(
            '.case-studies_list.is-4-items',
            {
                x: '-5%',
            },
            0
        );

    //Second section BG color change
    const body = document.querySelector('body');
    const sectionColorTl = gsap.timeline({
        ease: 'power4.in',
        scrollTrigger: {
            trigger: '.home-section-color-trigger',
            start: 'top 50%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
            onEnter: () => {
                body.classList.remove(...body.classList);
            },
            onLeaveBack: () => {
                body.classList.remove(...body.classList);
                body.classList.add('background-color-green');
            },
        },
    });
    //Logotypes
    const cells = [...document.querySelectorAll('.logo-garden_image-wrap')];
    const logos = [...document.querySelectorAll('.logo-garden_image')];
    const logosPerCell = Math.ceil(logos.length / cells.length);
    function getRandomInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Initialize logos with opacity 0
    logos.forEach((logo) => {
        gsap.set(logo, { opacity: 0 });
    });

    // Distribute logos to cells
    cells.forEach((cell, index) => {
        const startIndex = index * logosPerCell;
        const endIndex = Math.min(startIndex + logosPerCell, logos.length);
        let atLeastOneVisible = false;

        for (let i = startIndex; i < endIndex; i++) {
            if (i === startIndex) {
                gsap.set(logos[i], { opacity: 1 });
                atLeastOneVisible = true;
            }
            cell.appendChild(logos[i]);
        }

        // If no logo was made visible, select one randomly
        if (!atLeastOneVisible && startIndex < logos.length) {
            const randomLogoIndex =
                startIndex +
                Math.floor(Math.random() * (endIndex - startIndex));
            gsap.set(logos[randomLogoIndex], { opacity: 1 });
        }
    });

    let lastAnimatedCellIndex = -1;

    function showRandomLogoInRandomCell() {
        let randomCellIndex = Math.floor(Math.random() * cells.length);

        // Ensure the next cell is not the same as the last one
        while (randomCellIndex === lastAnimatedCellIndex) {
            randomCellIndex = Math.floor(Math.random() * cells.length);
        }

        const cell = cells[randomCellIndex];
        const visibleLogo = cell.querySelector(
            ".logo-garden_image[style*='opacity: 1']"
        );
        const logosInCell = cell.querySelectorAll('.logo-garden_image');

        if (logosInCell.length > 1 && visibleLogo) {
            const newLogo = Array.from(logosInCell).find(
                (logo) => logo !== visibleLogo
            );
            hideLogo(visibleLogo);
            gsap.to(newLogo, {
                opacity: 1,
                duration: 0.6,
                ease: 'circ.out',
            });
        }

        lastAnimatedCellIndex = randomCellIndex;
    }

    function hideLogo(logo) {
        if (logo) {
            gsap.to(logo, {
                opacity: 0,
                duration: 0.6,
                ease: 'circ.out',
            });
        }
    }

    showRandomLogoInRandomCell(); // Show initial random logo

    setInterval(() => {
        showRandomLogoInRandomCell(); // Show random logo while avoiding the same cell twice
    }, getRandomInterval(1500, 3500)); // Adjust the interval duration as needed
});
