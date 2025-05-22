import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getMeal } from '@/services/services';

interface ViewMealProps {
    mealId: number;
}

export default function ViewMeal({ mealId }: ViewMealProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['meal', mealId],
        queryFn: () => getMeal(mealId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">Meal Details</CardTitle>
                        <CardDescription className="text-black dark:text-white text-xl font-semibold">{data.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <h3 className="font-semibold">Description</h3>
                                <p>{data ? data.description : `Not available`}</p>
                            </div>

                        </div>

                    </CardContent>
                </Card>
            )
            }
        </div>
    );
}
