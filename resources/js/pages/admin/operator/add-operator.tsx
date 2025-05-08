import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import OperatorForm from './operator-form';
import { FlashMessages, Operator } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';


interface AddOperatorProps {
    onSuccess: () => void;
}

export default function AddOperator({ onSuccess }: AddOperatorProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Operator>();
    const onSubmit: SubmitHandler<Operator> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        router.post(route('operators.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Operator</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <OperatorForm register={register} errors={errors} />
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
