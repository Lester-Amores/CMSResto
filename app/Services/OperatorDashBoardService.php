<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OperatorDashBoardService
{
    public function getOperatorDashBoard(): array
    {
        $branchId = $this->getBranchId();

        return [
            'todaySales'            => $this->getTodaySales($branchId),
            'todayCompletedOrders'  => $this->getTodayCompletedOrders($branchId),
            'monthlySales'          => $this->getMonthlySales($branchId),
            'totalRevenue'          => $this->getTotalRevenue($branchId),
            'totalOrders'           => $this->getTotalOrders($branchId),
            'orderTypes'            => $this->getOrderTypes($branchId),
            'topMeals'              => $this->getTopMeals($branchId),
        ];
    }

    public function getOperatorSalesData(Request $request)
    {
        $branchId = $this->getBranchId();

        $range = $request->get('range', 'month');
        $selectedDate = $request->get('date', now()->toDateString());

        return match ($range) {
            'year'  => $this->getYearlySales($branchId, $selectedDate),
            'week'  => $this->getWeeklySales($branchId, $selectedDate),
            'day'   => $this->getDailySales($branchId, $selectedDate),
            default => $this->getMonthlySalesData($branchId, $selectedDate),
        };
    }

    // -------------------------------
    // Private Helpers
    // -------------------------------

    private function getBranchId(): ?int
    {
        return Auth::user()->operator->branch_id ?? null;
    }

    private function getTodaySales($branchId)
    {
        return Order::where('branch_id', $branchId)
            ->whereDate('created_at', today())
            ->sum('total');
    }

    private function getTodayCompletedOrders($branchId)
    {
        return Order::where('branch_id', $branchId)
            ->whereDate('created_at', today())
            ->where('status', 'completed')
            ->count();
    }

    private function getMonthlySales($branchId)
    {
        return Order::where('branch_id', $branchId)
            ->whereMonth('created_at', now()->month)
            ->sum('total');
    }

    private function getTotalRevenue($branchId)
    {
        return Order::where('branch_id', $branchId)->sum('total');
    }

    private function getTotalOrders($branchId)
    {
        return Order::where('branch_id', $branchId)->count();
    }

    private function getOrderTypes($branchId)
    {
        $raw = Order::where('branch_id', $branchId)
            ->select('order_type', DB::raw('COUNT(*) as total'))
            ->groupBy('order_type')
            ->pluck('total', 'order_type');

        return [
            ['type' => 'Dine-In',  'total' => $raw[0] ?? 0],
            ['type' => 'Takeout',  'total' => $raw[1] ?? 0],
            ['type' => 'Delivery', 'total' => $raw[2] ?? 0],
        ];
    }

    private function getTopMeals($branchId)
    {
        return DB::table('order_meal')
            ->join('orders', 'order_meal.order_id', '=', 'orders.id')
            ->join('meals', 'order_meal.meal_id', '=', 'meals.id')
            ->where('orders.branch_id', $branchId)
            ->whereMonth('orders.created_at', now()->month)
            ->select('meals.name', DB::raw('COUNT(order_meal.id) as total_orders'))
            ->groupBy('meals.name')
            ->orderByDesc('total_orders')
            ->limit(5)
            ->get();
    }

    private function getYearlySales($branchId, $date)
    {
        $year = \Carbon\Carbon::parse($date)->year;

        return Order::where('branch_id', $branchId)
            ->select(DB::raw('MONTH(created_at) as label'), DB::raw('SUM(total) as total'))
            ->whereYear('created_at', $year)
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('label')
            ->get();
    }

    private function getWeeklySales($branchId, $date)
    {
        $start = Carbon::parse($date)->startOfWeek();
        $end = Carbon::parse($date)->endOfWeek();

        return Order::where('branch_id', $branchId)
            ->select(DB::raw('DATE(created_at) as label'), DB::raw('SUM(total) as total'))
            ->whereBetween('created_at', [$start, $end])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('label')
            ->get();
    }

    private function getDailySales($branchId, $date)
    {
        $day = Carbon::parse($date);

        return Order::where('branch_id', $branchId)
            ->select(DB::raw('HOUR(created_at) as label'), DB::raw('SUM(total) as total'))
            ->whereDate('created_at', $day)
            ->groupBy(DB::raw('HOUR(created_at)'))
            ->orderBy('label')
            ->get();
    }

    private function getMonthlySalesData($branchId, $date)
    {
        $carbon = Carbon::parse($date);

        return Order::where('branch_id', $branchId)
            ->select(DB::raw('DATE(created_at) as label'), DB::raw('SUM(total) as total'))
            ->whereMonth('created_at', $carbon->month)
            ->whereYear('created_at', $carbon->year)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('label')
            ->get();
    }
}
