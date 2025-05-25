import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AdminForm from './admin-form';
import { FlashMessages, Admin } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getAdmin } from '@/services/services';
import ImageUpload from '@/components/image-upload';


interface EditAdminProps {
    onSuccess: () => void;
    adminId: number;
}

export default function EditAdmin({ onSuccess, adminId }: EditAdminProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Admin>();
    const [imageFiles, setImageFiles] = useState<File[] | null>(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['admin', adminId],
        queryFn: () => getAdmin(adminId),
    });

    useEffect(() => {
        if (data) {
            reset({
                ...data,
                email: data.user?.email || '',
            });
        }
    }, [data, reset]);


    const onSubmit: SubmitHandler<Admin> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        if (imageFiles) {
            Array.from(imageFiles).forEach((file) => {
                formData.append('img_src', file);
            });
        }

        router.post(route('admins.update', adminId), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Edit Admin</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                    <AdminForm register={register} errors={errors} />
                    <ImageUpload initialImageUrl={data?.img_src} label="Profile Image" name="img_src" onChange={(files) => setImageFiles(files)} />

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
