import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FilterFormProps {
    onSubmit: (data: FilterFormData) => void;
}

export interface FilterFormData {
    name?: string;
    email?: string;
}

const FilterForm = ({ onSubmit }: FilterFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleFormSubmit: SubmitHandler<FilterFormData> = async (formData) => {
        try {
            onSubmit(formData);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div className="p-4 bg-white dark:bg-black shadow-md rounded-b-none font-mono">
            <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
                        <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            name
                        </Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="name"
                            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                            {...register('name')}
                        />
                        {errors.name && (
                            <span className="text-red-500 dark:text-red-400 text-sm">
                                {typeof errors.name.message === 'string' ? errors.name.message : ''}
                            </span>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4 md:mb-0">
                        <Label htmlFor="filter-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </Label>
                        <Input
                            type="text"
                            id="filter-email"
                            placeholder="email"
                            className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className="text-red-500 dark:text-red-400 text-sm">
                                {typeof errors.email.message === 'string' ? errors.email.message : ''}
                            </span>
                        )}
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/3 px-2 pt-2 lg:pt-6 md:pt-6">
                        <Button
                            type="submit"
                            className="w-full md:w-auto lg:w-auto bg-black dark:bg-gray-600 text-white dark:text-gray-300 shadow-md dark:hover:bg-gray-400"
                        >
                            Apply
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FilterForm;
