import * as React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import type { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "../lib/utils";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({
  placeholder,
  value,
  future,
  onChange,
}: {
  placeholder?: string;
  value?: Date;
  /** Добавляет будущие даты */
  future?: boolean;
  onChange?: SelectSingleEventHandler;
  onBlur?: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP", { locale: ru })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          disabled={
            !future
              ? (date) => date > new Date() || date < new Date("1900-01-01")
              : false
          }
        />
      </PopoverContent>
    </Popover>
  );
}
