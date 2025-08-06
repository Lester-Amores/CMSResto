<?php

namespace App\Http\Controllers;

use App\Http\Requests\IngredientRequest;
use App\Models\Ingredient;
use Exception;
use App\Services\IngredientService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class IngredientController extends Controller
{
    protected IngredientService $ingredientService;

    public function __construct(IngredientService $ingredientService)
    {
        $this->ingredientService = $ingredientService;
    }

    public function index(Request $request)
    {
        $ingredients = $this->ingredientService->getIngredient($request);
        $data = [
            'ingredients' => $ingredients->items(),
            'current_page' => $ingredients->currentPage(),
            'total_pages' => $ingredients->lastPage(),
            'total_rows' => $ingredients->total(),
            'per_page' => $ingredients->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/ingredient/index', $data);
    }

    public function store(IngredientRequest $request)
    {
        try {
            $validated = $request->validated();
            Ingredient::create($validated);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create ingredient');
        }
    }

    public function show(Ingredient $ingredient)
    {
        $ingredient->load(['unit' , 'branch']);
        return response()->json($ingredient);
    }

    public function update(IngredientRequest $request, Ingredient $ingredient)
    {

        try {
            $validated = $request->validated();
            $ingredient->update($validated);
            return redirect()->back()->with('success', 'Successfully created');
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update ingredient');
        }
    }


    public function destroy(Ingredient $ingredient)
    {
        try {
            $ingredient->delete();
            return redirect()->back()->with('success', 'Ingredient deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $ingredient = Ingredient::withTrashed()->findOrFail($request->id);
            $ingredient->restore();
            return redirect()->back()->with('success', 'Ingredient restored successfully');
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
                'ids.*' => 'integer|exists:ingredients,id',
            ]);
            Ingredient::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Ingredient deleted Successfully');
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
                'ids.*' => 'integer|exists:ingredients,id',
            ]);

            Ingredient::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Ingredient restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
