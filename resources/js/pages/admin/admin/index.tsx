import React, { useState, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, PaginatedProps, Admin, FlashMessages, ModalMode } from '@/types';
import DataTable from '@/components/datatable';
import ActionButtons from '@/components/action-buttons';
import SlidingModal from '@/components/sliding-modal';
import CenterModal from '@/components/center-modal';
import { showConfirmationPopup } from '@/components/confirmation-popup';
import { useFetchData } from '@/hooks/use-fetch-data';
import { handleFlashMessages, showErrors } from '@/lib/utils';
import FilterForm, { type FilterFormData } from './filter-form';
import AddAdmin from './add-admin';
import EditAdmin from './edit-admin';
import ViewAdmin from './view-admin/view-admin';



interface AdminProps extends PaginatedProps {
    admins: Admin[];
}

export default function AdminPage({ admins, current_page, total_pages, total_rows, per_page }: AdminProps) {
    const [searchParams, setSearchParams] = useState({});
    const [page, setPage] = useState(current_page);
    const [withDeleted, setWithDeleted] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(per_page);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<ModalMode>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedIdsRef = useRef<number[]>([]);

    useFetchData({ page, rowsPerPage, searchParams, withDeleted });

    const handleSort = (sortBy: string, sortOrder: string) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sortBy,
            sortOrder,
        }));
    };
    
    const handleSearch = (query: string) => {
        setPage(1);
        setSearchParams(query !== ' ' ? { ...searchParams, search: query } : {});
    };


    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleWithDeletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setWithDeleted(checked);
    };

    const handleRowsPerPageChange = (newRowsPerPage: number) => {
        setRowsPerPage(newRowsPerPage)
    };

    const closeModal = () => {
        setModalMode(null);
        setModalOpen(false);
    }

    const handleFilterSubmit = (formData: FilterFormData) => {
        setPage(1);
        const params = Object.entries(formData)
            .filter(([_, value]) => value !== '')
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
        setSearchParams(params);
    }


    const handleAdd = () => {
        setModalMode('add');
        setModalOpen(true);
    }

    const handleEdit = (id: number) => {
        setModalMode('edit');
        setModalOpen(true);
        setSelectedId(id);
    }

    const handleShow = (id: number) => {
        setModalMode('view');
        setModalOpen(true);
        setSelectedId(id);
    }

    const handleDelete = (id: number) => {
        const title = 'Delete Data';
        const message = 'Are you sure you want to delete this data?';
        const confirmButton = 'Delete';
        const cancelButton = 'Cancel';

        showConfirmationPopup({
            title,
            message,
            confirmButton,
            cancelButton,
            onSuccess: () => {
                router.delete(route('admins.destroy', id), {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const flash = page.props.flash as FlashMessages;
                        handleFlashMessages(flash)
                    }

                })
            },
        })
    }

    const handleRestore = (id: number) => {
        const title = 'Restore Data';
        const message = 'Are you sure you want to restore this data?';
        const confirmButton = "Restore";
        const cancelButton = "Cancel";

        showConfirmationPopup({
            title,
            message,
            confirmButton,
            cancelButton,
            onSuccess: () => {
                router.post(route('admins.restore'), { id }, {
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const flash = page.props.flash as FlashMessages;
                        handleFlashMessages(flash)
                    },
                    onError: (errors) => {
                        showErrors(errors);
                    },
                })
            },
        })
    }

    const handleRowSelect = (selectedRows: Record<string, any>[]) => {
        const selectedIds = selectedRows.map(row => row.id);
        selectedIdsRef.current = selectedIds;
    };

    const handleMultiDelete = () => {
        const title = 'Delete Data';
        const message = 'Are you sure you want to delete this data?';
        const confirmButton = 'Delete';
        const cancelButton = 'Cancel';

        showConfirmationPopup({
            title,
            message,
            confirmButton,
            cancelButton,
            onSuccess: () => {
                router.post(route('admins.multi-delete'), { ids: selectedIdsRef.current }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const flash = page.props.flash as FlashMessages;
                        handleFlashMessages(flash)
                    },
                    onError: (errors) => {
                        showErrors(errors);
                    }
                })
            },
        })
    }

    const handleMultiRestore = () => {
        const title = 'Restore Data';
        const message = 'Are you sure you want to restore this data?';
        const confirmButton = "Restore";
        const cancelButton = "Cancel";

        showConfirmationPopup({
            title,
            message,
            confirmButton,
            cancelButton,
            onSuccess: () => {
                router.post(route('admins.multi-restore'), { ids: selectedIdsRef.current }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    preserveScroll: true,
                    onSuccess: (page) => {
                        const flash = page.props.flash as FlashMessages;
                        handleFlashMessages(flash)
                    },
                    onError: (errors) => {
                        showErrors(errors);
                    }
                })
            },
        })
    }


    const columns = [
        { header: '#', key: 'id', sortTable: true },
        { header: 'Name', key: 'last_name', sortTable: true },
        { header: 'Email', key: 'email', sortTable: true },
        { header: 'Actions', key: 'actions', sortTable: false },
    ];

    const data = admins?.map(admin => {
        const isDeleted: boolean = !!admin.deleted_at;
        return {
            id: admin.id,
            last_name: admin?.last_name + ' ' + admin.first_name,
            email: admin?.user.email,
            actions: (
                <ActionButtons
                    toggleId={admin.id}
                    toggleEdit={handleEdit}
                    toggleShow={handleShow}
                    toggleRestore={handleRestore}
                    toggleDelete={handleDelete}
                    isDeleted={isDeleted}
                />
            ),
            isDeleted
        };
    }) || [];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admins',
            href: '/admins',
        },
    ];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admins" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={data}
                    currentPage={current_page}
                    totalPages={total_pages}
                    totalRows={total_rows}
                    rowsPerPage={per_page}
                    onSearch={handleSearch}
                    onSort={handleSort}
                    onPageChange={handlePageChange}
                    onWithDeletedChange={handleWithDeletedChange}
                    filter={<FilterForm onSubmit={handleFilterSubmit} />}
                    onRowSelect={handleRowSelect}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onButtonClick={handleAdd}
                    onMultiDelete={handleMultiDelete}
                    onMultiRestore={handleMultiRestore}
                />
            </div>

            <SlidingModal isOpen={isModalOpen} onClose={closeModal} size={modalMode === 'mail' ? 'md' : 'sm'}>
                {modalMode === 'add' && <AddAdmin onSuccess={closeModal} />}
                {modalMode === 'edit' && selectedId && <EditAdmin adminId={selectedId} onSuccess={closeModal} />}
                {modalMode === 'view' && selectedId && <ViewAdmin adminId={selectedId} />}
            </SlidingModal>
        </AppLayout >
    )
}