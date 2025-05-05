import http, { isAxiosError } from '@/lib/axios-client';

interface ErrorResponse {
    message?: string;
}


export const getAdmin = async (id: number) => {
    try {
        const response = await http.get('admin/admins/' + id);
        return response.data;
    } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
            const responseData = error.response?.data as ErrorResponse;
            throw responseData?.message || 'message.error';
        }
        throw new Error('message.errorTryAgain');
    }
};