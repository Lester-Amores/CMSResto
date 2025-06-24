<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitRequest;
use App\Models\Unit;
use Exception;
use App\Services\UnitService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class UnitController extends Controller
{
    protected UnitService $unitService;

    public function __construct(UnitService $unitService)
    {
        $this->unitService = $unitService;
    }

    public function index(Request $request)
    {
        $units = $this->unitService->getUnit($request);
        $data = [
            'units' => $units->items(),
            'current_page' => $units->currentPage(),
            'total_pages' => $units->lastPage(),
            'total_rows' => $units->total(),
            'per_page' => $units->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/unit/index', $data);
    }

    public function store(UnitRequest $request)
    {
        try {
            $validated = $request->validated();
            Unit::create($validated);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create unit');
        }
    }

    public function show(Unit $unit)
    {
        return response()->json($unit);
    }

    public function update(UnitRequest $request, Unit $unit)
    {

        try {
            $validated = $request->validated();
            $unit->update($validated);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update unit');
        }
    }


    public function destroy(Unit $unit)
    {
        try {
            $unit->delete();
            return redirect()->back()->with('success', 'Unit deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $unit = Unit::withTrashed()->findOrFail($request->id);
            $unit->restore();
            return redirect()->back()->with('success', 'Unit restored successfully');
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
                'ids.*' => 'integer|exists:units,id',
            ]);
            Unit::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Unit deleted Successfully');
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
                'ids.*' => 'integer|exists:units,id',
            ]);

            Unit::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Unit restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
