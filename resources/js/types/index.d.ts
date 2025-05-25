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

export interface PaginatedProps{
    current_page: number;
    total_pages: number;
    total_rows: number;
    per_page: number;
}

export interface Admin{
    id: number;
    last_name: string;
    first_name: string;
    user_id:number;
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

export interface Operator{
    id: number;
    last_name: string;
    first_name: string;
    user_id:number;
    email: string;
    password: string;
    role: number;
    status: number;
    branch_id: number;
    branch: Branch;
    user: User;
    phone: string;
    birthday: string;
    started_at: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}


export interface Branch{
    id: number;
    name: string;
    address: string;
    image:number;
    operator_id: string;
    operator?: Operator;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Menu{
    id: number;
    name: string;
    description: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Meal{
    id: number;
    name: string;
    price: number;
    menu_id: number;
    img_src: string;
    menu: Menu;
    description: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}


export type PageProps = InertiaPageProps;

export type ModalMode = "add" | "edit" | "view" | "mail" | null;

export type ValidationErrors = Record<string, string | string[]>;

