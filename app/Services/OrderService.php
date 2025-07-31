<?php

namespace App\Services;

use App\Models\Meal;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function getOrder(Request $request)
    {
        $query = Order::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('order_number')) {
            $query->where('order_number', 'like', "%{$request->order_number}%");
        }

        if ($request->filled('withDeleted') && $request->withDeleted == 'true') {
            $query->withTrashed();
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        if ($sortBy === 'branch_id') {
            $query->join('branches', 'orders.branch_id', '=', 'branches.id')
                ->orderBy('branches.id', $sortOrder)
                ->select('orders.*');
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }


        $perPage = $request->input('rowsPerPage', 10);

        return $query->with('branch')->paginate($perPage);
    }

    public function getOperatorOrder(Request $request)
    {
        $query = Order::query();

        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%");
            });
        }

        if ($request->filled('name')) {
            $query->where('name', 'like', "%{$request->name}%");
        }

        if ($request->filled('withDeleted') && $request->withDeleted == 'true') {
            $query->withTrashed();
        }

        $sortBy = $request->input('sortBy', 'id');
        $sortOrder = $request->filled('sortOrder') ? $request->sortOrder : 'desc';
        $query->orderBy($sortBy, $sortOrder);

        return $query->with('meals')->get();
    }

    public function createOrder(Request $request)
    {
        $validated = $request->validated();

        return DB::transaction(function () use ($validated) {
            $orderData = collect($validated)->except('meals')->toArray();
            $order = Order::create($orderData);
            $order->update([
                'order_number' => 'ORD-' . str_pad($order->id, 6, '0', STR_PAD_LEFT),
            ]);

            $this->attachMeals($order, $validated['meals']);
            return $order->load('meals', 'branch');
        });
    }

    public function updateOrder(Request $request, Order $order)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $order) {
            $orderData = collect($validated)->except('meals')->toArray();
            $order->update($orderData);

            $this->attachMeals($order, $validated['meals'], true);
        });
    }

    protected function attachMeals(Order $order, array $meals, bool $sync = false): void
    {
        $pivotData = [];

        foreach ($meals as $meal) {
            $mealModel = Meal::findOrFail($meal['meal_id']);
            $quantity = $meal['quantity'];
            $price = $mealModel->price;
            $total = $price * $quantity;

            $pivotData[$meal['meal_id']] = [
                'quantity' => $quantity,
                'price' => $price,
                'total' => $total,
            ];
        }

        if ($sync) {
            $order->meals()->sync($pivotData);
        } else {
            $order->meals()->attach($pivotData);
        }
    }
}
