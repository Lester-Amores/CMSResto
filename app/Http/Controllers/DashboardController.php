<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Services\AdminDashBoardService;
use App\Services\OperatorDashBoardService;
use Inertia\Inertia;

class DashboardController extends Controller
{

    protected OperatorDashBoardService $operatorDashBoardService;
    protected AdminDashboardService $adminDashBoardService;


    public function __construct(OperatorDashBoardService $operatorDashBoardService, AdminDashBoardService $adminDashBoardService )
    {
        $this->operatorDashBoardService = $operatorDashBoardService;
        $this->adminDashBoardService = $adminDashBoardService;

    }

    public function admin(Request $request)
    {
        $data = $this->adminDashBoardService->getAdminDashboard();

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/dashboard/index', ['data' => $data]);
    }

    public function adminSalesData(Request $request)
    {

        $sales = $this->adminDashBoardService->getAdminSalesData($request);

        return response()->json($sales);
    }

    public function operator(Request $request)
    {
        $data = $this->operatorDashBoardService->getOperatorDashBoard();

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('operator/dashboard/index', ['data' => $data]);
    }


    public function operatorSalesData(Request $request)
    {

        $sales = $this->operatorDashBoardService->getOperatorSalesData($request);

        return response()->json($sales);
    }
}
