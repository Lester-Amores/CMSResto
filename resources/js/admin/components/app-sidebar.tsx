import { NavMain } from '@/admin/components/nav-main';
import { NavUser } from '@/admin/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/admin/components/ui/sidebar';
import { type NavItem } from '@/admin/types';
import { Link } from '@inertiajs/react';
import { BoxIcon, Building2, LayoutGrid, Scale, SquareMenuIcon, User, Users, UtensilsCrossedIcon } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Admins',
        href: '/admin/admins',
        icon: User,
    },
    {
        title: 'Operators',
        href: '/admin/operators',
        icon: Users,
    },
    {
        title: 'Branches',
        href: '/admin/branches',
        icon: Building2,
    },
    {
        title: 'Menu',
        href: '/admin/menus',
        icon: SquareMenuIcon,
    },
    {
        title: 'Meal',
        href: '/admin/meals',
        icon: UtensilsCrossedIcon,
    },
    {
        title: 'Ingredient',
        href: '/admin/ingredients',
        icon: BoxIcon,
    },
    {
        title: 'Unit',
        href: '/admin/units',
        icon: Scale,
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
