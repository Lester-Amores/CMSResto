<?php

namespace App\Services;

use App\Models\Branch;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AdminDashBoardService
{
    public function getAdminDashboard(): array
    {
        return Cache::remember('dashboard:summary', now()->addMinutes(5), function () {
            return [
                'todaySales'            => $this->getTodaySales(),
                'todayCompletedOrders'  => $this->getTodayCompletedOrders(),
                'monthlySales'          => $this->getMonthlySales(),
                'totalRevenue'          => $this->getTotalRevenue(),
                'totalOrders'           => $this->getTotalOrders(),
                'orderTypes'            => $this->getOrderTypes(),
                'topMeals'              => $this->getTopMeals(),
                'branchCount'           => $this->getBranchCount()
            ];
        });
    }


    public function getAdminSalesData(Request $request)
    {
        $range = $request->get('range', 'month');
        $selectedDate = $request->get('date', now()->toDateString());

        return match ($range) {
            'year'  => $this->getYearlySales($selectedDate),
            'week'  => $this->getWeeklySales($selectedDate),
            'day'   => $this->getDailySales($selectedDate),
            default => $this->getMonthlySalesData($selectedDate),
        };
    }

    // -------------------------------
    // Private Helpers (All Branches)
    // -------------------------------

    private function getTodaySales()
    {
        return Order::whereDate('created_at', today())
            ->sum('total');
    }

    private function getTodayCompletedOrders()
    {
        return Order::whereDate('created_at', today())
            ->where('status', 'completed')
            ->count();
    }

    private function getMonthlySales()
    {
        return Order::whereMonth('created_at', now()->month)
            ->sum('total');
    }

    private function getTotalRevenue()
    {
        return Order::sum('total');
    }

    private function getTotalOrders()
    {
        return Order::count();
    }

    private function getOrderTypes()
    {
        $raw = Order::select('order_type', DB::raw('COUNT(*) as total'))
            ->groupBy('order_type')
            ->pluck('total', 'order_type');

        return [
            ['type' => 'Dine-In',  'total' => $raw[0] ?? 0],
            ['type' => 'Takeout',  'total' => $raw[1] ?? 0],
            ['type' => 'Delivery', 'total' => $raw[2] ?? 0],
        ];
    }

    private function getTopMeals()
    {
        return DB::table('order_meal')
            ->join('orders', 'order_meal.order_id', '=', 'orders.id')
            ->join('meals', 'order_meal.meal_id', '=', 'meals.id')
            ->whereMonth('orders.created_at', now()->month)
            ->select('meals.name', DB::raw('COUNT(order_meal.id) as total_orders'))
            ->groupBy('meals.name')
            ->orderByDesc('total_orders')
            ->limit(5)
            ->get();
    }

    private function getYearlySales($date)
    {
        $year = Carbon::parse($date)->year;

        return Cache::remember("dashboard:yearly_sales:$year", now()->addMinutes(5), function () use ($year) {
            return Order::select(DB::raw('MONTH(created_at) as label'), DB::raw('SUM(total) as total'))
                ->whereYear('created_at', $year)
                ->groupBy(DB::raw('MONTH(created_at)'))
                ->orderBy('label')
                ->get();
        });
    }

    private function getWeeklySales($date)
    {
        $start = Carbon::parse($date)->startOfWeek()->toDateString();
        $end = Carbon::parse($date)->endOfWeek()->toDateString();

        return Cache::remember("dashboard:weekly_sales:$start:$end", now()->addMinutes(5), function () use ($start, $end) {
            return Order::select(DB::raw('DATE(created_at) as label'), DB::raw('SUM(total) as total'))
                ->whereBetween('created_at', [$start, $end])
                ->groupBy(DB::raw('DATE(created_at)'))
                ->orderBy('label')
                ->get();
        });
    }

    private function getDailySales($date)
    {
        $day = Carbon::parse($date)->toDateString();

        return Cache::remember("dashboard:daily_sales:$day", now()->addMinutes(5), function () use ($day) {
            return Order::select(DB::raw('HOUR(created_at) as label'), DB::raw('SUM(total) as total'))
                ->whereDate('created_at', $day)
                ->groupBy(DB::raw('HOUR(created_at)'))
                ->orderBy('label')
                ->get();
        });
    }

    private function getMonthlySalesData($date)
    {
        $carbon = Carbon::parse($date);
        $month = $carbon->format('Y-m');

        return Cache::remember("dashboard:monthly_sales:$month", now()->addMinutes(5), function () use ($carbon) {
            return Order::select(DB::raw('DATE(created_at) as label'), DB::raw('SUM(total) as total'))
                ->whereMonth('created_at', $carbon->month)
                ->whereYear('created_at', $carbon->year)
                ->groupBy(DB::raw('DATE(created_at)'))
                ->orderBy('label')
                ->get();
        });
    }

    public function getBranchCount()
    {
        return Branch::Count();
    }
}
