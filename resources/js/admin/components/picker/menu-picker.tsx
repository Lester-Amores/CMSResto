import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMenus } from '@/admin/services/services';
import { Input } from '@/admin/components/ui/input';
import { Menu } from '@/admin/types';
import { UseFormSetValue, UseFormClearErrors } from 'react-hook-form';
import { Label } from '@/admin/components/ui/label';
import SmallSlidingModal from '../small-sliding-modal';
import { AddMenuForm } from '../forms/add-menu-form';


interface MenuPickerProps {
    setValue: UseFormSetValue<any>;
    errors: Record<string, any>;
    clearErrors: UseFormClearErrors<any>;
    initialMenu?: Menu | null;
    required?: boolean;
}

const MenuPicker = ({ setValue, initialMenu = null, errors, clearErrors, required = false }: MenuPickerProps) => {
    const [selectedMenu, setSelectedMenu] = useState(initialMenu || null);
    const [searchInput, setSearchInput] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isSmallModalOpen, setSmallModalOpen] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['fetchMenus', searchInput],
        queryFn: () => fetchMenus({ page: 1, per_page: 10, withDeleted: false, search: searchInput }),
    });

    console.log(data);

    const menus = data?.menus;
    useEffect(() => {
        setSelectedMenu(initialMenu);
    }, [initialMenu]);

    const filteredMenus = menus?.filter((menu: Menu) =>
        menu.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    const handleMenuSelect = (menu: Menu) => {
        setSelectedMenu(menu);
        setValue('menu_id', menu.id);
        setSearchInput('');
        setDropdownOpen(false);
        clearErrors("menu_id");
    };

    const handleAddMenuSuccess = (newMenu: Menu) => {
        setSelectedMenu(newMenu);
        setValue('menu_id', newMenu.id);
        setSmallModalOpen(false);
        setDropdownOpen(false);
        clearErrors("menu_id");
    };

    const handleRemoveMenu = () => {
        setSelectedMenu(null);
        setValue('menu_id', null);
    };

    return (
        <>

            <div className="relative w-full mb-5 text-black dark:text-white">
                <Label htmlFor="language" required={required}>
                    Menu
                </Label>

                <div className="relative flex items-center">
                    {selectedMenu ? (
                        <div className="flex items-center justify-between  border rounded p-2 dark:bg-gray-800 shadow w-full">
                            <span>{selectedMenu?.name}</span>
                            <button
                                type="button"
                                className="ml-2  hover:text-gray-700 focus:outmenu-none"
                                onClick={handleRemoveMenu}
                            >
                                &times;
                            </button>
                        </div>
                    ) : (
                        <>
                            <Input
                                type="text"
                                id="menu"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hide-stepper"
                                placeholder="Menu"
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
                    {dropdownOpen && !selectedMenu && (
                        <ul className="absolute z-50 bg-gray-500 border border-gray-300 rounded w-full max-h-40 overflow-y-auto top-12 shadow-lg">
                            {isLoading ? (
                                <li className="px-4 py-2">Loading</li>
                            ) : filteredMenus?.length > 0 ? (
                                filteredMenus.map((menu: Menu) => (
                                    <li
                                        key={menu.id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 bg-white dark:bg-black dark:hover:bg-gray-300 dark:hover:text-black"
                                        onMouseDown={() => handleMenuSelect(menu)}
                                    >
                                        {menu.name}
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2">No result</li>
                            )}
                        </ul>
                    )}
                </div>
                {errors?.menu_id && <p className="text-red-600">{errors?.menu_id.message}</p>}
            </div>
            <SmallSlidingModal isOpen={isSmallModalOpen} onClose={() => setSmallModalOpen(false)}>
                <AddMenuForm onSuccess={handleAddMenuSuccess} />
            </SmallSlidingModal>
        </>
    );
}

export default MenuPicker;
