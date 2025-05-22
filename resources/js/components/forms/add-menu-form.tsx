import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button'
import { FlashMessages, Menu } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddMenuProps {
    onSuccess: (newMenu: Menu) => void;
}

export function AddMenuForm({ onSuccess }: AddMenuProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Menu>();

    const onSubmit: SubmitHandler<Menu> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        router.post(route('menus.store'), formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page.props.flash as FlashMessages;
                const isSuccess = handleFlashMessages(flash);
                if (isSuccess) {
                    onSuccess(flash.data as Menu);
                }
            },
            onError: (errors) => {
                showErrors(errors);
            },
        });
    };

    return (
        <div className="px-8 py-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-10">Add Menu</h2>
            <form
                onSubmit={(e) => {
                    e.stopPropagation();
                    handleSubmit(onSubmit)(e);
                }}
                className="flex flex-col h-full">
                <>
                    <div className="mb-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register("name", { required: 'This filed is required' })}
                            type="text"
                            placeholder='name'
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="description">Address</Label>
                        <Input
                            id="description"
                            {...register("description", {
                                required: 'This field is requried'
                            })}
                            type="text"
                            placeholder='description'
                        />
                        {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                    </div>
                </>

                <div className="flex justify-end">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
