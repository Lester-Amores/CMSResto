<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Exception;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;


class OrderController extends Controller
{
    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index(Request $request)
    {
        $orders = $this->orderService->getOrder($request);
        $data = [
            'orders' => $orders->items(),
            'current_page' => $orders->currentPage(),
            'total_pages' => $orders->lastPage(),
            'total_rows' => $orders->total(),
            'per_page' => $orders->perPage(),
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('admin/order/index', $data);
    }

    public function OperatorPosPage(Request $request)
    {
        $orders = $this->orderService->getOperatorOrder($request);
        $data = [
            'orders' => $orders,
        ];

        return $request->expectsJson()
            ? response()->json($data)
            : Inertia::render('operator/point-of-sale/index', $data);
    }

    public function store(OrderRequest $request)
    {
        try {
            $this->orderService->createOrder($request);
            return redirect()->back()->with('success', 'Successfully created');
        } catch (Exception $e) {
            \Log::info($e->getMessage());
            return redirect()->back()->with('error', 'Failed to create order');
        }
    }

    public function show(Order $order)
    {
        $order = $order->load('meals', 'branch');
        return response()->json($order);
    }

    public function update(OrderRequest $request, Order $order)
    {
        try {
            $this->orderService->updateOrder($request, $order);
            return redirect()->back()->with('success', 'Successfully updated');
        } catch (ValidationException $e) {
            throw $e;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Failed to update order');
        }
    }


    public function destroy(Order $order)
    {
        try {
            $order->delete();
            return redirect()->back()->with('success', 'Order deleted successfully');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Deletion failed');
        }
    }

    public function restore(Request $request)
    {
        try {
            $order = Order::withTrashed()->findOrFail($request->id);
            $order->restore();
            return redirect()->back()->with('success', 'Order restored successfully');
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
                'ids.*' => 'integer|exists:orders,id',
            ]);
            Order::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Order deleted Successfully');
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
                'ids.*' => 'integer|exists:orders,id',
            ]);

            Order::onlyTrashed()->whereIn('id', $ids)->restore();

            return redirect()->back()->with('success', 'Order restored successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'restoration failed');
        }
    }
}
