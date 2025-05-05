<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminRequest;
use App\Models\Admin;
use App\Models\User;
use Exception;
use App\Services\AdminService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
            'admins' => $admines->items(),
            'current_page' => $admines->currentPage(),
            'total_pages' => $admines->lastPage(),
            'total_rows' => $admines->total(),
            'per_page' => $admines->perPage(),
        ];

        return Inertia::render('admin/admin/index', $data);
    }

    public function store(AdminRequest $request)
    {
        $validated = $request->validated();
        $user = User::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10)
        ]);
        Admin::create([
            'last_name' => $validated['last_name'],
            'first_name' => $validated['first_name'],
            'user_id' => $user->id
        ]);

        return redirect()->back()->with('success', 'Successfully created');
    }

    public function show(Admin $admin)
    {
        $admin = Admin::with('user')->findOrFail($admin->id);
        return response()->json($admin);
    }

    public function update(AdminRequest $request, Admin $admin)
    {
        $validated = $request->validated();

        $admin->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
        ]);

        $admin->user->update([
            'email' => $validated['email'],
            'password' => isset($validated['password'])
                ? Hash::make($validated['password'])
                : $admin->user->password,
        ]);

        return redirect()->back()->with('success', 'Successfully updated');
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
