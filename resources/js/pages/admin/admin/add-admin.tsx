import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AdminForm from './admin-form';
import { FlashMessages, Admin } from '@/types';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import ImageUpload from '@/components/image-upload';
import { useState } from 'react';


interface AddAdminProps {
    onSuccess: () => void;
}

export default function AddAdmin({ onSuccess }: AddAdminProps) {
    const [imageFiles, setImageFiles] = useState<File[] | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<Admin>();
    const onSubmit: SubmitHandler<Admin> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (imageFiles) {
            Array.from(imageFiles).forEach((file) => {
                formData.append('img_src', file);
            });
        }

        router.post(route('admins.store'), formData, {
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
            <h2 className="text-2xl font-semibold mb-10">Add Admin</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <AdminForm register={register} errors={errors} />
                <ImageUpload label="Profile Image"  name="img_src" onChange={(files) => setImageFiles(files)}/>
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
