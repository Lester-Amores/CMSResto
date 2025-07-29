import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import type { Order } from '@/admin/types';

interface OrderFormProps {
    register: UseFormRegister<Order>;
    errors: FieldErrors<Order>;
    watch: UseFormWatch<Order>;
}

const OrderForm = ({ register, errors, watch }: OrderFormProps) => {
    const discountType = watch("discount_type");

    return (
        <>
            <div className="mb-4">
                <Label htmlFor="order_type" required>Order Type</Label>
                <select
                    id="order_type"
                    {...register("order_type", { required: 'Order type is required', valueAsNumber: true })}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select type</option>
                    <option value={0}>Dine-in</option>
                    <option value={1}>Takeout</option>
                    <option value={2}>Delivery</option>
                    <option value={3}>Check-in</option>
                    <option value={4}>Check-out</option>
                </select>
                {errors.order_type && <p className="text-red-600 text-sm mt-1">{errors.order_type.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="discount_type" required>Discount Type</Label>
                <select
                    id="discount_type"
                    {...register("discount_type", { valueAsNumber: true })}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select discount</option>
                    <option value={0}>None</option>
                    <option value={1}>Senior</option>
                    <option value={2}>PWD</option>
                    <option value={3}>Promo</option>
                </select>
                {errors.discount_type && <p className="text-red-600 text-sm mt-1">{errors.discount_type.message}</p>}
            </div>

            {(discountType === 1 || discountType === 2) && (
                <div className="mb-4">
                    <Label htmlFor="discount_id_number">Discount ID Number</Label>
                    <Input
                        id="discount_id_number"
                        {...register("discount_id_number", {
                            required: 'Discount ID Number is required for Senior/PWD'
                        })}
                        type="text"
                        placeholder="Required if discount is Senior or PWD"
                    />
                    {errors.discount_id_number && <p className="text-red-600 text-sm mt-1">{errors.discount_id_number.message}</p>}
                </div>
            )}

            {discountType !== undefined && discountType !== null && discountType !== 0 && (
                <div className="mb-4">
                    <Label htmlFor="discount_amount">Discount Amount</Label>
                    <Input
                        id="discount_amount"
                        {...register("discount_amount")}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                    />
                    {errors.discount_amount && <p className="text-red-600 text-sm mt-1">{errors.discount_amount.message}</p>}
                </div>
            )}

            <div className="mb-4">
                <Label htmlFor="subtotal">Subtotal</Label>
                <Input
                    id="subtotal"
                    {...register("subtotal", { required: 'Subtotal is required', valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                />
                {errors.subtotal && <p className="text-red-600 text-sm mt-1">{errors.subtotal.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="total">Total</Label>
                <Input
                    id="total"
                    {...register("total", { required: 'Total is required', valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                />
                {errors.total && <p className="text-red-600 text-sm mt-1">{errors.total.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="payment_method" required>Payment Method</Label>
                <select
                    id="payment_method"
                    {...register("payment_method", { required: 'Payment method is required', valueAsNumber: true })}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select payment method</option>
                    <option value={0}>Cash</option>
                    <option value={1}>Card</option>
                    <option value={2}>E-Wallet</option>
                </select>
                {errors.payment_method && <p className="text-red-600 text-sm mt-1">{errors.payment_method.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="status" required>Status</Label>
                <select
                    id="status"
                    {...register("status", { required: 'Status is required', valueAsNumber: true })}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select status</option>
                    <option value={0}>Preparing</option>
                    <option value={1}>Ready</option>
                    <option value={2}>Completed</option>
                    <option value={3}>Cancelled</option>
                </select>
                {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="notes">Notes</Label>
                <Input
                    id="notes"
                    {...register("notes")}
                    type="text"
                    placeholder="Optional notes"
                />
                {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes.message}</p>}
            </div>
        </>
    );
};

export default OrderForm;
