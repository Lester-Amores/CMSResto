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
        $admins = $this->adminService->getAdmin($request);
        $data = [
            'admins' => $admins->items(),
            'current_page' => $admins->currentPage(),
            'total_pages' => $admins->lastPage(),
            'total_rows' => $admins->total(),
            'per_page' => $admins->perPage(),
        ];

        return Inertia::render('admin/admin/index', $data);
    }

    public function store(AdminRequest $request)
    {
        \Log::info($request->all());
        try {
            $this->adminService->createAdmin($request);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to create admin');
        }
    }

    public function show(Admin $admin)
    {
        $admin = Admin::with('user')->findOrFail($admin->id);
        return response()->json($admin);
    }

    public function update(AdminRequest $request, Admin $admin)
    {

        try {
            $this->adminService->updateAdmin($request, $admin);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update admin');
        }
    }


    public function destroy(Admin $admin)
    {
        try {
            $admin->delete();
            return redirect()->back()->with('success', 'Admin deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $admin = Admin::withTrashed()->findOrFail($request->id);
            $admin->restore();
            return redirect()->back()->with('success', 'Admin restored successfully');
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
                'ids.*' => 'integer|exists:admins,id',
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
                'ids.*' => 'integer|exists:admins,id',
            ]);

            Admin::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Admin restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
