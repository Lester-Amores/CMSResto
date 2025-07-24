import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/admin/components/ui/card';
import { getIngredient } from '@/admin/services/services';


interface ViewIngredientProps {
    ingredientId: number;
}

export default function ViewIngredient({ ingredientId }: ViewIngredientProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['ingredient', ingredientId],
        queryFn: () => getIngredient(ingredientId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">Ingredient Details</CardTitle>
                        <CardDescription className="text-black dark:text-white text-xl font-semibold">{data.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="font-semibold">Unit Type</h3>
                                <p>{data ? data.unit.name : `Not available`}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Quantity</h3>
                                <p>{data ? data.quantity : `Not available`}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Unit Cost</h3>
                                <p>{data ? data.unit_cost : `Not available`}</p>
                            </div>

                        </div>

                    </CardContent>
                </Card>
            )
            }
        </div>
    );
}
