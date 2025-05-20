import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import MenuForm from './menu-form';
import { FlashMessages, Menu } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getMenu } from '@/services/services';
import { FormDataConvertible } from '@inertiajs/core';

interface EditMenuProps {
    onSuccess: () => void;
    menuId: number;
}

export default function EditMenu({ onSuccess, menuId }: EditMenuProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Menu>();
    const { data, isLoading, error } = useQuery({
        queryKey: ['menu', menuId],
        queryFn: () => getMenu(menuId),
    });

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                email: data.user?.email || '',
            });
        }
    }, [data, reset]);


    const onSubmit: SubmitHandler<Menu> = (data) => {
        const payload = { ...data } as unknown as Record<string, FormDataConvertible>;
        router.post(route('menus.update', menuId), payload, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page.props.flash as FlashMessages;
                const isSuccess = handleFlashMessages(flash);
                if (isSuccess) onSuccess();
            },
            onError: (errors) => {
                showErrors(errors);
            },
        });
    };

    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        return <div>{errorMessage}</div>;
    }

    return (
        <div className="px-8 py-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-10">Edit Menu</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <MenuForm register={register} errors={errors} />
                    <div className="flex justify-end">
                        <Button type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
