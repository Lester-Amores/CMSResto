import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getOperator } from '@/services/services';

interface ViewOperatorProps {
    operatorId: number;
}

export default function ViewOperator({ operatorId }: ViewOperatorProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['operator', operatorId],
        queryFn: () => getOperator(operatorId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Operator Details</CardTitle>
                        <CardDescription className="text-black dark:text-white text-xl font-semibold">{data.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <h3 className="font-semibold">{t.field.website}</h3>
                                <p>{data.website ? <a href={data.website} target="_blank" className="text-blue-600 underline">{data?.website}</a> : t.info.notAvailable}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">{t.field.address}</h3>
                                <p>{data.address || t.info.notAvailable}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">{t.field.phone}</h3>
                                <p>{data.phone || t.info.notAvailable}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">{t.field.email}</h3>
                                <p>{data.email || t.info.notAvailable}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">{t.field.type}</h3>
                                <p>{data.type_name || t.info.notAvailable}</p>
                            </div>

                        </div>
                        <div className="pt-4">
                            <h3 className="font-semibold">{t.field.notes}</h3>
                            <p>{data.notes || t.info.notAvailable}</p>
                        </div> */}
                    </CardContent>
                </Card>
            )
            }
        </div>
    );
}
