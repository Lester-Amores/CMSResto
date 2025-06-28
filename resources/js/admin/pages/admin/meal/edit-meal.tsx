import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import MealForm from './meal-form';
import { FlashMessages, Material, Meal } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getMeal } from '@/admin/services/services';
import MenuPicker from '@/admin/components/picker/menu-picker';
import ImageUpload from '@/admin/components/image-upload';
import MaterialsPicker from '@/admin/components/picker/material-picker';

interface EditMealProps {
    onSuccess: () => void;
    mealId: number;
}

export default function EditMeal({ onSuccess, mealId }: EditMealProps) {
    const { register, handleSubmit, formState: { errors }, reset, setError, setValue, clearErrors } = useForm<Meal>();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [materials, setMaterials] = useState<Material[]>([]);


    const handleMaterialsChange = (newMaterials: Material[]) => {
        setMaterials(newMaterials);
        setValue('materials', newMaterials);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['meal', mealId],
        queryFn: () => getMeal(mealId),
    });

    useEffect(() => {
        if (data) {
            reset(data);
            const mapped = data.materials.map((m) => ({
                id: m.pivot.material_id,
                quantity: m.pivot.quantity,
                name: m.name,
            }));
            setMaterials(mapped);
            setValue('materials', mapped);
        }
    }, [data, reset]);


    const onSubmit: SubmitHandler<Meal> = (data) => {

        if (!data.menu_id) {
            setError("menu_id", { message: "This field is required." });
            return;
        };

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'materials' && value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (imageFile) {
            formData.append('img_src', imageFile);
        }

        if (data.img_src === null) {
            formData.append('img_src_removed', 'true');
        }

        if (data.materials && Array.isArray(data.materials)) {
            formData.append('materials', JSON.stringify(data.materials));
        }

        router.post(route('meals.update', mealId), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Edit Meal</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <MealForm register={register} errors={errors} />
                    <MenuPicker initialMenu={data?.menu} setValue={setValue} errors={errors} clearErrors={clearErrors} required />
                    <MaterialsPicker selectedMaterials={materials} onMaterialsChange={handleMaterialsChange} errors={errors} />
                    <ImageUpload initialImageUrl={data?.img_src} label="Profile Image" name="img_src" onChange={(file) => setImageFile(file)} setValue={setValue} />
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
