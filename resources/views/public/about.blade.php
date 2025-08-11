@extends('layouts.app')

@section('content')
<div class="max-w-5xl mx-auto px-8 py-24">
    {{-- Page Title --}}
    <h1 class="text-4xl font-bold text-center text-yellow-800 mb-8">About</h1>

    <section class="mb-12 text-center">
        <p class="text-lg text-gray-700 leading-relaxed">
            Welcome to <span class="font-semibold">Coeur Véritable</span> —
            where every dish is crafted with love, fresh ingredients, and a passion for flavor.
            Since our doors opened in 2012, we’ve been committed to serving meals that warm the heart
            and bring people together.
        </p>
    </section>

    {{-- Our Story --}}
    <section class="mb-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
            <img src="{{ url('/images/menu-hero-images.jpg') }}" alt="Our Kitchen" class="rounded-lg shadow-md">
        </div>
        <div>
            <h2 class="text-2xl font-semibold text-yellow-800 mb-4">Our Story</h2>
            <p class="text-gray-700 leading-relaxed">
                Coeur Véritable started as a small family-run eatery with a dream — to share our heritage
                and culinary traditions with the community.
                Over the years, we’ve grown into a local favorite, known for our signature recipes,
                welcoming atmosphere, and commitment to quality.
            </p>
        </div>
    </section>

    {{-- Mission & Values --}}
    <section class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-white shadow rounded-lg p-6 border-t-4 border-yellow-600">
            <h3 class="text-xl font-semibold mb-3">Our Mission</h3>
            <p class="text-gray-700">
                To serve delicious, fresh, and affordable meals that create memorable dining experiences
                for families, friends, and food lovers alike.
            </p>
        </div>
        <div class="bg-white shadow rounded-lg p-6 border-t-4 border-yellow-600">
            <h3 class="text-xl font-semibold mb-3">Our Values</h3>
            <ul class="list-disc pl-5 text-gray-700 space-y-2">
                <li>Fresh, locally sourced ingredients</li>
                <li>Warm and welcoming service</li>
                <li>Clean and comfortable dining space</li>
                <li>Respect for culinary tradition</li>
            </ul>
        </div>
    </section>

    {{-- Meet the Chef --}}
    <section class="mb-12 text-center">
        <h2 class="text-2xl font-semibold text-yellow-800 mb-6">Meet Our Chef</h2>
        <div class="max-w-sm mx-auto bg-white shadow rounded-lg p-6">
            <img src="https://ui-avatars.com/api/?name=Chef+Maria+Lopez&size=128&background=facc15&color=fff"
                alt="Head Chef" class="w-32 h-32 mx-auto rounded-full mb-4 object-cover">
            <h3 class="text-lg font-semibold">Chef Maria Lopez</h3>
            <p class="text-gray-500 text-sm mb-3">Head Chef & Co-Founder</p>
            <p class="text-gray-700">
                With over 15 years of culinary experience, Chef Maria combines traditional recipes with
                modern techniques to create dishes that delight the senses.
            </p>
        </div>
    </section>

    {{-- Call to Action --}}
    <section class="text-center mt-12">
        <h3 class="text-xl font-semibold mb-4">Come Dine With Us!</h3>
        <p class="text-gray-700 mb-6">
            Experience the flavors of our kitchen today.
            We can’t wait to welcome you and share a meal together.
        </p>

    </section>
</div>
@endsection