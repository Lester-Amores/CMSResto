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

function getFullImageUrl(path: string): string {
    const baseUrl = (document.querySelector('meta[name="app-url"]') as HTMLMetaElement)?.content || '';
    if (!path) return '';
    return path.startsWith('storage/') || path.startsWith('images/')
        ? `${baseUrl}/${path}`
        : `${baseUrl}/storage/${path}`;
}

function setupMenuModal() {
    const modal = document.getElementById('menuModal');
    const modalContent = document.getElementById('menuModalContent');
    const modalMeals = document.getElementById('modalMeals');
    const modalMenuName = document.getElementById('modalMenuName');
    const modalMenuDescription = document.getElementById('modalMenuDescription');
    const noMealsText = document.getElementById('noMealsText');

    if (!modal || !modalContent || !modalMeals || !modalMenuName || !modalMenuDescription || !noMealsText) return;

    window.showMenuModal = (menu: any) => {
        modalMenuName.textContent = menu.name;
        modalMenuDescription.textContent = menu.description;

        modalMeals.innerHTML = '';

        if (menu.meals && menu.meals.length > 0) {
            noMealsText.classList.add('hidden');

            menu.meals.forEach((meal: any) => {
                const div = document.createElement('div');
                div.className = 'relative rounded shadow overflow-hidden group';

                const img = document.createElement('img');
                img.src = getFullImageUrl(meal.img_src);
                img.className = 'w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110';

                const overlay = document.createElement('div');
                overlay.className = 'absolute inset-0 bg-black/70 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0';

                const desc = document.createElement('div');
                desc.className = 'text-white text-center text-sm px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300';
                desc.textContent = meal.description || 'No description';
                overlay.appendChild(desc);

                const nameDiv = document.createElement('div');
                nameDiv.className = 'absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xl py-2 transition-opacity duration-300 group-hover:opacity-0';
                nameDiv.textContent = `${meal.name} - ${meal.price}$`;

                div.appendChild(img);
                div.appendChild(overlay);
                div.appendChild(nameDiv);
                modalMeals.appendChild(div);
            });
        } else {
            noMealsText.classList.remove('hidden');
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    window.closeMenuModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    modal.addEventListener('click', (e: MouseEvent) => {
        if (!modalContent.contains(e.target as Node)) {
            window.closeMenuModal();
        }
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            window.closeMenuModal();
        }
    });
}

window.initMenuModal = setupMenuModal;

window.addEventListener('DOMContentLoaded', () => {
    window.initMenuModal?.();
});
