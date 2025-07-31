import { Label } from "@/admin/components/ui/label";

interface PaymentMethodSelectorProps {
    paymentMethod: number;
    setPaymentMethod: (method: 'cash' | 'card' | 'ewallet') => void;
}

export function PaymentMethodSelector({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) {
    return (
        <div className="mt-2">
            <Label className="text-xs">Payment Method:</Label>
            <select
                className="w-full border rounded p-1 text-sm dark:bg-black"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
            >
                <option value={0}>Cash</option>
                <option value={1}>Card</option>
                <option value={2}>E-Wallet</option>
            </select>
        </div>
    );
}
