import { Award } from 'lucide-react';

interface TopMeal {
  name: string;
  total_orders: number;
}

export function TopMealsList({ meals }: { meals: TopMeal[] }) {
  return meals.length > 0 ? (
    <div className="space-y-3">
      {meals.map((meal, index) => (
        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 transition">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">{index + 1}. {meal.name}</span>
          </div>
          <span className="text-sm font-semibold">{meal.total_orders} orders</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-sm">No top meals data available.</div>
  );
}
