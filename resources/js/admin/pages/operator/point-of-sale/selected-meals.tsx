import { Button } from '@/admin/components/ui/button';
import { getFullImageUrl } from '@/admin/lib/helpers';
import type { Meal, Menu } from '@/admin/types';

interface SelectedMealsProps {
    selectedMenu: Menu | null;
    menus: Menu[];
    onAddToCart: (meal: Meal) => void;
}

export default function SelectedMeals({
    selectedMenu,
    menus,
    onAddToCart,
}: SelectedMealsProps) {
    const menusToRender = selectedMenu ? [selectedMenu] : menus;

    return (
        <>
            <h2 className="font-bold text-lg mb-4 ml-4 uppercase">
                {selectedMenu ? `${selectedMenu.name} Menu` : 'All Menus'}
            </h2>
            <div className="overflow-y-auto no-scrollbar h-[calc(100vh-4rem)] p-4 bg-white dark:bg-black">
                {menusToRender.map((menu) => (
                    <div key={menu.id} className="mb-8">
                        {!selectedMenu && (
                            <h3 className=" text-md mb-2 text-gray-500 dark:text-white">{menu.name} Menu</h3>
                        )}

                        {menu.meals.length === 0 ? (
                            <p className="text-sm text-gray-500">No meals to display.</p>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {menu.meals.map((meal) => (
                                    <div
                                        key={meal.id}
                                        className="bg-white dark:bg-black rounded shadow hover:shadow-md transition p-2 flex flex-col"
                                    >
                                        <div
                                            className="h-28 bg-cover bg-center rounded mb-2"
                                            style={{ backgroundImage: `url(${getFullImageUrl(meal.img_src)})` }}
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm truncate">{meal.name}</h3>
                                            <p className="text-xs text-gray-600 dark:text-white mb-2">₱{meal.price.toFixed(2)}</p>
                                        </div>
                                        <Button
                                            onClick={() => onAddToCart(meal)}
                                            className="bg-green-500 hover:bg-green-600 text-white text-xs rounded cursor-pointer h-6"
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>

    );
}
