import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface PageProps {
    [key: string]: unknown;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: number;
    status: number;
    email_verified_at: string | null;
    admin: Admin;
    operator: Operator;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface FlashMessages {
    data?: T;
    success?: string;
    error?: string;
}

export interface PaginatedProps {
    current_page: number;
    total_pages: number;
    total_rows: number;
    per_page: number;
}

export interface Admin {
    id: number;
    last_name: string;
    first_name: string;
    user_id: number;
    email: string;
    password: string;
    role: number;
    status: number;
    user: User;
    img_src: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Operator {
    id: number;
    last_name: string;
    first_name: string;
    user_id: number;
    email: string;
    password: string;
    role: number;
    status: number;
    branch_id: number;
    branch: Branch;
    user: User;
    phone: string;
    birthday: string;
    img_src: string;
    started_at: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}


export interface Branch {
    id: number;
    name: string;
    address: string;
    img_src: number;
    operator_id: number;
    operator?: Operator;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Menu {
    id: number;
    name: string;
    description: string;
    img_src: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    meals: Meal[];
}

export interface Meal {
    id: number;
    name: string;
    price: number;
    menu_id: number;
    ingredients: Ingredient[];
    img_src: string;
    menu: Menu;
    description: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Unit {
    id: number;
    name: string;
    description: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Ingredient {
    id: number;
    name: string;
    unit_id: number;
    branch_id: number;
    unit_cost: number;
    quantity: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    unit: Unit;
    branch: Branch;
}

export type IngredientMeal = {
    meal_id?: number | null;
    ingredient_id: number;
    quantity: number;
    ingredient?: Ingredient | null;
    meal?: Meal | null;
};

export interface Order {
    id: number;
    order_number: string;
    order_type: number;
    discount_type?: number;
    discount_id_number?: number | null;
    discount_amount: number;
    subtotal: number;
    total: number;
    tax_amount: number;
    payment_method: number;
    status: number;
    notes?: string | null;
    branch_id: number;
    deleted_at?: string | null;
    created_at: string;
    updated_at: string;
    branch: Branch;
    meals: Meal[];
}

export interface OrderMeal {
    id?: number;
    order_id?: number;
    meal_id: number;
    quantity: number;
    price?: string;
    total?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
    meals?: Meal[];
}


export type PageProps = InertiaPageProps;

export type ModalMode = "add" | "edit" | "view" | "mail" | null;

export type ValidationErrors = Record<string, string | string[]>;

