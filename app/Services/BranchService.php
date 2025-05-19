<?php

namespace App\Services;

use App\Models\Branch;
use Illuminate\Http\Request;



class BranchService
{
    public function getBranch(Request $request)
    {
        $query = Branch::query();

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

        return $query->with('operator.user')->paginate($perPage);
    }
}
