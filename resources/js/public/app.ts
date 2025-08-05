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
