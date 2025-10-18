import AOS from 'aos';
import 'aos/dist/aos.css';

export const onClientEntry = () => {
  window.addEventListener('load', () => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100
    });
  });
};