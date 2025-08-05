<section class="min-h-screen py-12 bg-stone-300">
    <div class="mx-auto max-w-7xl">
        <div class="flex items-center justify-center">
            <div class="flex items-center max-w-xl">
                <hr class="w-12 sm:w-18 border-black">
                <span class="mx-4 text-md font-bold text-gray-900">DISCOVER</span>
                <hr class="w-12 sm:w-18 border-black">
            </div>
        </div>
        <h2 class="text-5xl font-bold text-gray-900 mb-6 text-center">OUR MENU</h2>

        <div class="relative w-full">

            <div class="overflow-x-auto px-4 sm:px-12">
                <div
                    id="menuTabs"
                    class="flex lg:justify-center space-x-6 scroll-smooth whitespace-nowrap py-4">
                    <div
                        onclick="selectMenu('all')"
                        class="menu-tab cursor-pointer px-6 py-3 rounded-lg font-bold text-xl hover:bg-stone-300 min-w-max">
                        All
                    </div>
                    @foreach ($data['menus'] as $menu)
                    <div
                        onclick="selectMenu({{ $menu->id }})"
                        class="menu-tab cursor-pointer px-6 py-3 rounded-lg font-medium text-xl hover:bg-stone-300 min-w-max">
                        {{ $menu->name }}
                    </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="relative max-w-7xl mx-auto  border-t border-b border-yellow-700">
            <div class=" overflow-y-auto no-scrollbar h-[300px] md:h-[500px] my-4">
                <div id="mealsGrid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
                    @foreach ($data['menus'] as $menu)
                    @foreach ($menu->meals as $meal)
                    <div class="meal-card" data-menu-id="{{ $menu->id }}">
                        <div class="relative rounded-lg shadow-lg overflow-hidden h-48 w-full text-white text-center bg-cover bg-center will-change-transform"
                            style="background-image: url('{{ getFullImageUrl($meal->img_src) }}'); transform: translateZ(0);">
                            <div class="absolute inset-0 bg-black/50"></div>
                            <div class="relative z-10 flex items-center justify-center h-full">
                                <h3 class="text-xl font-bold">{{ $meal->name }}</h3>
                            </div>
                        </div>
                    </div>
                    @endforeach
                    @endforeach
                </div>
            </div>
        </div>

    </div>
</section>


<script>
    const tabs = document.querySelectorAll('.menu-tab');
    const meals = document.querySelectorAll('.meal-card');
    const scrollContainer = document.getElementById('menuTabs');

    function selectMenu(menuId) {
        tabs.forEach(tab => {
            tab.classList.remove('text-red-700');
        });

        const activeTab = [...tabs].find(tab => {
            return (menuId === 'all' && tab.textContent.trim() === 'All') || tab.textContent.trim() === getMenuName(menuId);
        });

        if (activeTab) {
            activeTab.classList.add('text-red-700');
        }

        meals.forEach(meal => {
            const show = menuId === 'all' || +meal.dataset.menuId === +menuId;
            meal.style.display = show ? 'block' : 'none';
        });
    }

    function getMenuName(menuId) {
        const menus = @json($data['menus']);
        const menu = menus.find(m => m.id === menuId);
        return menu ? menu.name : '';
    }

    selectMenu('all');
</script>