import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/admin/components/appearance-tabs';
import HeadingSmall from '@/admin/components/heading-small';
import { type BreadcrumbItem } from '@/admin/types';

import AppLayout from '@/admin/layouts/operator-app-layout';
import SettingsLayout from '@/admin/layouts/settings/operator-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/operator-appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
