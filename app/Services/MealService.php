<?php

namespace App\Services;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class MealService
{
    public function getMeals(Request $request)
    {
        $query = Meal::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('withDeleted') && $request->withDeleted == 'true') {
            $query->withTrashed();
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('rowsPerPage', 10);


        return $query->with('menu')->paginate($perPage);
    }


    public function createMeal(Request $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/meals', 'public');
            $validated['img_src'] = $imagePath;
        }

        $validated['img_src'] = $validated['img_src'] ?? null;
        $ingredients = $validated['ingredients'];
        unset($validated['ingredients']);

        $meal = Meal::create($validated);

        $pivotData = [];
        foreach ($ingredients as $ingredient) {
            $pivotData[$ingredient['id']] = ['quantity' => $ingredient['quantity']];
        }

        $meal->ingredients()->sync($pivotData);
    }

    public function updateMeal(Request $request, Meal $meal)
    {
        $validated = $request->validated();

        if ($request->boolean('img_src_removed') && empty($validated['img_src'])) {
            throw ValidationException::withMessages([
                'img_src' => 'Image is required.'
            ]);
        }

        $imagePath = $meal->img_src;

        if ($request->boolean('img_src_removed')) {
            $imagePath = null;
            if ($meal->img_src && Storage::disk('public')->exists($meal->img_src)) {
                Storage::disk('public')->delete($meal->img_src);
            }
        }

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/meals', 'public');
        }

        $validated['img_src'] = $imagePath;

        $ingredients = $validated['ingredients'];
        unset($validated['ingredients']);

        $meal->update($validated);

        $pivotData = [];
        foreach ($ingredients as $ingredient) {
            $pivotData[$ingredient['id']] = ['quantity' => $ingredient['quantity']];
        }

        $meal->ingredients()->sync($pivotData);
    }
}
