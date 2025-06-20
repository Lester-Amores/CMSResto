import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './admin/hooks/use-appearance';
import { Toaster } from 'sonner';



const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const queryClient = new QueryClient();


createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./admin/pages/${name}.tsx`, import.meta.glob('./admin/pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <Toaster position="bottom-left" richColors />
                <App {...props} />
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
