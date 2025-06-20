import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import type { ValidationErrors, FlashMessages } from '@/admin/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function showErrors(errors: ValidationErrors) {
    Object.values(errors).forEach((error) => {
        if (Array.isArray(error)) {
            error.forEach((errMsg) => toast.error(errMsg));
        } else {
            toast.error(error);
        }
    });
}


export const handleFlashMessages = (flash: FlashMessages | undefined): boolean => {
    let isSuccess = false;

    if (flash?.success) {
        toast.success(flash.success);
        isSuccess = true; 
    }
    if (flash?.error) {
        toast.error(flash.error);
    }

    return isSuccess;
};
