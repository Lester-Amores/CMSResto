import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import OperatorForm from './operator-form';
import { FlashMessages, Operator } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import BranchPicker from '@/components/picker/branch-picker';


interface AddOperatorProps {
    onSuccess: () => void;
}

export default function AddOperator({ onSuccess }: AddOperatorProps) {
    const { register, handleSubmit, formState: { errors }, setError, setValue, clearErrors } = useForm<Operator>();
    const onSubmit: SubmitHandler<Operator> = (data) => {

        if (!data.branch_id) {
            setError("branch_id", { message: "This field is required" });
            return;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, String(value));
            }
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
                <BranchPicker setValue={setValue} errors={errors} clearErrors={clearErrors} required />

                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
