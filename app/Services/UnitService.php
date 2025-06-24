<?php

namespace App\Services;

use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UnitService
{
    public function getUnit(Request $request)
    {
        $query = Unit::query();

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
}
