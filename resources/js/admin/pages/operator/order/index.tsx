import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/admin/layouts/operator-app-layout';
import type { BreadcrumbItem, FlashMessages, Order } from '@/admin/types';
import { KitchenCard } from './kitchen-card';
import { OrderStatusCards } from './order-status-cards';
import { handleFlashMessages } from '@/admin/lib/utils';

interface ordersProps {
    preparing: Order[];
    ready: Order[];
    completed: Order[];
}

interface Props {
    orders: ordersProps;
}

export default function OrdersPage({ orders }: Props) {
    
    const [activeTab, setActiveTab] = useState<'pending' | 'ready' | 'completed'>('pending');

    const renderOrders = () => {
        switch (activeTab) {
            case 'pending':
                return orders.preparing;
            case 'ready':
                return orders.ready;
            case 'completed':
                return orders.completed;
            default:
                return [];
        }
    };

    const displayedOrders = renderOrders();

    const handleStatusChange = (orderId: number, newStatus: 1 | 2) => {
        router.post(route('operator.update-order-status', orderId), { status: newStatus }, {
            preserveScroll: true,
            onSuccess: (page) => {
                handleFlashMessages(page.props.flash as FlashMessages);
            },
            onError: (err) => {
                console.error('Failed to update order status', err);
            }
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Orders',
            href: '/operator/orders'
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="flex flex-col w-full h-[calc(100vh-4rem)] py-4">
                <h1 className="px-4 text-2xl font-semibold mb-4">Orders</h1>

                <OrderStatusCards
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    counts={{
                        pending: orders.preparing.length,
                        ready: orders.ready.length,
                        completed: orders.completed.length,
                    }}
                />

                <div className="flex h-3/4 p-4">
                    <div className="flex flex-1 flex-col p-4 shadow border rounded-xl overflow-x-auto">
                        {displayedOrders.length > 0 ? (
                            <div className="flex gap-4">
                                {displayedOrders.map((order) => (
                                    <KitchenCard
                                        key={order.id}
                                        order={order}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-1 items-center justify-center">
                                No {activeTab} orders.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
