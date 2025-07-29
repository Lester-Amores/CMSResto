import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import OrderForm from './order-form';
import { FlashMessages, Meal, Order } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '@/admin/services/services';
import BranchPicker from '@/admin/components/picker/branch-picker';
import MealsPicker from '@/admin/components/picker/meal-picker';
import { ExtendedOrderMeal } from '@/admin/components/picker/meal-picker';

interface EditOrderProps {
    onSuccess: () => void;
    orderId: number;
}

export default function EditOrder({ onSuccess, orderId }: EditOrderProps) {
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch, clearErrors, setError } = useForm<Order>();
    const [meals, setMeals] = useState<ExtendedOrderMeal[]>([]);

    const handleMealsChange = (newMeals: ExtendedOrderMeal[]) => {
        setMeals(newMeals);
        setValue('meals', newMeals as unknown as Meal[]); // ✅ cast to avoid TS error
    };
    const { data, isLoading, error } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrder(orderId),
    });

    useEffect(() => {
        if (data) {
            reset(data);
            const mapped = data.meals.map((m) => ({
                meal_id: m.pivot.meal_id,
                quantity: m.pivot.quantity,
                name: m.name,
                price: m.price
            }));
            setMeals(mapped);
            setValue('meals', mapped);
        }
    }, [data, reset]);


    const onSubmit: SubmitHandler<Order> = (data) => {

        if (!data.branch_id) {
            setError("branch_id", { message: "This field is required." });
            return;
        };

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'meals' && value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (data.meals && Array.isArray(data.meals)) {
            formData.append('meals', JSON.stringify(data.meals));
        }

        router.post(route('orders.update', orderId), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Edit Order</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <OrderForm register={register} errors={errors} watch={watch} />
                    <BranchPicker initialBranch={data?.branch} setValue={setValue} errors={errors} clearErrors={clearErrors} required />
                    <MealsPicker selectedMeals={meals} onMealsChange={handleMealsChange} errors={errors} />
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
