<?php

namespace App\Services;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

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

        return $query->paginate($perPage);
    }

    public function createBranch(Request $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/branches', 'public');
            $validated['img_src'] = $imagePath;
        }

        $validated['img_src'] = $validated['img_src'] ?? null;

        Branch::create($validated);
    }

    public function updateBranch(Request $request, Branch $branch)
    {
        $validated = $request->validated();

        if ($request->boolean('img_src_removed') && empty($validated['img_src'])) {
            throw ValidationException::withMessages([
                'img_src' => 'Image is required.'
            ]);
        }

        $imagePath = $branch->img_src;

        if ($request->boolean('img_src_removed')) {
            $imagePath = null;
            if ($branch->img_src && Storage::disk('public')->exists($branch->img_src)) {
                Storage::disk('public')->delete($branch->img_src);
            }
        }

        if ($request->hasFile('img_src')) {
            $imagePath = $request->file('img_src')->store('uploads/branches', 'public');
        }

        $validated['img_src'] = $imagePath;

        $branch->update($validated);
    }
}
