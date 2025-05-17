import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import OperatorForm from './operator-form';
import { PageProps, FlashMessages, Operator } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getOperator } from '@/services/services';
import { FormDataConvertible } from '@inertiajs/core';

interface EditOperatorProps {
    onSuccess: () => void;
    operatorId: number;
}

export default function EditOperator({ onSuccess, operatorId }: EditOperatorProps) {
    const { t } = usePage<PageProps>().props;
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Operator>();
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
        const payload = { ...data } as Record<string, FormDataConvertible>;
        router.post(route('operators.update', operatorId), payload, {
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
