<?php

namespace App\Http\Controllers;

use App\Http\Requests\OperatorRequest;
use App\Models\Operator;
use Exception;
use App\Services\OperatorService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class OperatorController extends Controller
{
    protected OperatorService $operatorService;

    public function __construct(OperatorService $operatorService)
    {
        $this->operatorService = $operatorService;
    }

    public function index(Request $request)
    {
        $operators = $this->operatorService->getOperator($request);
        $data = [
            'operators' => $operators->items(),
            'current_page' => $operators->currentPage(),
            'total_pages' => $operators->lastPage(),
            'total_rows' => $operators->total(),
            'per_page' => $operators->perPage(),
        ];

        return Inertia::render('admin/operator/index', $data);
    }

    public function store(OperatorRequest $request)
    {
        try {
            $this->operatorService->createOperator($request);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create operator');
        }
    }

    public function show(Operator $operator)
    {
        $operator = Operator::with('user')->findOrFail($operator->id);
        return response()->json($operator);
    }

    public function update(OperatorRequest $request, Operator $operator)
    {

        try {
            $this->operatorService->updateOperator($request, $operator);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update operator');
        }
    }


    public function destroy(Operator $operator)
    {
        try {
            $operator->delete();
            return redirect()->back()->with('success', 'Operator deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $operator = Operator::withTrashed()->findOrFail($request->id);
            $operator->restore();
            return redirect()->back()->with('success', 'Operator restored successfully');
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
                'ids.*' => 'integer|exists:operators,id',
            ]);
            Operator::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Operator deleted Successfully');
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
                'ids.*' => 'integer|exists:operators,id',
            ]);

            Operator::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Operator restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
