import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/admin/components/ui/input';
import { Label } from '@/admin/components/ui/label';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/admin/lib/constants';
import type { Admin } from '@/admin/types';



interface AdminFormProps {
    register: UseFormRegister<Admin>;
    errors: FieldErrors<Admin>;
}

const AdminForm = ({ register, errors }: AdminFormProps) => {

    return (
        <>
            <div className="mb-4">
                <Label htmlFor="last_name">Last name</Label>
                <Input
                    id="last_name"
                    {...register("last_name", { required: 'This filed is required' })}
                    type="text"
                    placeholder='Last_name'
                />
                {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="first_name">First name</Label>
                <Input
                    id="first_name"
                    {...register("first_name", {
                        required: 'This field is requried'
                    })}
                    type="text"
                    placeholder='First name'
                />
                {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    {...register("email", {
                        required: 'This field is required',
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Please enter a valid email address'
                        },
                    })}
                    type="email"
                    placeholder='email'
                />
                {errors?.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    {...register("password", {
                        pattern: {
                            value: PASSWORD_REGEX,
                            message: "Password must be at least 8 characters long and contain at least one letter and one number",
                        },
                    })}
                    type="password"
                    placeholder='Password'
                />
                {errors?.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
        </>
    );
};

export default AdminForm;
