import { useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/admin/components/ui/input';
import { Button } from '@/admin/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Material, Meal } from '@/admin/types';
import { fetchMaterials } from '@/admin/services/services';
import { useEffect, useRef } from 'react';

type Props = {
    selectedMaterials: Material[];
    onMaterialsChange: (newMaterials: Material[]) => void;
    errors: FieldErrors<Meal>;
};

export default function MaterialsPicker({
    selectedMaterials,
    onMaterialsChange,
    errors,
}: Props) {
    const [selectedMaterialId, setSelectedMaterialId] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [searchInput, setSearchInput] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const { data } = useQuery({
        queryKey: ['fetchMaterials', searchInput],
        queryFn: () => fetchMaterials({ page: 1, per_page: 100, withDeleted: false, search: searchInput }),
    });

    const materials = data?.materials;

    const filteredMaterials = materials?.filter((mat: Material) =>
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
        if (!selectedMaterialId || quantity < 1) return;

        const selectedMaterial = materials?.find((mat) => mat.id === selectedMaterialId);
        if (!selectedMaterial) return;

        const alreadyAdded = selectedMaterials.some(
            (item) => item.id === selectedMaterialId
        );
        if (alreadyAdded) return;

        const newEntry = {
            ...selectedMaterial,
            quantity,
        };

        const updated = [...selectedMaterials, newEntry];
        onMaterialsChange(updated);

        setQuantity(1);
        setSearchInput('');
        setSelectedMaterialId(0);
    };

    const handleRemove = (index: number) => {
        const updated = selectedMaterials.filter((_, i) => i !== index);
        onMaterialsChange(updated);
    };

    return (
        <div className="mb-6">
            <div className="flex gap-2 mb-4">
                <div className="relative w-full" ref={dropdownRef}>
                    <label className="block font-medium mb-2">Materials</label>
                    <Input
                        type="text"
                        placeholder="Search material"
                        className="w-full"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={() => setDropdownOpen(true)}
                    />
                    {dropdownOpen && filteredMaterials?.length > 0 && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border rounded shadow max-h-48 overflow-y-auto">
                            {filteredMaterials.map((mat) => (
                                <li
                                    key={mat.id}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => {
                                        setSelectedMaterialId(mat.id);
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
                        disabled={!selectedMaterialId}
                        placeholder="Qty"
                    />
                </div>
                <div className='flex items-end'>
                    <Button type="button" onClick={handleAdd} disabled={!selectedMaterialId || quantity < 1}
                    >
                        Add
                    </Button>
                </div>
            </div>

            {errors.materials && (
                <p className="text-sm text-red-500 mb-2">
                    {(errors.materials as any)?.message || 'Please select materials correctly.'}
                </p>
            )}

            {selectedMaterials.length > 0 && (
                <ul className="space-y-2 border rounded p-2">
                    {selectedMaterials?.map((mat, index) => (
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
