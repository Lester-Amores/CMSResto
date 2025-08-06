import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/admin/components/ui/card';
import { Avatar, AvatarImage } from '@/admin/components/ui/avatar';
import { getOrder } from '@/admin/services/services';
import { getFullImageUrl } from '@/admin/lib/helpers';

interface ViewOrderProps {
    orderId: number;
}

const orderTypeMap = ['Dine-In', 'Takeout', 'Delivery'];
const paymentMethodMap = ['Cash', 'Card', 'GCash', 'Other'];
const statusMap = ['Pending', 'Completed', 'Cancelled'];

export default function ViewOrder({ orderId }: ViewOrderProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrder(orderId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">Order #{data.order_number}</CardTitle>
                        <CardDescription className="text-black dark:text-white text-xl">
                            {orderTypeMap[data.order_type]} - {paymentMethodMap[data.payment_method]} - {statusMap[data.status]}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-semibold">Subtotal</h4>
                                <p>₱{data.subtotal}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Discount</h4>
                                <p>₱{data.discount_amount}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Tax</h4>
                                <p>₱{data.tax_amount}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Total</h4>
                                <p className="text-lg font-bold text-green-600">₱{data.total}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Notes</h4>
                                <p>{data.notes || 'N/A'}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Branch</h4>
                                <p>{data.branch?.name}</p>
                                <p className="text-sm text-muted-foreground">{data.branch?.address}</p>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-2">Ordered Meals</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.meals.map((meal: any) => (
                                <Card key={meal.id}>
                                    <CardHeader className="flex items-center gap-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage
                                                src={meal && getFullImageUrl(meal.img_src)}
                                                alt={meal.name}
                                            />
                                        </Avatar>
                                        <div>
                                            <CardTitle className="text-lg">{meal.name}</CardTitle>
                                            <CardDescription>{meal.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p>
                                            <strong>Quantity:</strong> {meal.pivot.quantity}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> ₱{meal.pivot.price}
                                        </p>
                                        <p>
                                            <strong>Total:</strong> ₱{meal.pivot.total}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
