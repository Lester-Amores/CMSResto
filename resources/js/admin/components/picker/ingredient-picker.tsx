import { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/admin/components/ui/input';
import { Button } from '@/admin/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Ingredient, Meal } from '@/admin/types';
import { fetchIngredients } from '@/admin/services/services';
import { useEffect, useRef } from 'react';

type Props = {
    selectedIngredients: Ingredient[];
    onIngredientsChange: (newIngredients: Ingredient[]) => void;
    errors: FieldErrors<Meal>;
};

export default function IngredientsPicker({
    selectedIngredients,
    onIngredientsChange,
    errors,
}: Props) {
    const [selectedIngredientId, setSelectedIngredientId] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const { data } = useQuery({
        queryKey: ['fetchIngredients', searchInput],
        queryFn: () => fetchIngredients({ page: 1, per_page: 100, withDeleted: false, search: searchInput }),
    });

    const ingredients = data?.ingredients;

    const filteredIngredients = ingredients?.filter((mat: Ingredient) =>
        mat.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAdd = () => {
        if (!selectedIngredientId || quantity < 1) return;

        const selectedIngredient = ingredients?.find((mat) => mat.id === selectedIngredientId);
        if (!selectedIngredient) return;

        const alreadyAdded = selectedIngredients.some(
            (item) => item.id === selectedIngredientId
        );
        if (alreadyAdded) return;

        const newEntry = {
            ...selectedIngredient,
            quantity,
        };

        const updated = [...selectedIngredients, newEntry];
        onIngredientsChange(updated);

        setQuantity(1);
        setSearchInput('');
        setSelectedIngredientId(0);
    };

    const handleRemove = (index: number) => {
        const updated = selectedIngredients.filter((_, i) => i !== index);
        onIngredientsChange(updated);
    };

    return (
        <div className="mb-6">
            <div className="flex gap-2 mb-4">
                <div className="relative w-full" ref={dropdownRef}>
                    <label className="block font-medium mb-2">Ingredients</label>
                    <Input
                        type="text"
                        placeholder="Search ingredient"
                        className="w-full"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={() => setDropdownOpen(true)}
                    />
                    {dropdownOpen && filteredIngredients?.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-48 overflow-y-auto">
                            {filteredIngredients.map((mat) => (
                                <li
                                    key={mat.id}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedIngredientId(mat.id);
                                        setSearchInput(mat.name);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {mat.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='flex flex-col w-1/4'>
                    <label className="block font-medium mb-2">Quantity</label>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        disabled={!selectedIngredientId}
                        placeholder="Qty"
                    />
                </div>
                <div className='flex items-end'>
                    <Button type="button" onClick={handleAdd} disabled={!selectedIngredientId || quantity < 1}
                    >
                        Add
                    </Button>
                </div>
            </div>

            {errors.ingredients && (
                <p className="text-sm text-red-500 mb-2">
                    {(errors.ingredients as any)?.message || 'Please select ingredients correctly.'}
                </p>
            )}

            {selectedIngredients?.length > 0 && (
                <ul className="space-y-2 border rounded p-2">
                    {selectedIngredients?.map((mat, index) => (
                        <li key={mat.id} className="flex items-center justify-between">
                            <span>
                                {index + 1}.  {(mat.name)} — Qty: {mat.quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                <Trash2 size={16} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}
