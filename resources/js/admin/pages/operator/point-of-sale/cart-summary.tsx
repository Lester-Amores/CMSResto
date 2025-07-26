interface CartSummaryProps {
    subtotal: number;
    totalTax: number;
    discount: number;
    total: number;
}

export function CartSummary({ subtotal, totalTax, discount, total }: CartSummaryProps) {
    return (
        <div className="border-t text-right text-sm">
            <div className="text-gray-600">Subtotal: ₱{subtotal.toFixed(2)}</div>
            <div className="text-gray-600">VAT Included (12%): ₱{totalTax.toFixed(2)}</div>
            {discount > 0 && <div className="text-green-600">Discount: -₱{discount.toFixed(2)}</div>}
            <div className="text-lg font-semibold">Total: ₱{total.toFixed(2)}</div>
        </div>
    );
}
