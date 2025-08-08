import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface OrderTypeStat {
  type: string;
  total: number;
}

export function OrderCategoryChart({ orderTypes }: { orderTypes: OrderTypeStat[] }) {
  return orderTypes?.length > 0 ? (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={orderTypes} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="type" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ fontSize: '14px', borderRadius: '8px' }} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} barSize={35}>
            {orderTypes?.map((_, index) => (
              <Cell
                key={index}
                fill={
                  index === 0 ? "#10B981" :
                  index === 1 ? "#3B82F6" :
                  "#F59E0B"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div className="text-gray-500 text-sm">No order data available.</div>
  );
}
