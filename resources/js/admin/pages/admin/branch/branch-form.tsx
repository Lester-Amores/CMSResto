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
            {/* Name */}
            <div className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    {...register("name", { required: 'This field is required' })}
                    type="text"
                    placeholder="Name"
                />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>

            {/* Address */}
            <div className="mb-4">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    {...register("address", { required: 'This field is required' })}
                    type="text"
                    placeholder="Address"
                />
                {errors.address && <p className="text-red-600">{errors.address.message}</p>}
            </div>

            {/* City */}
            <div className="mb-4">
                <Label htmlFor="city">City</Label>
                <Input
                    id="city"
                    {...register("city")}
                    type="text"
                    placeholder="City"
                />
                {errors.city && <p className="text-red-600">{errors.city.message}</p>}
            </div>

            {/* Province */}
            <div className="mb-4">
                <Label htmlFor="province">Province</Label>
                <Input
                    id="province"
                    {...register("province")}
                    type="text"
                    placeholder="Province"
                />
                {errors.province && <p className="text-red-600">{errors.province.message}</p>}
            </div>

            {/* Postal Code */}
            <div className="mb-4">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                    id="postal_code"
                    {...register("postal_code")}
                    type="text"
                    placeholder="Postal Code"
                />
                {errors.postal_code && <p className="text-red-600">{errors.postal_code.message}</p>}
            </div>

            {/* Phone */}
            <div className="mb-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    {...register("phone")}
                    type="text"
                    placeholder="Phone"
                />
                {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            {/* Latitude */}
            <div className="mb-4">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                    id="latitude"
                    {...register("latitude")}
                    type="number"
                    step="any"
                    placeholder="Latitude"
                />
                {errors.latitude && <p className="text-red-600">{errors.latitude.message}</p>}
            </div>

            {/* Longitude */}
            <div className="mb-4">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                    id="longitude"
                    {...register("longitude")}
                    type="number"
                    step="any"
                    placeholder="Longitude"
                />
                {errors.longitude && <p className="text-red-600">{errors.longitude.message}</p>}
            </div>

            {/* Manager Name */}
            <div className="mb-4">
                <Label htmlFor="manager_name">Manager Name</Label>
                <Input
                    id="manager_name"
                    {...register("manager_name")}
                    type="text"
                    placeholder="Manager Name"
                />
                {errors.manager_name && <p className="text-red-600">{errors.manager_name.message}</p>}
            </div>

            {/* Opening Time */}
            <div className="mb-4">
                <Label htmlFor="opening_time">Opening Time</Label>
                <Input
                    id="opening_time"
                    {...register("opening_time")}
                    type="time"
                    placeholder="Opening Time"
                />
                {errors.opening_time && <p className="text-red-600">{errors.opening_time.message}</p>}
            </div>

            {/* Closing Time */}
            <div className="mb-4">
                <Label htmlFor="closing_time">Closing Time</Label>
                <Input
                    id="closing_time"
                    {...register("closing_time")}
                    type="time"
                    placeholder="Closing Time"
                />
                {errors.closing_time && <p className="text-red-600">{errors.closing_time.message}</p>}
            </div>

            {/* Notes */}
            <div className="mb-4">
                <Label htmlFor="notes">Notes</Label>
                <Input
                    id="notes"
                    {...register("notes")}
                    type="text"
                    placeholder="Additional Notes"
                />
                {errors.notes && <p className="text-red-600">{errors.notes.message}</p>}
            </div>

        </>
    );
};

export default BranchForm;
