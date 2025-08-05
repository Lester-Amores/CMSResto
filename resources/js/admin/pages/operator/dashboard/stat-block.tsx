interface StatProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    bg: string;
}

export const StatBlock = ({ icon, label, value, bg }: StatProps) =>  {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-lg ${bg}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-xs text-gray-600 dark:text-white">{label}</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{value}</span>
            </div>
        </div>
    );
}
