import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import MaterialForm from './material-form';
import { FlashMessages, Material } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import MaterialPicker from '@/admin/components/picker/unit-picker';

interface AddMaterialProps {
    onSuccess: () => void;
}

export default function AddMaterial({ onSuccess }: AddMaterialProps) {
    const { register, handleSubmit, formState: { errors }, setError, setValue, clearErrors } = useForm<Material>();

    const onSubmit: SubmitHandler<Material> = (data) => {

        if (!data.unit_id) {
            setError("unit_id", { message: "This field is required" });
            return;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        router.post(route('materials.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Material</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <MaterialForm register={register} errors={errors} />
                <MaterialPicker setValue={setValue} errors={errors} clearErrors={clearErrors} required />
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
