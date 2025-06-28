import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import MaterialForm from './material-form';
import { FlashMessages, Material } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getMaterial } from '@/admin/services/services';
import UnitPicker from '@/admin/components/picker/unit-picker';

interface EditMaterialProps {
    onSuccess: () => void;
    materialId: number;
}

export default function EditMaterial({ onSuccess, materialId }: EditMaterialProps) {
    const { register, handleSubmit, formState: { errors }, reset, setError, setValue, clearErrors } = useForm<Material>();

    const { data, isLoading, error } = useQuery({
        queryKey: ['material', materialId],
        queryFn: () => getMaterial(materialId),
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);


    const onSubmit: SubmitHandler<Material> = (data) => {

        if (!data.unit_id) {
            setError("unit_id", { message: "This field is required." });
            return;
        };

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        router.post(route('materials.update', materialId), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Edit Material</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <MaterialForm register={register} errors={errors} />
                    <UnitPicker initialUnit={data?.unit} setValue={setValue} errors={errors} clearErrors={clearErrors} required />
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
