import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { CustomEase } from 'gsap/all';
import { Flip } from 'gsap/all';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ButtonHover from '../components/ButtonHover';

gsap.registerPlugin(ScrollTrigger, CustomEase, Flip);

document.addEventListener('DOMContentLoaded', (event) => {
    Footer();
    Navbar();
    ButtonHover();
});
