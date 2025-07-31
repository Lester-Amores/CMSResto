import { useEffect, useRef } from 'react';
import type { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import type { Meal, Order } from '@/admin/types';
import { ShoppingCart } from 'lucide-react';
import { CartItemRow } from './cart-item';
import { Label } from '@/admin/components/ui/label';
import { Input } from '@/admin/components/ui/input';
import { CartSummary } from './cart-summary';

type CartItem = Meal & { quantity: number };

interface CartFormProps {
  cartItems: CartItem[];
  register: UseFormRegister<Order>;
  watch: UseFormWatch<Order>;
  setValue: UseFormSetValue<Order>;
  errors: FieldErrors<Order>;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

export default function CartForm({
  cartItems,
  register,
  watch,
  setValue,
  errors,
  onUpdateQuantity,
  onRemove
}: CartFormProps) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [cartItems.length]);

  const discountType = watch("discount_type");
  const customDiscount = watch("discount_amount") || 0;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const VAT_RATE = 0.12;
  const totalTax = cartItems.reduce((sum, item) => {
    const itemTax = (item.price - item.price / (1 + VAT_RATE)) * item.quantity;
    return sum + itemTax;
  }, 0);

  let discount = 0;
  switch (discountType) {
    case 1:
    case 2:
      discount = subtotal * 0.2;
      break;
    case 3:
    default:
      discount = customDiscount;
  }

  useEffect(() => {
    if (discountType === 0 || discountType === 3) {
      setValue("discount_amount", 0);
    }
  }, [discountType, setValue]);

  const total = Math.max(subtotal - discount, 0);

  useEffect(() => {
    setValue("subtotal", subtotal);
    setValue("discount_amount", discount);
    setValue("tax_amount", totalTax);
    setValue("total", total);
  }, [subtotal, discount, totalTax, total, setValue]);

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <ShoppingCart className="w-5 h-5" />
        <h2 className="font-bold text-base">Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-xs text-gray-500 flex-1 border p-2 rounded">Cart is empty.</p>
      ) : (
        <ul
          ref={listRef}
          className="space-y-2 border p-2 rounded flex-1 overflow-y-auto"
        >
          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}

      <div className="mb-4 mt-2">
        <Label htmlFor="notes">Order Notes:</Label>
        <Input
          id="notes"
          {...register("notes")}
          type="text"
          placeholder="Special instructions..."
        />
        {errors.notes && <p className="text-red-600 text-sm mt-1">{errors.notes.message}</p>}
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

      {(discountType === 3) && (
        <div className="mb-4">
          <Label htmlFor="discount_amount">Discount Amount</Label>
          <Input
            id="discount_amount"
            {...register("discount_amount", { valueAsNumber: true })}
            type="number"
            step="0.01"
            placeholder="0.00"
          />
          {errors.discount_amount && <p className="text-red-600 text-sm mt-1">{errors.discount_amount.message}</p>}
        </div>
      )}

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

      {cartItems.length > 0 && (
        <CartSummary subtotal={subtotal} totalTax={totalTax} discount={discount} total={total} />
      )}
    </>
  );
}
