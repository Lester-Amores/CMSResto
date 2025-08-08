import http, { isAxiosError } from '@/admin/lib/axios-client';

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

export const getUnit = async (id: number) => {
    try {
        const response = await http.get('admin/units/' + id);
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

export const getOperator = async (id: number) => {
    try {
        const response = await http.get('admin/operators/' + id);
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

export const getBranch = async (id: number) => {
    try {
        const response = await http.get('admin/branches/' + id);
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

export const fetchBranches = async ({ page = 1, per_page = 10, withDeleted = false, search = "" }) => {
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
            withDeleted: String(withDeleted),
            search
        }).toString();

        const response = await http.get(`admin/branches?${queryParams}`);
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

export const getMenu = async (id: number) => {
    try {
        const response = await http.get('admin/menus/' + id);
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

export const fetchMenus = async ({ page = 1, per_page = 10, withDeleted = false, search = "" }) => {
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
            withDeleted: String(withDeleted),
            search
        }).toString();

        const response = await http.get(`admin/menus?${queryParams}`);
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

export const getMeal = async (id: number) => {
    try {
        const response = await http.get('admin/meals/' + id);
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

export const getIngredient = async (id: number) => {
    try {
        const response = await http.get('admin/ingredients/' + id);
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

export const fetchUnits = async ({ page = 1, per_page = 10, withDeleted = false, search = "" }) => {
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
            withDeleted: String(withDeleted),
            search
        }).toString();

        const response = await http.get(`admin/units?${queryParams}`);
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

export const fetchIngredients = async ({ page = 1, per_page = 10, withDeleted = false, search = "" }) => {
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
            withDeleted: String(withDeleted),
            search
        }).toString();

        const response = await http.get(`admin/ingredients?${queryParams}`);
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

export const getOrder = async (id: number) => {
    try {
        const response = await http.get('admin/orders/' + id);
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

export const fetchMeals = async ({ page = 1, per_page = 10, withDeleted = false, search = "" }) => {
    try {
        const queryParams = new URLSearchParams({
            page: String(page),
            per_page: String(per_page),
            withDeleted: String(withDeleted),
            search
        }).toString();

        const response = await http.get(`admin/meals?${queryParams}`);
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


export const fetchOperatorSalesData = async ({
    range = "month",
    date = new Date().toISOString().split("T")[0],
}: { range?: "year" | "month" | "week" | "day"; date?: string }) => {
    try {
        const queryParams = new URLSearchParams({
            range,
            date,
        }).toString();

        const response = await http.get(`/operator/sales-data?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
            const responseData = error.response?.data as ErrorResponse;
            throw responseData?.message || "message.error";
        }
        throw new Error("message.errorTryAgain");
    }
};


export const fetchAdminSalesData = async ({
    range = "month",
    date = new Date().toISOString().split("T")[0],
}: { range?: "year" | "month" | "week" | "day"; date?: string }) => {
    try {
        const queryParams = new URLSearchParams({
            range,
            date,
        }).toString();

        const response = await http.get(`/admin/sales-data?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
            const responseData = error.response?.data as ErrorResponse;
            throw responseData?.message || "message.error";
        }
        throw new Error("message.errorTryAgain");
    }
};