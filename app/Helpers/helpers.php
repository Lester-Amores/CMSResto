<?php

function getFullImageUrl($path)
{
    if (!$path) return '';

    $baseUrl = config('app.url') ?? request()->getSchemeAndHttpHost();

    return str_starts_with($path, 'storage/') || str_starts_with($path, 'images/')
        ? $baseUrl . '/' . $path
        : $baseUrl . '/storage/' . $path;
}
