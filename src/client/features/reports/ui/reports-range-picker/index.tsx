import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { useReports } from "@/entities/reports";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";
import { formatDate, parseDate } from "common/lib/parse-date";

export function ReportsRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { initialParams, updateParams } = useReports();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: parseDate(initialParams.startDate),
    to: parseDate(initialParams.endDate),
  });

  const handleSelectDateRange = React.useCallback(
    (range?: DateRange) => {
      updateParams({
        startDate: formatDate(range?.from || new Date()),
        endDate: formatDate(range?.to || new Date()),
      });
      setDate(range);
    },
    [updateParams]
  );

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd.MM.yyyy")} -{" "}
                  {format(date.to, "dd.MM.yyyy")}
                </>
              ) : (
                format(date.from, "dd.MM.yyyy")
              )
            ) : (
              <span>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
