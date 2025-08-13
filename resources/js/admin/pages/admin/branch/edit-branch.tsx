import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import BranchForm from './branch-form';
import { FlashMessages, Branch } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getBranch } from '@/admin/services/services';
import ImageUpload from '@/admin/components/image-upload';

interface EditBranchProps {
    onSuccess: () => void;
    branchId: number;
}

export default function EditBranch({ onSuccess, branchId }: EditBranchProps) {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<Branch>();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['branch', branchId],
        queryFn: () => getBranch(branchId),
    });

    useEffect(() => {
        if (data) {
            reset(data);
        }
    }, [data, reset]);

    console.log(data);
    const onSubmit: SubmitHandler<Branch> = (data) => {

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (imageFile) {
            formData.append('img_src', imageFile);
        }

        if (data.img_src === null) {
            formData.append('img_src_removed', 'true');
        }

        router.post(route('branches.update', branchId), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Edit Branch</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <BranchForm register={register} errors={errors} />
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
