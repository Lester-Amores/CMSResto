<?php

namespace App\Http\Controllers;

use App\Http\Requests\MaterialRequest;
use App\Models\Material;
use Exception;
use App\Services\MaterialService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MaterialController extends Controller
{
    protected MaterialService $materialService;

    public function __construct(MaterialService $materialService)
    {
        $this->materialService = $materialService;
    }

    public function index(Request $request)
    {
        $materials = $this->materialService->getMaterial($request);
        $data = [
            'materials' => $materials->items(),
            'current_page' => $materials->currentPage(),
            'total_pages' => $materials->lastPage(),
            'total_rows' => $materials->total(),
            'per_page' => $materials->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/material/index', $data);
    }

    public function store(MaterialRequest $request)
    {
        try {
            $validated = $request->validated();
            Material::create($validated);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create material');
        }
    }

    public function show(Material $material)
    {
        $material->load('unit');
        return response()->json($material);
    }

    public function update(MaterialRequest $request, Material $material)
    {

        try {
            $validated = $request->validated();
            $material->update($validated);
            return redirect()->back()->with('success', 'Successfully created');
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update material');
        }
    }


    public function destroy(Material $material)
    {
        try {
            $material->delete();
            return redirect()->back()->with('success', 'Material deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $material = Material::withTrashed()->findOrFail($request->id);
            $material->restore();
            return redirect()->back()->with('success', 'Material restored successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }

    public function multiDelete(Request $request)
    {
        try {
            $ids = $request->input('ids');
            $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'integer|exists:materials,id',
            ]);
            Material::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Material deleted Successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function multiRestore(Request $request)
    {
        try {
            $ids = $request->input('ids');
            $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'integer|exists:materials,id',
            ]);

            Material::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Material restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
