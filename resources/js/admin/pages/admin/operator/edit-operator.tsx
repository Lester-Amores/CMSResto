import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import OperatorForm from './operator-form';
import { FlashMessages, Operator } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getOperator } from '@/admin/services/services';
import BranchPicker from '@/admin/components/picker/branch-picker';

interface EditOperatorProps {
    onSuccess: () => void;
    operatorId: number;
}

export default function EditOperator({ onSuccess, operatorId }: EditOperatorProps) {
    const { register, handleSubmit, formState: { errors }, reset, setError, setValue, clearErrors } = useForm<Operator>();
    const { data, isLoading, error } = useQuery({
        queryKey: ['operator', operatorId],
        queryFn: () => getOperator(operatorId),
    });

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                email: data.user?.email || '',
            });
        }
    }, [data, reset]);


    const onSubmit: SubmitHandler<Operator> = (data) => {
        if (!data.branch_id) {
            setError("branch_id", { message: "This field is required." });
            return;
        };

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        router.post(route('operators.update', operatorId), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Edit Operator</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <OperatorForm register={register} errors={errors} />
                    <BranchPicker initialBranch={data?.branch} setValue={setValue} errors={errors} clearErrors={clearErrors} required />

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
