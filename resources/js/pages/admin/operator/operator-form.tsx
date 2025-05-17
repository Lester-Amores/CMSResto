import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/lib/constants';
import type { Operator } from '@/types';



interface OperatorFormProps {
    register: UseFormRegister<Operator>;
    errors: FieldErrors<Operator>;
}

const OperatorForm = ({ register, errors }: OperatorFormProps) => {

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

            <div className="mb-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    {...register("phone", {
                        required: 'this field is required',
                    })}
                    type="number"
                    placeholder="phone"
                />
                {errors?.phone && <p className="text-red-600">{errors.phone.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                    placeholder="Select your birthday"
                    {...register("birthday", {
                        required: "This field is required",
                    })}
                    id="birthday"
                    type="date"
                />
                {errors?.birthday && <p className="text-red-600">{errors.birthday.message}</p>}
            </div>

            <div className="mb-4">
                <Label htmlFor="started_at">Birthday</Label>
                <Input
                    placeholder="Input date started"
                    {...register("started_at", {
                        required: "This field is required",
                    })}
                    id="started_at"
                    type="date"
                />
                {errors?.started_at && <p className="text-red-600">{errors.started_at.message}</p>}
            </div>

        </>
    );
};

export default OperatorForm;
