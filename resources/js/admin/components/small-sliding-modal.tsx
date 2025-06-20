import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface SmallSlidingModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'xs'| 'sm' | 'md' | 'lg'; // Add size prop with default values
}

const SmallSlidingModal = ({ isOpen, onClose, children, size = 'sm' }: SmallSlidingModalProps) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useLayoutEffect(() => {
        if (isOpen) {
            setMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                setVisible(true);
                document.body.style.overflow = 'hidden';
            });
        } else {
            setVisible(false);
            document.body.style.overflow = '';
            const timeout = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(timeout);
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted) return null;

    // Set different widths based on the size prop
    const modalWidth = {
        xs: 'w-4/5 md:w-1/5',  
        sm: 'w-4/5 md:w-1/4', 
        md: 'w-4/5 md:w-1/2',
        lg: 'w-4/5 md:w-3/4',
    }[size];

    const modalContent = (
        <>
            <div
                data-testid="overlay"
                className={`fixed inset-0 z-50 bg-gray-600/50 dark:bg-gray-800/75 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />
            <div
                data-testid="small-modal-container"
                className={`fixed top-0 right-0 h-full z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-2 overflow-y-hidden transform transition-transform duration-300 ease-in-out ${modalWidth} ${
                    visible ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <button
                    className="absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full focus:outline-none"
                    onClick={onClose}
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="p-2 h-full overflow-y-auto">{children}</div>
            </div>
        </>
    );

    return createPortal(modalContent, document.body);
};

export default SmallSlidingModal;
