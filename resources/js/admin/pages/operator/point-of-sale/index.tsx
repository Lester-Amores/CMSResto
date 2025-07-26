import { Head } from '@inertiajs/react';
import AppLayout from '@/admin/layouts/operator-app-layout';
import type { BreadcrumbItem, Meal, Menu } from '@/admin/types';
import { useState } from 'react';
import MenuList from './menu-list';
import SelectedMeals from './selected-meals';
import Cart from './cart';

interface POSProps {
    menus: Menu[];
}

type CartItem = Meal & { quantity: number };


export default function OperatorPointOfSalePage({ menus }: POSProps) {
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Point of Sale', href: '/operator/pos' },
    ];

    const handleSelectMenu = (menu: Menu | null) => {
        if (menu) {
            setSelectedMenu(menu);
        } else {
            setSelectedMenu(null);
        }
    };

    const handleUpdateQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + delta } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const handleRemoveFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };


    const handleAddToCart = (meal: Meal) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === meal.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...meal, quantity: 1 }];
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point of Sale" />
            <div className="flex h-[calc(100vh-4rem)]">
                <MenuList menus={menus} onSelect={handleSelectMenu} selectedMenuId={selectedMenu?.id} />
                    <SelectedMeals
                        selectedMenu={selectedMenu}
                        menus={menus}
                        onAddToCart={handleAddToCart}
                    />
                <Cart
                    cartItems={cart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveFromCart}
                />
            </div>
        </AppLayout>
    );
}
