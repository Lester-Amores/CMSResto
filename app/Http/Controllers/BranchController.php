<?php

namespace App\Http\Controllers;

use App\Http\Requests\BranchRequest;
use App\Models\Branch;
use Exception;
use App\Services\BranchService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BranchController extends Controller
{
    protected BranchService $branchService;

    public function __construct(BranchService $branchService)
    {
        $this->branchService = $branchService;
    }

    public function index(Request $request)
    {
        $branches = $this->branchService->getBranch($request);
        $data = [
            'branches' => $branches->items(),
            'current_page' => $branches->currentPage(),
            'total_pages' => $branches->lastPage(),
            'total_rows' => $branches->total(),
            'per_page' => $branches->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/branch/index', $data);
    }

    public function store(BranchRequest $request)
    {
        try {
            $this->branchService->createBranch($request);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create branch');
        }
    }

    public function show(Branch $branch)
    {
        $branch = Branch::findOrFail($branch->id);
        return response()->json($branch);
    }

    public function update(BranchRequest $request, Branch $branch)
    {

        try {
            $this->branchService->updateBranch($request, $branch);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update branch');
        }
    }


    public function destroy(Branch $branch)
    {
        try {
            $branch->delete();
            return redirect()->back()->with('success', 'Branch deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $branch = Branch::withTrashed()->findOrFail($request->id);
            $branch->restore();
            return redirect()->back()->with('success', 'Branch restored successfully');
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
                'ids.*' => 'integer|exists:branches,id',
            ]);
            Branch::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Branch deleted Successfully');
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
                'ids.*' => 'integer|exists:branches,id',
            ]);

            Branch::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Branch restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
