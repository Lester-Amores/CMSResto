<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
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
        $user = Auth::user();
        $branchId = $user->operator->branch_id ?? null;

        $query = Order::where('branch_id', $branchId);

        $totalRevenue = (clone $query)->sum('total');

        $totalOrders = (clone $query)->count();

        $todaySales = (clone $query)->whereDate('created_at', today())->sum('total');

        $todayCompletedOrders = (clone $query)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->count();

        $monthlySales = (clone $query)
            ->whereMonth('created_at', now()->month)
            ->sum('total');

        $topMeals = DB::table('order_meal')
            ->join('orders', 'order_meal.order_id', '=', 'orders.id')
            ->join('meals', 'order_meal.meal_id', '=', 'meals.id')
            ->where('orders.branch_id', $branchId)
            ->whereMonth('orders.created_at', now()->month)
            ->select('meals.name', DB::raw('COUNT(order_meal.id) as total_orders'))
            ->groupBy('meals.name')
            ->orderByDesc('total_orders')
            ->limit(5)
            ->get();

        $orderTypesRaw = (clone $query)
            ->select('order_type', DB::raw('COUNT(*) as total'))
            ->groupBy('order_type')
            ->pluck('total', 'order_type');

        $orderTypes = [
            ['type' => 'Dine-In',   'total' => $orderTypesRaw[0] ?? 0],
            ['type' => 'Takeout',   'total' => $orderTypesRaw[1] ?? 0],
            ['type' => 'Delivery',  'total' => $orderTypesRaw[2] ?? 0],
            ['type' => 'Check-In',  'total' => $orderTypesRaw[3] ?? 0],
            ['type' => 'Checkout',  'total' => $orderTypesRaw[4] ?? 0],
        ];


        $data = [
            'todaySales' => $todaySales,
            'todayCompletedOrders' => $todayCompletedOrders,
            'monthlySales' => $monthlySales,
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'orderTypes' => $orderTypes,
            'topMeals' => $topMeals,
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('operator/dashboard/index', ['data' => $data]);
    }


    public function operatorSalesData(Request $request)
    {
        $user = Auth::user();
        $branchId = $user->operator->branch_id ?? null;

        $range = $request->get('range', 'month');
        $selectedDate = $request->get('date', now()->toDateString()); // default today

        $query = Order::where('branch_id', $branchId);

        switch ($range) {
            case 'year':
                $year = \Carbon\Carbon::parse($selectedDate)->year;
                $sales = (clone $query)
                    ->select(DB::raw('MONTH(created_at) as label'), DB::raw('SUM(total) as total'))
                    ->whereYear('created_at', $year)
                    ->groupBy(DB::raw('MONTH(created_at)'))
                    ->orderBy('label')
                    ->get();
                break;

            case 'week':
                $start = \Carbon\Carbon::parse($selectedDate)->startOfWeek();
                $end = \Carbon\Carbon::parse($selectedDate)->endOfWeek();
                $sales = (clone $query)
                    ->select(DB::raw('DATE(created_at) as label'), DB::raw('SUM(total) as total'))
                    ->whereBetween('created_at', [$start, $end])
                    ->groupBy(DB::raw('DATE(created_at)'))
                    ->orderBy('label')
                    ->get();
                break;

            case 'day':
                $day = \Carbon\Carbon::parse($selectedDate);
                $sales = (clone $query)
                    ->select(DB::raw('HOUR(created_at) as label'), DB::raw('SUM(total) as total'))
                    ->whereDate('created_at', $day)
                    ->groupBy(DB::raw('HOUR(created_at)'))
                    ->orderBy('label')
                    ->get();
                break;

            default: // month
                $month = \Carbon\Carbon::parse($selectedDate)->month;
                $year = \Carbon\Carbon::parse($selectedDate)->year;
                $sales = (clone $query)
                    ->select(DB::raw('DATE(created_at) as label'), DB::raw('SUM(total) as total'))
                    ->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year)
                    ->groupBy(DB::raw('DATE(created_at)'))
                    ->orderBy('label')
                    ->get();
                break;
        }

        return response()->json($sales);
    }
}
