import { useStatistics } from "@/entities/reports";
import { formatCurrency } from "@/shared/lib/format-number";

export function Statistics() {
  const { data } = useStatistics();

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-gray-950">
      {/* Доходы */}
      <div className="rounded-2xl shadow-md p-6 bg-green-200/50">
        <h3 className="text-lg font-semibold mb-4">Средний доход</h3>
        <ul className="space-y-2 font-medium">
          <li>
            За день:{" "}
            <strong className="text-green-500">
              {formatCurrency(data.averageIncomePerDay)}
            </strong>
          </li>
          <li>
            За текущий день:{" "}
            <strong className="text-green-500">
              {formatCurrency(data.todayIncome)}
            </strong>
          </li>
          <li>
            За текущую неделю:{" "}
            <strong className="text-green-500">
              {formatCurrency(data.weekIncome)}
            </strong>
          </li>
        </ul>
      </div>

      {/* Расходы */}
      <div className="rounded-2xl shadow-md p-6 bg-red-200/50">
        <h3 className="text-lg font-semibold mb-4">Средняя сумма расходов</h3>
        <ul className="space-y- font-medium">
          <li>
            За день:{" "}
            <strong className="text-red-900">
              {formatCurrency(data.averageExpensePerDay)}
            </strong>
          </li>
          <li>
            За текущий день:{" "}
            <strong className="text-red-900">
              {formatCurrency(data.todayExpense)}
            </strong>
          </li>
          <li>
            За текущую неделю:{" "}
            <strong className="text-red-900">
              {formatCurrency(data.weekExpense)}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
