import { Button } from "@/admin/components/ui/button";
import type { Order } from "@/admin/types";

interface Props {
    receiptData: Order;
    setShowReceipt: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReceiptCard = ({ receiptData, setShowReceipt }: Props) => {
    return (
        <div className="p-4 text-sm font-mono bg-white text-black">
            <div className="border border-gray-300 p-4 w-[280px] mx-auto">
                <div className="text-center mb-2">
                    <h2 className="font-bold text-base">Coeur Véritable</h2>
                    <p className="text-xs">{receiptData.branch?.address}</p>
                    <p className="text-xs">TIN: 123-456-789-000</p>
                </div>

                <div className="border-t border-b py-1 text-xs mb-2">
                    <p>Receipt #: <strong>{receiptData.order_number}</strong></p>
                    <p>Branch: {receiptData.branch?.name || 'Main Branch'}</p>
                    <p>Date: {new Date(receiptData.created_at).toLocaleString()}</p>
                </div>

                <div className="text-xs mb-2">
                    {receiptData.meals.map((meal: any, idx: number) => (
                        <div key={idx} className="flex justify-between">
                            <span>{meal.name} x {meal.pivot.quantity}</span>
                            <span>
                                ₱{(Number(meal.price) * Number(meal.pivot.quantity)).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-1 text-xs">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₱{Number(receiptData.subtotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>VAT (12%):</span>
                        <span>₱{Number(receiptData.tax_amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount:</span>
                        <span>-₱{Number(receiptData.discount_amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-1">
                        <span>Total:</span>
                        <span>₱{Number(receiptData.total || 0).toFixed(2)}</span>
                    </div>
                </div>

                <div className="text-center mt-2 text-[11px]">
                    <p>Thank you for dining with us!</p>
                    <p>THIS IS NOT AN OFFICIAL RECEIPT</p>
                </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setShowReceipt(false)}>Close</Button>
                <Button onClick={() => window.print()}>Print</Button>
            </div>
        </div>
    );
};
