import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import OrderForm from './order-form';
import { FlashMessages, Meal, Order } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useState } from 'react';
import BranchPicker from '@/admin/components/picker/branch-picker';
import MealsPicker, { ExtendedOrderMeal } from '@/admin/components/picker/meal-picker';

interface AddOrderProps {
    onSuccess: () => void;
}

export default function AddOrder({ onSuccess }: AddOrderProps) {
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, setError, watch } = useForm<Order>();
    const [meals, setMeals] = useState<ExtendedOrderMeal[]>([]);

    const handleMealsChange = (newMeals: ExtendedOrderMeal[]) => {
        setMeals(newMeals);
        setValue('meals', newMeals as unknown as Meal[]);
    };

    const onSubmit: SubmitHandler<Order> = (data) => {
        if (!data.branch_id) {
            setError("branch_id", { message: "This field is required." });
            return;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'meals' && value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });


        if (meals.length > 0) {
            formData.append('meals', JSON.stringify(meals));
        }

        router.post(route('orders.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Order</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <OrderForm register={register} errors={errors} watch={watch} />
                <BranchPicker setValue={setValue} errors={errors} clearErrors={clearErrors} required />
                <MealsPicker selectedMeals={meals} onMealsChange={handleMealsChange} errors={errors} />
                <div className="flex justify-end">
                    <Button type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
