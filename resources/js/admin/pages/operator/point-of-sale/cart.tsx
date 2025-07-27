import { useState, useEffect, useRef } from 'react';
import type { Meal } from '@/admin/types';
import { ShoppingCart } from 'lucide-react';
import { CartItemRow } from './cart-item';
import { DiscountSelector } from './discount-selector';
import { PaymentMethodSelector } from './payment-method';
import { CartSummary } from './cart-summary';
import { Label } from '@/admin/components/ui/label';


type CartItem = Meal & { quantity: number };

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

type DiscountType = 'none' | 'senior' | 'pwd' | 'student' | 'custom';

export default function Cart({ cartItems, onUpdateQuantity, onRemove }: CartProps) {
  const [orderType, setOrderType] = useState<'checkin' | 'checkout'>('checkin');
  const [orderNotes, setOrderNotes] = useState('');
  const [discountType, setDiscountType] = useState<DiscountType>('none');
  const [customDiscount, setCustomDiscount] = useState<number>(0);
  const [idNumber, setIdNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'ewallet'>('cash');
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [cartItems.length]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const VAT_RATE = 0.12;
  const totalTax = cartItems.reduce((sum, item) => {
    const itemTax = (item.price - item.price / (1 + VAT_RATE)) * item.quantity;
    return sum + itemTax;
  }, 0);

  let discount = 0;
  switch (discountType) {
    case 'senior':
    case 'pwd':
      discount = subtotal * 0.2;
      break;
    case 'student':
      discount = subtotal * 0.1;
      break;
    case 'custom':
      discount = customDiscount;
      break;
  }

  const total = Math.max(subtotal - discount, 0);

  return (
    <div className="w-1/6 p-4 border flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart />
          <h2 className="font-bold text-lg">Cart</h2>
        </div>

        <div className="mb-4 flex gap-4 text-sm">
          <Label className="flex items-center gap-1">
            <input
              type="radio"
              value="checkin"
              checked={orderType === 'checkin'}
              onChange={() => setOrderType('checkin')}
            />
            Check-in
          </Label>
          <Label className="flex items-center gap-1">
            <input
              type="radio"
              value="checkout"
              checked={orderType === 'checkout'}
              onChange={() => setOrderType('checkout')}
            />
            Check-out
          </Label>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500">Cart is empty.</p>
        ) : (
          <ul ref={listRef} className="space-y-3 border p-2 flex-grow overflow-y-auto max-h-46">
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

        <div className="mt-3">
          <Label className="text-xs">Order Notes:</Label>
          <textarea
            className="w-full border rounded p-1 text-sm"
            rows={2}
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Special instructions..."
          />
        </div>

        <DiscountSelector
          discountType={discountType}
          setDiscountType={setDiscountType}
          customDiscount={customDiscount}
          setCustomDiscount={setCustomDiscount}
          idNumber={idNumber}
          setIdNumber={setIdNumber}
        />

        <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>

      {cartItems.length > 0 && (
        <CartSummary subtotal={subtotal} totalTax={totalTax} discount={discount} total={total} />
      )}

      <div>
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded p-2 "
          onClick={() => {
            console.log('Order confirmed, proceed to payment');
          }}
        >
          Confirm Order
        </button>
      </div>

    </div>
  );
}
