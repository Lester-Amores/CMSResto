<nav class="w-full flex justify-end h-16 pr-10 text-white">
    <ul class="flex gap-4 items-center h-full">
        <li class="h-full flex items-center justify-center px-4">
            <a href="{{ route('home') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                Home</a>
        </li>
        <li class="h-full flex items-center justify-center px-4">
            <a href="{{ route('about') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                About
            </a>
        </li>
        <li class="h-full flex items-center justify-cente px-4">
            <a href="{{ route('services') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                Services</a>
        </li>
        <li class="h-full flex items-center justify-center px-4">
            <a href="{{ route('contact') }}"
                class="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full">
                Contact</a>
        </li>
    </ul>
</nav>
