<?php

namespace App\Services;

use App\Models\Material;
use Illuminate\Http\Request;



class MaterialService
{
    public function getMaterial(Request $request)
    {
        $query = Material::query();

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
