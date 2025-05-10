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
                $q->where('first_name', 'like', "%{$request->search}%")
                    ->orWhere('last_name', 'like', "%{$request->search}%");
            });
        }


        if ($request->filled('name')) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        if ($request->filled('email')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('email', 'like', "%{$request->email}%");
            });
        }

        if ($request->filled('withDeleted') && $request->withDeleted == 'true') {
            $query->withTrashed();
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        if ($sortBy === 'email') {
            $query->join('operators', 'branches.operator_id', '=', 'operators.id')
                ->join('users', 'operators.user_id', '=', 'users.id')
                ->orderBy('users.email', $sortOrder)
                ->addSelect('branches.*');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }


        $perPage = $request->input('rowsPerPage', 10);

        return $query->with('user')->paginate($perPage);
    }
}
