import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import MealForm from './meal-form';
import { FlashMessages, Meal, Ingredient } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import MenuPicker from '@/admin/components/picker/menu-picker';
import ImageUpload from '@/admin/components/image-upload';
import IngredientsPicker from '@/admin/components/picker/ingredient-picker'; // ✅ Import this
import { useState } from 'react';

interface AddMealProps {
    onSuccess: () => void;
}

export default function AddMeal({ onSuccess }: AddMealProps) {
    const { register, handleSubmit, formState: { errors }, setError, setValue, clearErrors } = useForm<Meal>();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]); // ✅ Ingredient state

    const handleIngredientsChange = (newIngredients: Ingredient[]) => {
        setIngredients(newIngredients);
        setValue('ingredients', newIngredients);
    };

    const onSubmit: SubmitHandler<Meal> = (data) => {
        if (!data.menu_id) {
            setError("menu_id", { message: "This field is required" });
            return;
        }

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'ingredients' && value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (imageFile) {
            formData.append('img_src', imageFile);
        }

        if (ingredients.length > 0) {
            formData.append('ingredients', JSON.stringify(ingredients));
        }

        router.post(route('meals.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Meal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <MealForm register={register} errors={errors} />
                <MenuPicker setValue={setValue} errors={errors} clearErrors={clearErrors} required />
                <IngredientsPicker
                    selectedIngredients={ingredients}
                    onIngredientsChange={handleIngredientsChange}
                    errors={errors}
                />
                <ImageUpload label="Meal Image" name="img_src" onChange={(file) => setImageFile(file)} />

                <div className="flex justify-end">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
