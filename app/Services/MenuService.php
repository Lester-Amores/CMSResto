<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class MenuService
{
    public function getMenu(Request $request)
    {
        $query = Menu::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('name')) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        if ($request->filled('withDeleted') && $request->withDeleted == 'true') {
            $query->withTrashed();
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        $query->orderBy($sortBy, $sortOrder);



        $perPage = $request->input('rowsPerPage', 10);

        return $query->paginate($perPage);
    }

    public function getOperatorMenu(Request $request)
    {
        $query = Menu::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('name')) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        if ($request->filled('withDeleted') && $request->withDeleted == 'true') {
            $query->withTrashed();
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return $query->with('meals')->get();
    }

    public function createMenu(Request $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/menus', 'public');
            $validated['img_src'] = $imagePath;
        }

        $validated['img_src'] = $validated['img_src'] ?? null;

        Menu::create($validated);
    }

    public function updateMenu(Request $request, Menu $menu)
    {
        $validated = $request->validated();

        if ($request->boolean('img_src_removed') && empty($validated['img_src'])) {
            throw ValidationException::withMessages([
                'img_src' => 'Image is required.'
            ]);
        }

        $imagePath = $menu->img_src;

        if ($request->boolean('img_src_removed')) {
            $imagePath = null;
            if ($menu->img_src && Storage::disk('public')->exists($menu->img_src)) {
                Storage::disk('public')->delete($menu->img_src);
            }
        }

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/menus', 'public');
        }

        $validated['img_src'] = $imagePath;

        $menu->update($validated);
    }
}
