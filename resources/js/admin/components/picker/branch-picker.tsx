import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBranches } from '@/admin/services/services';
import { Input } from '@/admin/components/ui/input';
import { Branch } from '@/admin/types';
import { UseFormSetValue, UseFormClearErrors } from 'react-hook-form';
import { Label } from '@/admin/components/ui/label';
import SmallSlidingModal from '../small-sliding-modal';
import { AddBranchForm } from '../forms/add-branch-form';


interface BranchPickerProps {
    setValue: UseFormSetValue<any>;
    errors: Record<string, any>;
    clearErrors: UseFormClearErrors<any>;
    initialBranch?: Branch | null;
    required?: boolean;
}

const BranchPicker = ({ setValue, initialBranch = null, errors, clearErrors, required = false }: BranchPickerProps) => {
    const [selectedBranch, setSelectedBranch] = useState(initialBranch || null);
    const [searchInput, setSearchInput] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSmallModalOpen, setSmallModalOpen] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['fetchBranches', searchInput],
        queryFn: () => fetchBranches({ page: 1, per_page: 10, withDeleted: false, search: searchInput }),
    });

    const branches = data?.branches;
    useEffect(() => {
        setSelectedBranch(initialBranch);
    }, [initialBranch]);

    const filteredBranches = branches?.filter((branch: Branch) =>
        branch.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleBranchSelect = (branch: Branch) => {
        setSelectedBranch(branch);
        setValue('branch_id', branch.id);
        setSearchInput('');
        setDropdownOpen(false);
        clearErrors("branch_id");
    };

    const handleAddBranchSuccess = (newBranch: Branch) => {
        setSelectedBranch(newBranch);
        setValue('branch_id', newBranch.id);
        setSmallModalOpen(false);
        setDropdownOpen(false);
        clearErrors("branch_id");
    };

    const handleRemoveBranch = () => {
        setSelectedBranch(null);
        setValue('branch_id', null);
    };

    return (
        <>

            <div className="relative w-full mb-5 text-black dark:text-white">
                <Label htmlFor="language" required={required}>
                    Branch
                </Label>

                <div className="relative flex items-center">
                    {selectedBranch ? (
                        <div className="flex items-center justify-between  border rounded p-2 dark:bg-gray-800 shadow w-full">
                            <span>{selectedBranch?.name}</span>
                            <button
                                type="button"
                                className="ml-2  hover:text-gray-700 focus:outbranch-none"
                                onClick={handleRemoveBranch}
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <>
                            <Input
                                type="text"
                                id="branch"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hide-stepper"
                                placeholder="Branch"
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
                    {dropdownOpen && !selectedBranch && (
                        <ul className="absolute z-50 bg-gray-500 border border-gray-300 rounded w-full max-h-40 overflow-y-auto top-12 shadow-lg">
                            {isLoading ? (
                                <li className="px-4 py-2">Loading</li>
                            ) : filteredBranches?.length > 0 ? (
                                filteredBranches.map((branch: Branch) => (
                                    <li
                                        key={branch.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 bg-white dark:bg-black dark:hover:bg-gray-300 dark:hover:text-black"
                                        onMouseDown={() => handleBranchSelect(branch)}
                                    >
                                        {branch.name}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2">No result</li>
                            )}
                        </ul>
                    )}
                </div>
                {errors?.branch_id && <p className="text-red-600">{errors?.branch_id.message}</p>}
            </div>
            <SmallSlidingModal isOpen={isSmallModalOpen} onClose={() => setSmallModalOpen(false)}>
                <AddBranchForm onSuccess={handleAddBranchSuccess} />
            </SmallSlidingModal>
        </>
    );
}

export default BranchPicker;
