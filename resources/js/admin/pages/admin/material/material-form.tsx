import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import type { Material } from '@/admin/types';



interface MaterialFormProps {
    register: UseFormRegister<Material>;
    errors: FieldErrors<Material>;
}

const MaterialForm = ({ register, errors }: MaterialFormProps) => {

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
                <Label htmlFor="unit_cost">Unit Cost</Label>
                <Input
                    id="unit_cost"
                    {...register("unit_cost")}
                    type="number"
                    placeholder='unit cost'
                />
                {errors.unit_cost && <p className="text-red-600">{errors.unit_cost.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                    id="quantity"
                    {...register("quantity")}
                    type="number"
                    placeholder='quantity'
                />
                {errors.quantity && <p className="text-red-600">{errors.quantity.message}</p>}
            </div>
        </>
    );
};

export default MaterialForm;
