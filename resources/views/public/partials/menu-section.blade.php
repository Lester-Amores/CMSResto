<section class="min-h-screen bg-stone-300">
    <div class="mx-auto">
            <div class="reveal flex items-center justify-center">
                <div class="flex items-center max-w-xl mt-12">
                    <hr class="w-12 sm:w-18 border-black">
                    <span class="mx-4 text-md font-bold text-gray-900">DISCOVER</span>
                    <hr class="w-12 sm:w-18 border-black">
                </div>
            </div>
            <h2 class="reveal text-5xl font-bold text-gray-900 mb-6 text-center">OUR MENU</h2>

            <div class="reveal relative w-full">
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

        <div class="relative mx-auto">
            <div class=" overflow-y-auto no-scrollbar h-[300px] my-4 p-4">
                <div class="relative">
                    <button id="scrollLeft"
                        class="absolute left-0 md:left-0 lg:left-80 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black opacity-60 shadow hover:opacity-80 hidden">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button id="scrollRight"
                        class="absolute right-0 md:right-0 lg:right-80  top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black opacity-50 shadow hover:opacity-80 hidden">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div class="reveal">
                        <div id="mealsGrid"
                            class="mx-auto max-w-7xl flex space-x-4 px-4 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-6 bg-stone-300">
                            @foreach ($data['menus'] as $menu)
                            @foreach ($menu->meals as $meal)
                            <div
                                class="meal-card flex-shrink-0 w-64 snap-start bg-white/90 rounded-xl shadow-lg overflow-hidden ring-1 ring-stone-400"
                                data-menu-id="{{ $menu->id }}">

                                <div class="h-40 bg-cover bg-center"
                                    style="background-image: url('{{ getFullImageUrl($meal->img_src) }}');">
                                </div>
                                <div class="px-4 py-3">
                                    <h3 class="text-lg font-semibold text-yellow-700">{{ $meal->name }}</h3>
                                    <p class="text-sm text-stone-700 mt-1">
                                        {{ $meal->description ?? 'No description available.' }}
                                    </p>
                                </div>
                            </div>
                            @endforeach
                            @endforeach
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div
            class="relative bg-fixed bg-cover bg-center bg-no-repeat py-16 mt-8 reveal"
            style="background-image: url('/images/menu-hero-images.jpg');">
            <div class="absolute inset-0 bg-black/50 z-0"></div>
            <div class="relative z-10 px-4 sm:px-6 lg:px-8 py-10 mx-auto max-w-7xl rounded-md text-center">
                <p class="text-base sm:text-lg text-gray-500 font-medium uppercase tracking-wide mb-2">
                    Elevate Your Experience
                </p>
                <h1 class="text-3xl sm:text-5xl font-bold text-white mb-6">
                    A PLACE TO GATHER, SAVOR, AND CELEBRATE
                </h1>
                <p class="text-lg sm:text-xl text-white/90 leading-relaxed max-w-7xl mx-auto">
                    Experience a perfect blend of tradition and taste. Our steakhouse combines timeless elegance with modern flair — featuring a curated selection of prime cuts, cozy ambiance, and impeccable service that brings a slice of luxury to your table.
                </p>
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


<script>
    const grid = document.getElementById('mealsGrid');
    const leftArrow = document.getElementById('scrollLeft');
    const rightArrow = document.getElementById('scrollRight');

    function updateArrowVisibility() {
        const maxScrollLeft = grid.scrollWidth - grid.clientWidth;
        leftArrow.classList.toggle('hidden', grid.scrollLeft <= 20);
        rightArrow.classList.toggle('hidden', grid.scrollLeft >= maxScrollLeft - 10);
    }

    leftArrow.addEventListener('click', () => {
        grid.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    rightArrow.addEventListener('click', () => {
        grid.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    grid.addEventListener('scroll', updateArrowVisibility);
    window.addEventListener('resize', updateArrowVisibility);

    window.addEventListener('load', updateArrowVisibility);
</script>