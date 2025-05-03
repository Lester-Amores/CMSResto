<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRequest;
use App\Models\Admin;
use Exception;
use App\Services\AdminService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    protected AdminService $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    public function index(Request $request)
    {
        $admines = $this->adminService->getAdmin($request);
        $data = [
            'admines' => $admines->items(),
            'current_page' => $admines->currentPage(),
            'total_pages' => $admines->lastPage(),
            'total_rows' => $admines->total(),
            'per_page' => $admines->perPage(),
        ];

        return Inertia::render('admin/index', $data);
    }

    public function store(AdminRequest $request)
    {
        $validated = $request->validated();
        Admin::create($validated);
        return redirect()->back()->with('success', 'Successfully created');
    }

    public function show(Admin $admin)
    {
        return response()->json($admin);
    }

    public function update(AdminRequest $request, Admin $admin)
    {
        $validated = $request->validated();
        $admin->update($validated);

        return redirect()->back()->with('success', 'Successfully updated');
    }

    public function destroy(Admin $admin)
    {
        try{
        $admin->delete();
        return redirect()->back()->with('success', 'Admin deleted successfully');
        } catch (Exception $e){
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
        $admin = Admin::withTrashed()->findOrFail($request->id);
        $admin->restore();
        return redirect()->back()->with('success', 'Admin restored successfully');
        } catch (Exception $e){
            return redirect()->back()->with('error', 'restoration failed');
        }
    }

    public function multiDelete(Request $request)
    {
        try {
            $ids = $request->input('ids');
            $request->validate([
                'ids' => 'required|array',
                'ids.*' => 'integer|exists:clients,id',
            ]);
            Admin::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Admin deleted Successfully');
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
                'ids.*' => 'integer|exists:clients,id',
            ]);

            Admin::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Admin restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
