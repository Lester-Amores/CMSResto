<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="{{ asset('images/app-logo.png') }}">

    <title>{{ ($title ?? '') . ' - ' . config('app.name') }}</title>
    <meta name="description" content="{{ $description ?? '' }}">
    <meta name="app-url" content="{{ config('app.url') }}">
    <meta property="og:title" content="{{ $title ?? config('app.name') }}">
    <meta property="og:description" content="{{ $description ?? '' }}">

    @vite('resources/css/app.css')
    @vite('resources/js/public/app.ts')
</head>

<body class="font-crimson antialiased">
    <header>
        @if ($routeName !== 'home')
            <x-nav />
        @endif
    </header>

    <main class="w-full">
        @yield('content')
    </main>

    <footer class="text-center py-4 bg-[#1c1c1c] text-white">
        &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
    </footer>
</body>

</html>
