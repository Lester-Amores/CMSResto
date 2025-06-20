import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/admin/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/admin/components/ui/avatar';
import { getAdmin } from '@/admin/services/services';
import { useInitials } from '@/admin/hooks/use-initials';
import { getFullImageUrl } from '@/admin/lib/helpers';

interface ViewAdminProps {
    adminId: number;
}

export default function ViewAdmin({ adminId }: ViewAdminProps) {
    const getInitials = useInitials();


    const { data, isLoading } = useQuery({
        queryKey: ['admin', adminId],
        queryFn: () => getAdmin(adminId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white text-xl font-semibold mb-4">Admin Details</CardTitle>
                            <Avatar className="h-32 w-32 overflow-hidden object-cover align-text">
                                <AvatarImage src={getFullImageUrl(data.img_src) ?? undefined} alt={data.user.name} />
                                <AvatarFallback className="rounded-full bg-neutral-200 text-black dark:bg-neutral-700 text-3xl dark:text-white">
                                    {getInitials(data.user.name)}
                                </AvatarFallback>
                            </Avatar>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <h3 className="font-semibold">Name</h3>
                                <p>{data.user.name || "Not Available"}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p>{data.user.email || "Not Available"}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            )
            }
        </div>
    );
}
