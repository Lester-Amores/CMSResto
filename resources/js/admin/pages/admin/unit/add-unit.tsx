import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import UnitForm from './unit-form';
import { FlashMessages, Unit } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';

interface AddUnitProps {
    onSuccess: () => void;
}

export default function AddUnit({ onSuccess }: AddUnitProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Unit>();

    const onSubmit: SubmitHandler<Unit> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        router.post(route('units.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Unit</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <UnitForm register={register} errors={errors} />
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
