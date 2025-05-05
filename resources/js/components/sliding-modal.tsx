import { useEffect, ReactNode } from 'react';
import { X } from 'lucide-react';

interface SlidingModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SlidingModal = ({
    isOpen,
    onClose,
    children,
    size = 'sm',
}: SlidingModalProps) => {
    const modalSizeClass = {
        sm: 'w-full sm:w-1/3',
        md: 'w-full sm:w-1/2',
        lg: 'w-full sm:w-4/7',
        xl: 'w-full sm:w-4/5',
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''; 
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div
                    data-testid="overlay"
                    className="fixed inset-0 z-40 bg-gray-600/50 dark:bg-gray-800/75"
                    onClick={onClose}
                />
            )}
            <div
                data-testid="modal-container"
                className={`fixed top-0 right-0 h-full z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-2 overflow-y-hidden transform transition-transform duration-500 ${modalSizeClass[size]} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button
                    className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full focus:outline-none"
                    onClick={onClose}
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="p-2 h-full overflow-y-auto">
                    {isOpen && children}
                </div>
            </div>
        </>
    );
};

export default SlidingModal;
