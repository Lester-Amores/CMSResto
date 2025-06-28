import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUnits } from '@/admin/services/services';
import { Input } from '@/admin/components/ui/input';
import { Unit } from '@/admin/types';
import { UseFormSetValue, UseFormClearErrors } from 'react-hook-form';
import { Label } from '@/admin/components/ui/label';
import SmallSlidingModal from '../small-sliding-modal';
import { AddUnitForm } from '../forms/add-unit-form';


interface UnitPickerProps {
    setValue: UseFormSetValue<any>;
    errors: Record<string, any>;
    clearErrors: UseFormClearErrors<any>;
    initialUnit?: Unit | null;
    required?: boolean;
}

const UnitPicker = ({ setValue, initialUnit = null, errors, clearErrors, required = false }: UnitPickerProps) => {
    const [selectedUnit, setSelectedUnit] = useState(initialUnit || null);
    const [searchInput, setSearchInput] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSmallModalOpen, setSmallModalOpen] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['fetchUnits', searchInput],
        queryFn: () => fetchUnits({ page: 1, per_page: 10, withDeleted: false, search: searchInput }),
    });

    const units = data?.units;
    useEffect(() => {
        setSelectedUnit(initialUnit);
    }, [initialUnit]);

    const filteredUnits = units?.filter((unit: Unit) =>
        unit.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleUnitSelect = (unit: Unit) => {
        setSelectedUnit(unit);
        setValue('unit_id', unit.id);
        setSearchInput('');
        setDropdownOpen(false);
        clearErrors("unit_id");
    };

    const handleAddUnitSuccess = (newUnit: Unit) => {
        setSelectedUnit(newUnit);
        setValue('unit_id', newUnit.id);
        setSmallModalOpen(false);
        setDropdownOpen(false);
        clearErrors("unit_id");
    };

    const handleRemoveUnit = () => {
        setSelectedUnit(null);
        setValue('unit_id', null);
    };

    return (
        <>

            <div className="relative w-full mb-5 text-black dark:text-white">
                <Label htmlFor="language" required={required}>
                    Unit
                </Label>

                <div className="relative flex items-center">
                    {selectedUnit ? (
                        <div className="flex items-center justify-between  border rounded p-2 dark:bg-gray-800 shadow w-full">
                            <span>{selectedUnit?.name}</span>
                            <button
                                type="button"
                                className="ml-2  hover:text-gray-700 focus:outunit-none"
                                onClick={handleRemoveUnit}
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <>
                            <Input
                                type="text"
                                id="unit"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hide-stepper"
                                placeholder="Unit"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onFocus={() => setDropdownOpen(true)}
                                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                            />

                            <button
                                type="button"
                                className="mt-1 block  px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hide-stepper"
                                onClick={() => setSmallModalOpen(true)}
                            >
                                +
                            </button>

                        </>
                    )}
                    {dropdownOpen && !selectedUnit && (
                        <ul className="absolute z-50 bg-gray-500 border border-gray-300 rounded w-full max-h-40 overflow-y-auto top-12 shadow-lg">
                            {isLoading ? (
                                <li className="px-4 py-2">Loading</li>
                            ) : filteredUnits?.length > 0 ? (
                                filteredUnits.map((unit: Unit) => (
                                    <li
                                        key={unit.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 bg-white dark:bg-black dark:hover:bg-gray-300 dark:hover:text-black"
                                        onMouseDown={() => handleUnitSelect(unit)}
                                    >
                                        {unit.name}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2">No result</li>
                            )}
                        </ul>
                    )}
                </div>
                {errors?.unit_id && <p className="text-red-600">{errors?.unit_id.message}</p>}
            </div>
            <SmallSlidingModal isOpen={isSmallModalOpen} onClose={() => setSmallModalOpen(false)}>
                <AddUnitForm onSuccess={handleAddUnitSuccess} />
            </SmallSlidingModal>
        </>
    );
}

export default UnitPicker;
