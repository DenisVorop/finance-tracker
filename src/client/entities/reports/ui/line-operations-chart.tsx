import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import type { ChartConfig } from "@/shared/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import { useReports } from "@/entities/reports";
import { cn } from "@/shared/lib/utils";

const greenColor = "#10B981";
const redColor = "#EF4444";

const chartConfig = {
  income: {
    label: "Доходы",
    color: greenColor,
  },
  expense: {
    label: "Расходы",
    color: redColor,
  },
} satisfies ChartConfig;

export function LineOperationsChart({
  type,
  className,
}: {
  type: "income" | "expense";
  className?: string;
}) {
  const { data } = useReports();

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("min-h-[200px] w-full", className)}
    >
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {type === "income" && (
          <Line
            dataKey="income"
            stroke={greenColor}
            fill={greenColor}
            radius={4}
          />
        )}
        {type === "expense" && (
          <Line
            dataKey="expense"
            stroke={redColor}
            fill={redColor}
            radius={4}
          />
        )}
      </LineChart>
    </ChartContainer>
  );
}
