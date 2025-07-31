import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/admin/layouts/operator-app-layout';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import type { BreadcrumbItem, FlashMessages, Meal, Menu, Order, SharedData } from '@/admin/types';
import { useEffect, useState } from 'react';
import MenuList from './menu-list';
import SelectedMeals from './selected-meals';
import Cart from './cart';
import CenterModal from '@/admin/components/center-modal';
import { Button } from '@/admin/components/ui/button';
import { ReceiptCard } from './receipt-card';

interface POSProps {
    menus: Menu[];
}

type CartItem = Meal & { quantity: number };


export default function OperatorPointOfSalePage({ menus }: POSProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState<Order | null>(null);

    const { register, handleSubmit, formState: { errors }, setValue, setError, watch, reset } = useForm<Order>({
        defaultValues: {
            branch_id: auth.user.operator.branch_id || 0,
            status: 0,
        },
    });

    useEffect(() => {
        const formattedMeals = cart.map((m) => ({
            meal_id: m.id,
            quantity: m.quantity,
        }));
        setValue('meals', formattedMeals as unknown as Order['meals']);
    }, [cart, setValue]);

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

    const onSubmit: SubmitHandler<Order> = (data) => {
        if (!data.branch_id) {
            setError("branch_id", { message: "This field is required." });
            return;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'meals' && value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });


        if (cart.length > 0) {
            const formattedMeals = cart.map((m) => ({
                meal_id: m.id,
                quantity: m.quantity,
            }));
            formData.append('meals', JSON.stringify(formattedMeals));
        }

        router.post(route('orders.store'), formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page.props.flash as FlashMessages;
                if (handleFlashMessages(flash)) {
                    reset({
                        branch_id: auth.user.operator.branch_id || 0,
                        status: 0,
                    });
                    setCart([]);
                    setSelectedMenu(null);
                }
                if (flash.data) {
                    setReceiptData(flash.data as Order);
                    setShowReceipt(true);
                }
            },

            onError: (errors) => {
                showErrors(errors);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Point of Sale',
            href: '/operator/pos'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point of Sale" />
            <div className="flex h-[calc(100vh-4rem)]">
                <div className="w-3/5 flex flex-col">
                    <div className="w-full">
                        <MenuList
                            menus={menus}
                            onSelect={handleSelectMenu}
                            selectedMenuId={selectedMenu?.id}
                        />
                    </div>
                    <SelectedMeals
                        selectedMenu={selectedMenu}
                        menus={menus}
                        onAddToCart={handleAddToCart}
                    />
                </div>

                <div className="w-2/5 ml-4 border-l">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full p-4">
                        <Cart
                            cartItems={cart}
                            register={register}
                            watch={watch}
                            errors={errors}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveFromCart}
                            setValue={setValue}
                        />
                        <div className="mt-2 flex justify-end">
                            <Button type="submit">
                                Confirm Order
                            </Button>
                        </div>
                    </form>

                </div>
            </div>
            <CenterModal isOpen={showReceipt} onClose={() => setShowReceipt(false)}>
                {receiptData && auth?.user && (
                    <ReceiptCard receiptData={receiptData} setShowReceipt={setShowReceipt} />
                )}
            </CenterModal>

        </AppLayout>
    );

}
