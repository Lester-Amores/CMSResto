<nav class="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-18 pr-10 text-[#AC9746] bg-[#1c1c1c] shadow-md">
    <div class="flex items-center h-full">
        <a href="{{ route('home') }}" class="flex items-center h-full">
            <img src="{{ asset('images/app-logo.png') }}" alt="App Logo" class="h-12 w-auto pl-8">
            <h1 class="ml-2 text-xl text-[#AC9746] select-none">Coeur Véritable</h1>
        </a>
    </div>
    <ul class="flex gap-4 items-center h-full text-md">
        <li class="h-full flex items-center justify-center px-4">
            <a href="{{ route('home') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#AC9746] after:transition-all after:duration-300 hover:after:w-full">
                Home</a>
        </li>
        <li class="h-full flex items-center justify-center px-4">
            <a href="{{ route('about') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#AC9746] after:transition-all after:duration-300 hover:after:w-full">
                About
            </a>
        </li>
        <li class="h-full flex items-center justify-cente px-4">
            <a href="{{ route('services') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#AC9746] after:transition-all after:duration-300 hover:after:w-full">
                Services</a>
        </li>
        <li class="h-full flex items-center justify-center px-4">
            <a href="{{ route('contact') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#AC9746] after:transition-all after:duration-300 hover:after:w-full">
                Contact</a>
        </li>
    </ul>
</nav>
