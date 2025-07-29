import { useState, useEffect, useRef } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/admin/components/ui/input';
import { Button } from '@/admin/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Meal, OrderMeal } from '@/admin/types';
import { fetchMeals } from '@/admin/services/services';

export type ExtendedOrderMeal = OrderMeal & {
    name?: string;
    price?: number;
  };
type Props = {
    selectedMeals: ExtendedOrderMeal[];
    onMealsChange: (newMeals: ExtendedOrderMeal[]) => void;
    errors: FieldErrors<ExtendedOrderMeal>;
};

export default function MealsPicker({ selectedMeals, onMealsChange, errors }: Props) {
    const [selectedMealId, setSelectedMealId] = useState<number>(0);
    const [searchInput, setSearchInput] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const { data } = useQuery({
        queryKey: ['fetchMeals', searchInput],
        queryFn: () => fetchMeals({ page: 1, per_page: 100, withDeleted: false, search: searchInput }),
    });

    const meals: Meal[] = data?.meals || [];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAdd = () => {
        if (!selectedMealId) return;

        const existing = selectedMeals.find((m) => m.meal_id === selectedMealId);
        if (existing) {
            onMealsChange(
                selectedMeals.map((m) =>
                    m.meal_id === selectedMealId ? { ...m, quantity: m.quantity + 1 } : m
                )
            );
        } else {
            onMealsChange([...selectedMeals, { meal_id: selectedMealId, quantity: 1 }]);
        }

        setSelectedMealId(0);
        setSearchInput('');
    };

    const handleQuantityChange = (meal_id: number, qty: number) => {
        onMealsChange(
            selectedMeals.map((m) =>
                m.meal_id === meal_id ? { ...m, quantity: Math.max(1, qty) } : m
            )
        );
    };

    const handleRemove = (meal_id: number) => {
        onMealsChange(selectedMeals.filter((m) => m.meal_id !== meal_id));
    };


    const getMealInfo = (meal_id: number) => meals.find((m) => m.id === meal_id);

    const total = selectedMeals.reduce((sum, m) => {
        const meal = getMealInfo(m.meal_id);
        const price = (m.price !== undefined && !isNaN(Number(m.price)))
            ? Number(m.price)
            : (meal?.price ?? 0);

        return sum + price * m.quantity;
    }, 0);


    return (
        <div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Select Meal</label>
                <div className="relative" ref={dropdownRef}>
                    <Input
                        placeholder="Search meal"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={() => setDropdownOpen(true)}
                    />
                    {dropdownOpen && meals.length > 0 && (
                        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto">
                            {meals.map((m) => (
                                <li
                                    key={m.id}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedMealId(m.id);
                                        setSearchInput(m.name);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {m.name} – ₱{m.price}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-2 text-end">
                    <Button
                        type="button"
                        onClick={handleAdd}
                        disabled={!selectedMealId}
                    >
                        Add
                    </Button>
                </div>
            </div>

            {selectedMeals.length > 0 && (
                <ul className="space-y-2 border rounded p-2 mb-4">
                    {selectedMeals.map((m) => {
                        const mealInfo = getMealInfo(m.meal_id);
                        return (
                            <li key={m.meal_id} className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="p-1 border rounded hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(m.meal_id, m.quantity - 1)}
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="w-8 text-center">{m.quantity}</span>

                                <button
                                    type="button"
                                    className="p-1 border rounded hover:bg-gray-100"
                                    onClick={() => handleQuantityChange(m.meal_id, m.quantity + 1)}
                                >
                                    <Plus size={16} />
                                </button>

                                <span className="flex-1">
                                    {m.name || mealInfo?.name || `Meal #${m.meal_id}`}
                                </span>
                                <span>
                                    ₱{((m.price !== undefined ? Number(m.price) : mealInfo?.price ?? 0) * m.quantity).toFixed(2)}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleRemove(m.meal_id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </li>
                        );
                    })}
                    {selectedMeals.length > 0 && (
                        <div className="mt-3 font-semibold text-end border-t">
                            Total: ₱{total.toFixed(2)}
                        </div>
                    )}
                </ul>
            )}

            {errors.meals && (
                <p className="text-sm text-red-500 mt-2">
                    {(errors.meals as any)?.message || 'Please select meals correctly.'}
                </p>
            )}
        </div>
    );
}
