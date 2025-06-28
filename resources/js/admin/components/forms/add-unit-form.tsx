import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button'
import { FlashMessages, Unit } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';

interface AddUnitProps {
    onSuccess: (newUnit: Unit) => void;
}

export function AddUnitForm({ onSuccess }: AddUnitProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Unit>();

    const onSubmit: SubmitHandler<Unit> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        router.post(route('units.store'), formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page.props.flash as FlashMessages;
                const isSuccess = handleFlashMessages(flash);
                if (isSuccess) {
                    onSuccess(flash.data as Unit);
                }
            },
            onError: (errors) => {
                showErrors(errors);
            },
        });
    };

    return (
        <div className="px-8 py-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-10">Add Unit</h2>
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
