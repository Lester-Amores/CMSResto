import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import type { Unit } from '@/admin/types';



interface UnitFormProps {
    register: UseFormRegister<Unit>;
    errors: FieldErrors<Unit>;
}

const UnitForm = ({ register, errors }: UnitFormProps) => {

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
                <Label htmlFor="description">Description</Label>
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

export default UnitForm;
