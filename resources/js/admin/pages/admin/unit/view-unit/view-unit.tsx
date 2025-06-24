import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/admin/components/ui/card';
import { getUnit } from '@/admin/services/services';

interface ViewUnitProps {
    unitId: number;
}

export default function ViewUnit({ unitId }: ViewUnitProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['unit', unitId],
        queryFn: () => getUnit(unitId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">Unit Details</CardTitle>
                        <CardDescription className="text-black dark:text-white text-xl font-semibold">{data.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
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
