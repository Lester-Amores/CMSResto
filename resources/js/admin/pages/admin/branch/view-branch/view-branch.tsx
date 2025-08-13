import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/admin/components/ui/card';
import { Avatar, AvatarImage } from '@/admin/components/ui/avatar';
import { getBranch } from '@/admin/services/services';
import { getFullImageUrl } from '@/admin/lib/helpers';

interface ViewBranchProps {
    branchId: number;
}

export default function ViewBranch({ branchId }: ViewBranchProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['branch', branchId],
        queryFn: () => getBranch(branchId),
    });

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <p>Loading...</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="container mx-auto py-10">
                <p>No branch details found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader className="flex flex-col">
                    <CardTitle className="text-2xl font-semibold mb-4">Branch Details</CardTitle>
                    <Avatar className="h-32 w-32 overflow-hidden object-cover align-text">
                        <AvatarImage
                            src={getFullImageUrl(data.img_src) ?? undefined}
                            alt={data.name}
                        />
                    </Avatar>
                    <CardDescription className="text-black dark:text-white text-xl font-semibold mt-2">
                        {data.name}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p>{data.address}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">City</h3>
                            <p>{data.city}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Province</h3>
                            <p>{data.province}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Postal Code</h3>
                            <p>{data.postal_code}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p>{data.phone}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <p>{data.email}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Latitude</h3>
                            <p>{data.latitude}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Longitude</h3>
                            <p>{data.longitude}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Manager Name</h3>
                            <p>{data.manager_name}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Opening Time</h3>
                            <p>{data.opening_time}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Closing Time</h3>
                            <p>{data.closing_time}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Notes</h3>
                            <p>{data.notes ?? 'No notes available'}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
