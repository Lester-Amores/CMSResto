import { Eye, Edit, Trash, RotateCw } from 'lucide-react';
import { Button } from '@/admin/components/ui/button';

interface ActionButtonsProps {
    toggleId: number;
    email?: string;
    toggleMail?: (email: string) => void;
    toggleEdit?: (id: number) => void;
    toggleShow?: (id: number) => void;
    toggleDelete?: (id: number) => void;
    toggleRestore?: (id: number) => void;
    isDeleted: boolean;
}

const ActionButtons = ({
    toggleId,
    toggleEdit,
    toggleShow,
    toggleDelete,
    toggleRestore,
    isDeleted
}: ActionButtonsProps) => {

    return (
        <div className="flex space-x-2">
            {!isDeleted ? (
                <>
                    {toggleShow && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleShow(toggleId)}
                            title='view'
                            className="w-10 h-8 bg-white/0 dark:bg-gray-800/100 text-white rounded-lg shadow-md hover:bg-white/100 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center"
                        >
                            <Eye className="w-5 h-5 text-black dark:text-white" />
                        </Button>
                    )}
                    {toggleEdit && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleEdit(toggleId)}
                            title='edit'
                            className="w-10 h-8 bg-white/0 dark:bg-gray-800/100 text-white rounded-lg shadow-md hover:bg-white/100 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center"
                        >
                            <Edit className="w-5 h-5 text-black dark:text-white" />
                        </Button>
                    )}
                    {toggleDelete && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleDelete(toggleId)}
                            title='delete'
                            className="w-10 h-8 bg-white/0 dark:bg-gray-800/100 text-white rounded-lg shadow-md hover:bg-white/100 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center"
                        >
                            <Trash className="w-5 h-5 text-black dark:text-white" />
                        </Button>
                    )}
                </>
            ) : (
                toggleRestore && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRestore(toggleId)}
                        title='restore'
                          className="w-10 h-8 bg-white/100 dark:bg-gray-800/100 text-black dark:text-white rounded-lg shadow-md hover:bg-white/100 dark:hover:bg-gray-800/80 hover:shadow-lg hover:scale-105 transform transition duration-200 ease-in-out flex items-center justify-center"
                    >
                        <RotateCw className="w-5 h-5" />
                    </Button>
                )
            )}
        </div>
    );
};

export default ActionButtons;
