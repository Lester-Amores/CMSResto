import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/admin/components/ui/card';
import { getMenu } from '@/admin/services/services';
import { Avatar, AvatarImage } from '@/admin/components/ui/avatar';
import { getFullImageUrl } from '@/admin/lib/helpers';

interface ViewMenuProps {
    menuId: number;
}

export default function ViewMenu({ menuId }: ViewMenuProps) {

    const { data, isLoading } = useQuery({
        queryKey: ['menu', menuId],
        queryFn: () => getMenu(menuId),
    });

    return (
        <div className="container mx-auto py-10">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold mb-4">Menu Details</CardTitle>
                        <Avatar className="h-32 w-32 overflow-hidden object-cover align-text">
                            <AvatarImage src={getFullImageUrl(data.img_src) ?? undefined} alt={data.name} />
                        </Avatar>
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
