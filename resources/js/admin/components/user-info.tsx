import { Avatar, AvatarFallback, AvatarImage } from '@/admin/components/ui/avatar';
import { useInitials } from '@/admin/hooks/use-initials';
import { type User } from '@/admin/types';
import { getFullImageUrl } from '@/admin/lib/helpers';

export function UserInfo({ user, showEmail = false }: { user: User; showEmail?: boolean }) {
    const getInitials = useInitials();

    const imageSrc =
        user.admin?.img_src ??
        user.operator?.img_src ??
        '';

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={getFullImageUrl(imageSrc) || undefined} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                )}
            </div>
        </>
    );
}
