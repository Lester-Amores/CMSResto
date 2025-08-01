import { Button } from "@/admin/components/ui/button";
import type { Order } from "@/admin/types";

interface KitchenCardProps {
    order: Order;
    onStatusChange: (orderId: number, newStatus: 1 | 2) => void;
}

export const KitchenCard = ({ order, onStatusChange }: KitchenCardProps) => {
    const isPending = order.status === 0;
    const isReady = order.status === 1;

    return (
        <div className="min-w-[240px] bg-white border rounded-lg shadow-sm p-4 flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900">#{order.order_number}</h3>
                <span className="text-xs text-gray-500">
                    {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>

            <div className="flex flex-col gap-1 flex-1">
                {order.meals.map((meal: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-800">
                            {meal.name}
                        </span>
                        <span className="text-base font-bold text-gray-900">x{meal.pivot.quantity}</span>
                    </div>
                ))}
            </div>

            {order.notes && (
                <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800">
                    {order.notes}
                </div>
            )}

            {/* ✅ Status Buttons */}
            <div className="flex gap-2 mt-3">
                {isPending && (
                    <>
                        <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => onStatusChange(order.id, 1)}
                        >
                            Mark Ready
                        </Button>
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => onStatusChange(order.id, 2)}
                        >
                            Complete
                        </Button>
                    </>
                )}

                {isReady && (
                    <Button
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => onStatusChange(order.id, 2)}
                    >
                        Complete
                    </Button>
                )}
            </div>
        </div>
    );
};
