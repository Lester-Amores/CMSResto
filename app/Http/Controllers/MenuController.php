<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuRequest;
use App\Models\Menu;
use Exception;
use App\Services\MenuService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
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
        $menus = $this->menuService->getMenu($request);
        $data = [
            'menus' => $menus->items(),
            'current_page' => $menus->currentPage(),
            'total_pages' => $menus->lastPage(),
            'total_rows' => $menus->total(),
            'per_page' => $menus->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/menu/index', $data);
    }

    public function store(MenuRequest $request)
    {
        try {
            $this->menuService->createMenu($request);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create menu');
        }
    }

    public function show(Menu $menu)
    {
        $menu = $menu->load('meals');
        return response()->json($menu);
    }

    public function update(MenuRequest $request, Menu $menu)
    {

        try {
            $this->menuService->updateMenu($request, $menu);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (ValidationException $e) {
            throw $e;
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
                'ids.*' => 'integer|exists:menus,id',
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
                'ids.*' => 'integer|exists:menus,id',
            ]);

            Menu::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Menu restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
