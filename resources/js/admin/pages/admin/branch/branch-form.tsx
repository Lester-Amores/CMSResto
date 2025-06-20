import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import type { Branch } from '@/admin/types';



interface BranchFormProps {
    register: UseFormRegister<Branch>;
    errors: FieldErrors<Branch>;
}

const BranchForm = ({ register, errors }: BranchFormProps) => {

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
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    {...register("address", {
                        required: 'This field is requried'
                    })}
                    type="text"
                    placeholder='address'
                />
                {errors.address && <p className="text-red-600">{errors.address.message}</p>}
            </div>
        </>
    );
};

export default BranchForm;
