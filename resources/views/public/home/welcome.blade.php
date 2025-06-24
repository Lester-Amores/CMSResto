<div class="relative w-full h-screen overflow-hidden">
    <video autoplay muted loop playsinline class="absolute top-0 left-0 w-full h-full object-cover -z-10">
        <source src="{{ asset('videos/welcome-video.mp4') }}" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-40 -z-5"></div>

    <x-nav variant="dark" />

    <div
        class="relative z-10 flex flex-col items-center justify-center pb-10 h-full text-white px-4 text-center container mx-auto">
        <div>
            <img src="{{ asset('images/app-logo.png') }}" alt="App Logo" class="h-50 w-auto pl-8 ">
        </div>
        <h1 class="text-8xl font-bold mb-4">Welcome To Coeur Véritable</h1>
        <p class="text-5xl max-w-lg">True Heart, Fine Taste</p>

        <div class="mt-8">
            <button
                class="bg-[#AC9746] text-white text-lg px-6 py-3 rounded-full shadow-md hover:bg-[#937f3c] transition duration-300 cursor-pointer">
                Reserve Now
            </button>


        </div>

    </div>
</div>
