<nav class="fixed top-0 left-0 w-full z-50 text-[#AC9746] shadow bg-[#1c1c1c]">
    <div class="max-w-7xl mx-auto flex justify-between items-center h-18 px-6">
        <a href="{{ route('home') }}" class="flex items-center h-full select-none">
            <img src="{{ asset('images/app-logo.png') }}" alt="App Logo" class="h-12 w-auto">
            <h1 class="ml-2 text-xl font-semibold select-none">Coeur Véritable</h1>
        </a>

        <div class="relative lg:hidden">
            <button onclick="toggleNav()" class="focus:outline-none">
                <svg class="w-6 h-6 text-[#AC9746]" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            <ul id="mobileNav"
                class="absolute right-0 top-full mt-2 hidden flex-col text-[#AC9746] px-6 py-4 space-y-4 text-md border border-gray-200 text-right bg-[#1c1c1c] w-48 rounded shadow-lg z-50">
                @foreach ([
                    'home' => 'Home',
                    'about' => 'About',
                    'services' => 'Services',
                    'contact' => 'Contact',
                ] as $route => $label)
                    <li>
                        <a href="{{ route($route) }}" class="block py-2 hover:text-[#7c6d2c]">
                            {{ $label }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>

        <ul class="hidden lg:flex gap-6 items-center text-md">
            @foreach ([
                'home' => 'Home',
                'about' => 'About',
                'services' => 'Services',
                'contact' => 'Contact',
            ] as $route => $label)
                <li>
                    <a href="{{ route($route) }}"
                        class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#AC9746] after:transition-all after:duration-300 hover:after:w-full">
                        {{ $label }}
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
</nav>
