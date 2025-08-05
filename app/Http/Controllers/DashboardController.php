<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Services\OperatorDashBoardService;
use Inertia\Inertia;

class DashboardController extends Controller
{

    protected OperatorDashBoardService $operatorDashBoardService;

    public function __construct(OperatorDashBoardService $operatorDashBoardService)
    {
        $this->operatorDashBoardService = $operatorDashBoardService;
    }

    public function admin()
    {
        $todaySales = Order::whereDate('created_at', today())->sum('total');

        $todayCompletedOrders = Order::whereDate('created_at', today())
            ->where('status', 'completed')
            ->count();

        $monthlySales = Order::whereMonth('created_at', now()->month)->sum('total');

        return inertia('Admin/Dashboard', [
            'todaySales' => $todaySales,
            'todayCompletedOrders' => $todayCompletedOrders,
            'monthlySales' => $monthlySales,
        ]);
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
