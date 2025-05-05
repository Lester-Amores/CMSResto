import { ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

interface CenterModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const CenterModal = ({ isOpen, onClose, children }: CenterModalProps) => {
    if (!isOpen) return null;

    const handleBackgroundClick = () => {
        onClose();
    };

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 z-50 flex bg-gray-600/50 dark:bg-gray-800/75 items-center justify-center overflow-y-auto"
            onClick={handleBackgroundClick}
        >
            <div
                className="bg-white dark:bg-black rounded-lg shadow-lg p-6 max-w-md w-full relative"
                onClick={handleContentClick}
            >
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default CenterModal;
