import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import BranchForm from './branch-form';
import { FlashMessages, Branch } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';


interface AddBranchProps {
    onSuccess: () => void;
}

export default function AddBranch({ onSuccess }: AddBranchProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<Branch>();
    const onSubmit: SubmitHandler<Branch> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        router.post(route('branches.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Branch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <BranchForm register={register} errors={errors} />
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
