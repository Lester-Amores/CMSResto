import { useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';

interface UseFetchProps {
    page: number;
    rowsPerPage: number;
    searchParams: Record<string, unknown>;
    withDeleted: boolean;
}

export const useFetchData = ({ page, rowsPerPage, searchParams, withDeleted = false }: UseFetchProps) => {
    const hasMounted = useRef(false); 

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return; 
        }

        const query = {
            ...searchParams,
            page,
            rowsPerPage,
            withDeleted
        };

        router.get(route(route().current() as string), query, {
            replace: true,
            preserveState: true
        });
    }, [page, rowsPerPage, searchParams, withDeleted]);
};