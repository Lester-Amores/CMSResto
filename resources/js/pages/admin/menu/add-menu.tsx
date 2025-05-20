import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import MenuForm from './menu-form';
import { FlashMessages, Menu } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';


interface AddMenuProps {
    onSuccess: () => void;
}

export default function AddMenu({ onSuccess }: AddMenuProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Menu>();
    const onSubmit: SubmitHandler<Menu> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        router.post(route('menus.store'), formData, {
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


    return (
        <div className="px-8 py-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-10">Add Menu</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <MenuForm register={register} errors={errors} />
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
