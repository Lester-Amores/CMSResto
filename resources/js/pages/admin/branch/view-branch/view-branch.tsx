import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { getBranch } from '@/services/services';

interface ViewBranchProps {
    branchId: number;
}

export default function ViewBranch({ branchId }: ViewBranchProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['branch', branchId],
        queryFn: () => getBranch(branchId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">Branch Details</CardTitle>
                        <CardDescription className="text-black dark:text-white text-xl font-semibold">{data.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <h3 className="font-semibold">Address</h3>
                                <p>{data ? data.address : `Not available`}</p>
                            </div>

                        </div>

                    </CardContent>
                </Card>
            )
            }
        </div>
    );
}
