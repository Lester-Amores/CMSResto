import AppLayout from '@/admin/layouts/operator-app-layout';
import { type BreadcrumbItem } from '@/admin/types';
import { Head } from '@inertiajs/react';
import { TrendingUp, ShoppingCart, CalendarDays, ClipboardList, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LineChart, Line } from 'recharts';
import { StatBlock } from './stat-block';
import { fetchOperatorSalesData } from '@/admin/services/services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/operator/dashboard' },
];

interface TopMeal {
    name: string;
    total_orders: number;
}

interface OrderTypeStat {
    type: string;
    total: number;
}

interface DashboardProps {
    todaySales: number;
    todayCompletedOrders: number;
    monthlySales: number;
    totalRevenue: number;
    totalOrders: number;
    topMeals: TopMeal[];
    orderTypes: OrderTypeStat[];
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
                        icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                        label="Total Revenue"
                        value={`₱${data?.totalRevenue.toLocaleString()}`}
                        bg="bg-green-50"
                    />
                    <StatBlock
                        icon={<ShoppingCart className="w-6 h-6 text-purple-600" />}
                        label="Total Orders"
                        value={data?.totalOrders.toString()}
                        bg="bg-purple-50"
                    />
                    <StatBlock
                        icon={<CalendarDays className="w-6 h-6 text-blue-600" />}
                        label="Today's Revenue"
                        value={`₱${data?.todaySales.toLocaleString()}`}
                        bg="bg-blue-50"
                    />
                    <StatBlock
                        icon={<ClipboardList className="w-6 h-6 text-orange-600" />}
                        label="Today's Orders"
                        value={data?.todayCompletedOrders.toString()}
                        bg="bg-orange-50"
                    />
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    <div className="md:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
                        <h2 className="text-sm font-semibold mb-4">📦 Orders Categories</h2>
                        {data?.orderTypes.length > 0 ? (
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data?.orderTypes} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="type" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip contentStyle={{ fontSize: '14px', borderRadius: '8px' }} />
                                        <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={35}>
                                            {data?.orderTypes.map((_, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        index === 0 ? "#10B981" :
                                                            index === 1 ? "#3B82F6" :
                                                                index === 2 ? "#F59E0B" :
                                                                    index === 3 ? "#8B5CF6" :
                                                                        "#EF4444"
                                                    }
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm">No order data available.</div>
                        )}
                    </div>

                    <div className="md:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm p-4">
                        <h2 className="text-sm font-semibold mb-4">🏆 Top 5 Meals</h2>
                        {data?.topMeals.length > 0 ? (
                            <div className="space-y-3">
                                {data?.topMeals.map((meal, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Award className={`w-5 h-5 text-yellow-500`} />
                                            <span className="font-medium text-gray-800">{index + 1}. {meal.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-gray-700">{meal.total_orders} orders</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-sm">No top meals data available.</div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white shadow-sm p-6 min-h-[300px]">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">📈 Sales Overview</h2>
                        <div className="flex gap-3">
                            <select
                                value={range}
                                onChange={(e) => setRange(e.target.value as any)}
                                className="border rounded p-2 text-sm"
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
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-gray-500">No sales data available.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
