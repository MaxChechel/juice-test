import { gsap } from 'gsap';

export default function LogoGarden() {
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
}
