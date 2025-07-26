import { Plus, Minus, X } from 'lucide-react';


interface CartItemRowProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    onUpdateQuantity: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

export function CartItemRow({ id, name, price, quantity, onUpdateQuantity, onRemove }: CartItemRowProps) {
    return (
        <li className="my-2">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{name}</span>
                <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-red-500">
                    <X size={16} />
                </button>
            </div>
            <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
                <span>₱{price}</span>
                <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQuantity(id, -1)} className="bg-gray-200 px-2 rounded hover:bg-gray-300">
                        <Minus size={10} />
                    </button>
                    <span className="w-4 text-center">{quantity}</span>
                    <button onClick={() => onUpdateQuantity(id, 1)} className="bg-gray-200 px-2 rounded hover:bg-gray-300">
                        <Plus size={10} />
                    </button>
                </div>
            </div>
        </li>
    );
}
