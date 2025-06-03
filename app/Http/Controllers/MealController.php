<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use App\Http\Requests\MealRequest;
use App\Services\MealService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MealController extends Controller
{
    protected MealService $mealService;

    public function __construct(MealService $mealService)
    {
        $this->mealService = $mealService;
    }

    public function index(Request $request)
    {
        $meals = $this->mealService->getMeals($request);

        $data = [
            'meals' => $meals->items(),
            'current_page' => $meals->currentPage(),
            'total_pages' => $meals->lastPage(),
            'total_rows' => $meals->total(),
            'per_page' => $meals->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/meal/index', $data);
    }

    public function store(MealRequest $request)
    {
        try {
            $this->mealService->createMeal($request);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create meal');
        }
    }

    public function show(Meal $meal)
    {
        $meal = $meal->load('menu');
        return response()->json($meal);
    }

    public function update(MealRequest $request, Meal $meal)
    {

        try {
            $this->mealService->updateMeal($request, $meal);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update meal');
        }
    }

    public function destroy(Meal $meal)
    {
        try {
            $meal->delete();
            return redirect()->back()->with('success', 'Meal deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $meal = Meal::withTrashed()->findOrFail($request->id);
            $meal->restore();
            return redirect()->back()->with('success', 'Meal restored successfully');
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
                'ids.*' => 'integer|exists:meals,id',
            ]);
            Meal::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Meal deleted Successfully');
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
                'ids.*' => 'integer|exists:meals,id',
            ]);

            Meal::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Meal restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
