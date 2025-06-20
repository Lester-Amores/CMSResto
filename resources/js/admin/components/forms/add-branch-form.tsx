import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button'
import { FlashMessages, Branch } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';

interface AddBranchProps {
    onSuccess: (newBranch: Branch) => void;
}

export function AddBranchForm({ onSuccess }: AddBranchProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Branch>();

    const onSubmit: SubmitHandler<Branch> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        router.post(route('branchs.store'), formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = page.props.flash as FlashMessages;
                const isSuccess = handleFlashMessages(flash);
                if (isSuccess) {
                    onSuccess(flash.data as Branch);
                }
            },
            onError: (errors) => {
                showErrors(errors);
            },
        });
    };

    return (
        <div className="px-8 py-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-10">Add Branch</h2>
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
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            {...register("address", {
                                required: 'This field is requried'
                            })}
                            type="text"
                            placeholder='address'
                        />
                        {errors.address && <p className="text-red-600">{errors.address.message}</p>}
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
