<section class="min-h-screen py-12 bg-gray-300">
    <div class="py-4">
        <div class="flex items-center justify-center">
            <div class="flex items-center max-w-xl">
                <hr class="w-12 sm:w-18 border-black">
                <span class="mx-4 text-md font-bold text-gray-900">DISCOVER</span>
                <hr class="w-12 sm:w-18 border-black">
            </div>
        </div>
        <h2 class="text-5xl font-bold text-gray-900 mb-6 text-center">OUR MENU</h2>

        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @foreach ($menus as $menu)
                <div class="relative rounded-lg shadow-lg overflow-hidden cursor-pointer group h-64 text-white text-center m-4"
                    onclick="showMenuModal({{ json_encode($menu) }})">

                    <div class="absolute inset-0 bg-center bg-cover transition-transform duration-500 scale-100 group-hover:scale-110"
                        style="background-image: url('{{ getFullImageUrl($menu->img_src) }}');">
                    </div>

                    <div class="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:bg-black/60">
                    </div>

                    <div class="relative z-10 flex items-center justify-center h-full">
                        <h3 class="text-4xl font-bold transition-transform duration-300 group-hover:scale-105">
                            {{ $menu->name }}
                        </h3>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <div id="menuModal" class="fixed inset-0 bg-black/80 hidden items-center justify-center z-50">
        <!-- Outer modal backdrop -->
        <div id="menuModalContent"
            class="bg-gray-300 rounded shadow w-full max-w-5xl p-8 relative overflow-y-auto max-h-[80vh]">
            <button class="absolute top-0 right-2 text-red-500 hover:text-red-800 text-4xl"
                onclick="closeMenuModal()">&times;</button>
            <h2 id="modalMenuName" class="text-3xl font-semibold text-center uppercase"></h2>
            <h2 id="modalMenuDescription" class="text-1xl text-center mb-8"></h2>

            <div id="modalMeals" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
            <p id="noMealsText" class="text-center text-gray-500 hidden">No meals available.</p>
        </div>
    </div>

</section>


{{-- <script>
    function getFullImageUrl(path) {
        if (!path) return '';
        const baseUrl = "{{ config('app.url') ?? request()->getSchemeAndHttpHost() }}";
        return (path.startsWith('storage/') || path.startsWith('images/')) ?
            `${baseUrl}/${path}` :
            `${baseUrl}/storage/${path}`;
    }

    function showMenuModal(menu) {
        document.getElementById('modalMenuName').textContent = menu.name;
        document.getElementById('modalMenuDescription').textContent = menu.description;


        const mealsContainer = document.getElementById('modalMeals');
        const noMealsText = document.getElementById('noMealsText');
        mealsContainer.innerHTML = '';

        if (menu.meals && menu.meals.length > 0) {
            noMealsText.classList.add('hidden');

            menu.meals.forEach(meal => {
                const div = document.createElement('div');
                div.className = 'relative rounded shadow overflow-hidden group';

                const img = document.createElement('img');
                img.src = getFullImageUrl(meal.img_src);
                img.className = 'w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110';
                const overlay = document.createElement('div');
                overlay.className = `absolute inset-0 bg-black/70 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0`;

                const desc = document.createElement('div');
                desc.className = 'text-white text-center text-sm px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300';
                desc.textContent = meal.description || 'No description';
                overlay.appendChild(desc);
                const nameDiv = document.createElement('div');
                nameDiv.className = `absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center text-xl py-2 transition-opacity duration-300 group-hover:opacity-0`;
                nameDiv.textContent = `${meal.name} - ${meal.price}$`;

                div.appendChild(img);
                div.appendChild(overlay);
                div.appendChild(nameDiv);
                mealsContainer.appendChild(div);
            });
        }
        if (!menu.meals && menu.meals.length <= 0) {
            noMealsText.classList.remove('hidden');
        }
        document.getElementById('menuModal').classList.remove('hidden');
        document.getElementById('menuModal').classList.add('flex');
    }

    function closeMenuModal() {
        document.getElementById('menuModal').classList.add('hidden');
        document.getElementById('menuModal').classList.remove('flex');
    }

    document.getElementById('menuModal').addEventListener('click', function(e) {
        const modalContent = document.getElementById('menuModalContent');
        if (!modalContent.contains(e.target)) {
            closeMenuModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenuModal();
        }
    });
</script> --}}
