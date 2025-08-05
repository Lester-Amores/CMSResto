import AppLayout from '@/admin/layouts/operator-app-layout';
import { type BreadcrumbItem } from '@/admin/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, ShoppingCart, CalendarDays, ClipboardList } from 'lucide-react';
import { StatBlock } from './stat-block';
import { fetchOperatorSalesData } from '@/admin/services/services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { OrderCategoryChart } from '@/admin/components/order-category-chart';
import { TopMealsList } from '@/admin/components/top-meal-list';
import { SalesChart } from '@/admin/components/sales-chart';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/operator/dashboard' }];

interface DashboardProps {
    todaySales: number;
    todayCompletedOrders: number;
    monthlySales: number;
    totalRevenue: number;
    totalOrders: number;
    topMeals: any[];
    orderTypes: any[];
}

interface Props {
    data: DashboardProps;
}

export default function Dashboard({ data }: Props) {
    const [range, setRange] = useState<'year' | 'month' | 'week' | 'day'>('month');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const { data: salesData } = useQuery({
        queryKey: ['fetchOperatorSalesData', range, date],
        queryFn: () => fetchOperatorSalesData({ range, date }),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatBlock
                        icon={<TrendingUp className="w-6 h-6 text-green-600 dark:text-green-200" />}
                        label="Total Revenue"
                        value={`₱${data.totalRevenue.toLocaleString()}`}
                        bg="bg-green-50 dark:bg-green-700"
                    />
                    <StatBlock
                        icon={<ShoppingCart className="w-6 h-6 text-purple-600 dark:text-purple-200" />}
                        label="Total Orders"
                        value={data.totalOrders.toString()}
                        bg="bg-purple-50 dark:bg-purple-700"
                    />
                    <StatBlock
                        icon={<CalendarDays className="w-6 h-6 text-blue-600 dark:text-blue-200" />}
                        label="Today's Revenue"
                        value={`₱${data.todaySales.toLocaleString()}`}
                        bg="bg-blue-50 dark:bg-blue-700"
                    />
                    <StatBlock
                        icon={<ClipboardList className="w-6 h-6 text-orange-600 dark:text-orange-200" />}
                        label="Today's Orders"
                        value={data.todayCompletedOrders.toString()}
                        bg="bg-orange-50 dark:bg-orange-700"
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    <div className="md:col-span-2 rounded-xl border shadow-sm p-4">
                        <h2 className="text-sm font-semibold mb-4">📦 Orders Categories</h2>
                        <OrderCategoryChart orderTypes={data.orderTypes} />
                    </div>

                    <div className="md:col-span-2 rounded-xl border shadow-sm p-4">
                        <h2 className="text-sm font-semibold mb-4">🏆 Top 5 Meals</h2>
                        <TopMealsList meals={data.topMeals} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-xl border shadow-sm p-6 min-h-[300px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">📈 Sales Overview</h2>
                        <div className="flex gap-3">
                            <select
                                value={range}
                                onChange={(e) => setRange(e.target.value as any)}
                                className="border rounded p-2 text-sm bg-white dark:bg-black"
                            >
                                <option value="year">Year</option>
                                <option value="month">Month</option>
                                <option value="week">Week</option>
                                <option value="day">Day</option>
                            </select>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="border rounded p-2 text-sm"
                            />
                        </div>
                    </div>

                    {salesData && salesData.length > 0 ? (
                        <SalesChart data={salesData} />
                    ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">No sales data available.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
