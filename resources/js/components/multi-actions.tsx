import { Button } from '@/components/ui/button';
import { Trash, Mail, ArchiveRestoreIcon } from 'lucide-react';

interface MultiActionsProps<T> {
    onMultiDelete: () => void;
    onMultiRestore: () => void;
    onMultiSendEmail?: () => void;
    selectedRows: T[];
}

const isRowWithDeleted = (row: any): row is { isDeleted: boolean } => {
    return row && typeof row.isDeleted === 'boolean';
};

export const MultiActions = <T,>({
    onMultiDelete,
    onMultiRestore,
    onMultiSendEmail,
    selectedRows
}: MultiActionsProps<T>) => {
    const hasDeletedRows = selectedRows.some(row => isRowWithDeleted(row) && row.isDeleted);
    const hasNonDeletedRows = selectedRows.some(row => isRowWithDeleted(row) && !row.isDeleted);

    return (
        <div className="flex space-x-2">
            {hasNonDeletedRows && (
                <Button onClick={onMultiDelete} variant="destructive" className="flex items-center space-x-2">
                    <Trash className="mr-2" />
                    Delete
                </Button>
            )}

            {hasDeletedRows && (
                <Button onClick={onMultiRestore} variant="secondary" className="flex items-center space-x-2">
                    <ArchiveRestoreIcon className="mr-2" />
                    Restore
                </Button>
            )}

            {onMultiSendEmail && (
                <Button onClick={onMultiSendEmail} variant="default" className="flex items-center space-x-2">
                    <Mail className="mr-2" />
                    Send Email
                </Button>
            )}
        </div>
    );
};
