<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Models\Menu;
use Exception;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MenuController extends Controller
{
    protected MenuService $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    public function index(Request $request)
    {
        $menues = $this->menuService->getMenu($request);
        $data = [
            'menues' => $menues->items(),
            'current_page' => $menues->currentPage(),
            'total_pages' => $menues->lastPage(),
            'total_rows' => $menues->total(),
            'per_page' => $menues->perPage(),
        ];

        if ($request->expectsJson()) {
        return response()->json($data);
    }
        return Inertia::render('admin/menu/index', $data);
    }

    public function store(MenuRequest $request)
    {
        try {
            $validated = $request->validated();
            Menu::create($validated);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create menu');
        }
    }

    public function show(Menu $menu)
    {
        $menu = Menu::findOrFail($menu->id);
        return response()->json($menu);
    }

    public function update(MenuRequest $request, Menu $menu)
    {

        try {
            $validated = $request->validated();
            $menu->update($validated);
            return redirect()->back()->with('success', 'Successfully created');
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update menu');
        }
    }


    public function destroy(Menu $menu)
    {
        try {
            $menu->delete();
            return redirect()->back()->with('success', 'Menu deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $menu = Menu::withTrashed()->findOrFail($request->id);
            $menu->restore();
            return redirect()->back()->with('success', 'Menu restored successfully');
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
                'ids.*' => 'integer|exists:menues,id',
            ]);
            Menu::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Menu deleted Successfully');
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
                'ids.*' => 'integer|exists:menues,id',
            ]);

            Menu::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Menu restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
