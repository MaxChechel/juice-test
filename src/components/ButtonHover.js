import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';

export default function ButtonHover() {
    let mm = gsap.matchMedia();
    CustomEase.create(
        'bounce',
        'M0,0 C0.11,0.494 0.206,0.892 0.332,1.018 0.425,1.111 0.554,0.946 0.698,0.988 0.872,1.038 0.898,1 1,1 '
    );

    //Animation contains swiper slides from a Homepage too
    const sideAnimTargets = document.querySelectorAll('.button, .swiper-slide');

    function distMetric(x, y, x2, y2) {
        const xDiff = x - x2;
        const yDiff = y - y2;
        return xDiff * xDiff + yDiff * yDiff;
    }

    function closestEdge(x, y, w, h) {
        const edgeDistances = {
            left: distMetric(x, y, 0, h / 2),
            right: distMetric(x, y, w, h / 2),
            top: distMetric(x, y, w / 2, 0),
            bottom: distMetric(x, y, w / 2, h),
            'top-left': distMetric(x, y, 0, 0),
            'top-right': distMetric(x, y, w, 0),
            'bottom-left': distMetric(x, y, 0, h),
            'bottom-right': distMetric(x, y, w, h),
        };

        let minDistance = Infinity;
        let closestEdge = null;

        for (const edge in edgeDistances) {
            if (edgeDistances[edge] < minDistance) {
                minDistance = edgeDistances[edge];
                closestEdge = edge;
            }
        }

        return closestEdge;
    }

    function animateSides(el, xShift, yShift, duration) {
        const tl = gsap.timeline();

        tl.to(
            el,
            {
                x: xShift,
                y: yShift,
                duration: duration,
            },
            0
        )
            .to(
                el,
                {
                    x: -xShift * 0.4,
                    y: -yShift * 0.4,
                    duration: duration * 0.75,
                },
                '>'
            )
            .to(
                el,
                {
                    x: xShift * 0.25,
                    y: yShift * 0.25,
                    duration: duration * 0.75,
                },
                '>'
            )
            .to(
                el,
                {
                    x: -xShift * 0.15,
                    y: -yShift * 0.15,
                    duration: duration * 0.75,
                },
                '>'
            )
            .to(
                el,
                {
                    x: 0,
                    y: 0,
                    duration: duration,
                    ease: 'bounce',
                    clearProps: 'all',
                },
                '>'
            );

        return tl;
    }
    mm.add('(hover:hover)', () => {
        sideAnimTargets.forEach((target) => {
            const elRect = target.getBoundingClientRect();
            const width = elRect.width;
            const height = elRect.height;

            let isAnimating = false; // Flag to track whether animation is currently in progres
            let progressThreshold = 0.5; // Percentage of animation progress before allowing new animation

            target.addEventListener('mouseenter', function (e) {
                if (isAnimating) {
                    // If animation is already in progress, exit the function
                    return;
                }

                const x = e.clientX - target.getBoundingClientRect().left;
                const y = e.clientY - target.getBoundingClientRect().top;
                const edge = closestEdge(x, y, width, height);

                let shift = 4;
                let animDuration = 0.2;
                if (target.classList.contains('swiper-slide')) {
                    target.classList.add('is-animating');
                    shift = 10;
                    animDuration = 0.3;
                }
                const animationProps = {
                    left: { xShift: shift, yShift: 0, duration: animDuration },
                    right: {
                        xShift: -shift,
                        yShift: 0,
                        duration: animDuration,
                    },
                    top: { xShift: 0, yShift: shift, duration: animDuration },
                    bottom: {
                        xShift: 0,
                        yShift: -shift,
                        duration: animDuration,
                    },
                    'top-left': {
                        xShift: shift,
                        yShift: shift,
                        duration: animDuration,
                    },
                    'top-right': {
                        xShift: -shift,
                        yShift: shift,
                        duration: animDuration,
                    },
                    'bottom-left': {
                        xShift: shift,
                        yShift: -shift,
                        duration: animDuration,
                    },
                    'bottom-right': {
                        xShift: -shift,
                        yShift: -shift,
                        duration: animDuration,
                    },
                };

                const { xShift, yShift, duration } =
                    animationProps[edge] || animationProps.top;

                // Set the isAnimating flag to true to prevent multiple animations
                isAnimating = true;

                const tl = animateSides(target, xShift, yShift, duration);

                // Listen for the "onUpdate" event of the timeline to check animation progress
                tl.eventCallback('onUpdate', () => {
                    if (tl.progress() >= progressThreshold) {
                        isAnimating = false; // Reset the flag once animation progresses beyond the threshold
                    }
                });
            });
        });
    });
}
