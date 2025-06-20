import { useForm, SubmitHandler } from 'react-hook-form';
import { router } from '@inertiajs/react';
import { Button } from '@/admin/components/ui/button';
import AdminForm from './admin-form';
import { FlashMessages, Admin } from '@/admin/types';
import { handleFlashMessages, showErrors } from '@/admin/lib/utils';
import ImageUpload from '@/admin/components/image-upload';
import { useState } from 'react';


interface AddAdminProps {
    onSuccess: () => void;
}

export default function AddAdmin({ onSuccess }: AddAdminProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<Admin>();
    const onSubmit: SubmitHandler<Admin> = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (imageFile) {
            formData.append('img_src', imageFile);
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
                <ImageUpload label="Profile Image"  name="img_src" onChange={(file) => setImageFile(file)}/>
                <div className="flex justify-end">
                    <Button type="submit" >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
