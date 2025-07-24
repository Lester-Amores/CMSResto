<?php

namespace App\Services;

use App\Models\Ingredient;
use Illuminate\Http\Request;



class IngredientService
{
    public function getIngredient(Request $request)
    {
        $query = Ingredient::query();

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

        $perPage = min($request->input('per_page', 10), 100);

        return $query->with('unit')->paginate($perPage);
    }
}
