import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Menu } from '@/types';



interface MenuFormProps {
    register: UseFormRegister<Menu>;
    errors: FieldErrors<Menu>;
}

const MenuForm = ({ register, errors }: MenuFormProps) => {

    return (
        <>
            <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    {...register("name", { required: 'This filed is required' })}
                    type="text"
                    placeholder='name'
                />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="description">Address</Label>
                <Input
                    id="description"
                    {...register("description")}
                    type="text"
                    placeholder='description'
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}
            </div>
        </>
    );
};

export default MenuForm;
