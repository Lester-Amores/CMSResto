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
            $amounts = $this->calculateAmounts($validated);
            $orderData = collect($validated)
                ->except('meals')
                ->merge($amounts)
                ->toArray();
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
            $amounts = $this->calculateAmounts($validated);
            $orderData = collect($validated)
                ->except('meals')
                ->merge($amounts)
                ->toArray();
            $order->update($orderData);

            $this->attachMeals($order, $validated['meals'], true);
        });
    }

    /**
     * Calculate subtotal, discount_amount, tax_amount, and total on the server.
     *
     * @param array $validated
     * @return array{subtotal: float, discount_amount: float, tax_amount: float, total: float}
     */
    protected function calculateAmounts(array $validated): array
    {
        $subtotal = 0.0;

        foreach ($validated['meals'] as $meal) {
            $mealModel = Meal::findOrFail($meal['meal_id']);
            $quantity = (int) $meal['quantity'];
            $price = (float) $mealModel->price;
            $subtotal += $price * $quantity;
        }

        $discountAmount = isset($validated['discount_amount'])
            ? max(0.0, (float) $validated['discount_amount'])
            : 0.0;

        // Cap discount so it cannot exceed subtotal
        $discountAmount = min($discountAmount, $subtotal);

        $taxAmount = isset($validated['tax_amount'])
            ? max(0.0, (float) $validated['tax_amount'])
            : 0.0;

        $total = $subtotal - $discountAmount + $taxAmount;

        return [
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'tax_amount' => $taxAmount,
            'total' => $total,
        ];
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
