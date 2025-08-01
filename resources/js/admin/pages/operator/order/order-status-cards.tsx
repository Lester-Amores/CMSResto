import { Clock, Utensils, CheckCircle } from 'lucide-react';

interface Props {
    activeTab: 'pending' | 'ready' | 'completed';
    onTabChange: (tab: 'pending' | 'ready' | 'completed') => void;
    counts: {
        pending: number;
        ready: number;
        completed: number;
    };
}

export const OrderStatusCards = ({ activeTab, onTabChange, counts }: Props) => {
    return (
        <div className="h-1/6 flex flex-row p-4 gap-4 max-h-26">
            <button
                onClick={() => onTabChange('pending')}
                className={`flex flex-1 bg-yellow-50 border rounded-xl shadow p-4 items-center justify-between transition 
                  ${activeTab === 'pending' ? 'border-yellow-500 ring-2 ring-yellow-300' : 'border-yellow-200'}`}
            >
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-yellow-700">Pending Orders</span>
                    <span className="text-3xl font-bold text-yellow-800 leading-tight">{counts.pending}</span>
                </div>
                <Clock className="text-yellow-600 w-14 h-14 opacity-80" />
            </button>

            <button
                onClick={() => onTabChange('ready')}
                className={`flex flex-1 bg-green-100 border rounded-xl shadow p-4 items-center justify-between transition 
                  ${activeTab === 'ready' ? 'border-green-500 ring-2 ring-green-300' : 'border-green-300'}`}
            >
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-green-700">Ready Orders</span>
                    <span className="text-3xl font-bold text-green-900 leading-tight">{counts.ready}</span>
                </div>
                <Utensils className="text-green-600 w-14 h-14 opacity-80" />
            </button>

            <button
                onClick={() => onTabChange('completed')}
                className={`flex flex-1 bg-blue-100 border rounded-xl shadow p-4 items-center justify-between transition 
                  ${activeTab === 'completed' ? 'border-blue-500 ring-2 ring-blue-300' : 'border-blue-300'}`}
            >
                <div className="flex flex-col text-left">
                    <span className="text-sm font-medium text-blue-700">Completed Orders</span>
                    <span className="text-3xl font-bold text-blue-900 leading-tight">{counts.completed}</span>
                </div>
                <CheckCircle className="text-blue-600 w-14 h-14 opacity-80" />
            </button>
        </div>
    );
};
