export { };

declare global {
    interface Window {
        showMenuModal: (menu: any) => void;
        closeMenuModal: () => void;
        initMenuModal: () => void;
        toggleNav: () => void;
    }
}

window.toggleNav = () => {
    const menu = document.getElementById('mobileNav');
    if (menu) {
        menu.classList.toggle('hidden');
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.initMenuModal?.();
});

document.addEventListener("DOMContentLoaded", () => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});
