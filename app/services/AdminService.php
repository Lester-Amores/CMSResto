<?php

namespace App\Services;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminService
{
    public function getAdmin(Request $request)
    {
        $query = Admin::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', "%{$request->search}%")
                    ->orWhere('last_name', 'like', "%{$request->search}%");
            });
        }


        if ($request->filled('last_name')) {
            $query->where('last_name', $request->last_name);
        }

        $sortBy = $request->input('sort_by', 'id');
        $sortOrder = $request->filled('sort_order') ? $request->sortOrder : 'desc';
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('rowsPerPage', 10);

        return $query->paginate($perPage);
    }
}
