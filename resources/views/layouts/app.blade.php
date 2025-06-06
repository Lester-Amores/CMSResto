<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ $title ?? config('app.name') }}</title>
    <meta name="description" content="{{ $description ?? '' }}">
    <meta property="og:title" content="{{ $title ?? config('app.name') }}">
    <meta property="og:description" content="{{ $description ?? '' }}">
    
    @vite('resources/css/app.css')
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

    <footer class="text-center py-4">
        &copy; {{ date('Y') }} MySite. All rights reserved.
    </footer>
</body>

</html>
