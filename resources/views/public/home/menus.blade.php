<section class="min-h-screen py-12 bg-stone-300">
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
        <div id="menuModalContent"
            class="bg-stone-300 rounded shadow w-full max-w-5xl p-8 relative overflow-y-auto max-h-[80vh]">
            <button class="absolute top-0 right-2 text-red-500 hover:text-red-800 text-4xl"
                onclick="closeMenuModal()">&times;</button>
            <h2 id="modalMenuName" class="text-3xl font-semibold text-center uppercase"></h2>
            <h2 id="modalMenuDescription" class="text-1xl text-center mb-8"></h2>

            <div id="modalMeals" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
            <p id="noMealsText" class="text-center text-gray-500 hidden">No meals available.</p>
        </div>
    </div>

</section>