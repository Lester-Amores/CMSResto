<section class="py-12 bg-white">
    <div class="py-4">
        <div class="flex items-center justify-center">
            <div class="flex items-center max-w-xl">
                <hr class="w-12 sm:w-18 border-gray-300">
                <span class="mx-4 text-md font-bold text-gray-900">DISCOVER</span>
                <hr class="w-12 sm:w-18 border-gray-300">
            </div>
        </div>
        <h2 class="text-5xl font-bold text-gray-900 mb-6 text-center">OUR MENU</h2>
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            @foreach ($menus as $menu)
                <div class="p-6 border rounded shadow hover:shadow-md transition">
                    <h3 class="text-xl font-semibold mb-4">{{ $menu->name }}</h3>
                    <ul class="list-disc list-inside text-gray-700">
                        @foreach ($menu->meals as $meal)
                            <li>{{ $meal->name }}</li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </div>
    </div>
</section>
