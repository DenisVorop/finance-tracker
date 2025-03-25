import type { ComponentProps, ReactNode } from "react";
import {
  type ControllerProps as BaseControllerProps,
  type Control,
} from "react-hook-form";

import { BillType } from "common/types/bill.types";
import { billTypesMap } from "@/entities/bills";

import { exhaustiveCheck } from "../lib/exhaustive-check";

import { FormField } from "./form";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Switch } from "./switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";
import { Label } from "./label";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FieldValues = Record<string, any>;
type ControllerProps<F extends FieldValues> = Omit<
  BaseControllerProps<F>,
  "render"
> & {
  control: Control<F>;
};

export type ControlType =
  | "text"
  | "select"
  | "switch"
  | "checkbox"
  | "textarea"
  | "billType";

type CheckboxProps = ComponentProps<typeof Checkbox> & {
  label: ReactNode;
};

type InputProps = ComponentProps<typeof Input>;
type SelectProps = Omit<
  ComponentProps<typeof Select>,
  "onValueChange" | "onOpenChange"
> & {
  onChange?: ComponentProps<typeof Select>["onValueChange"];
  onBlur?: ComponentProps<typeof Select>["onOpenChange"];
};
type SwitchProps = ComponentProps<typeof Switch> & { label: string };
type TextareaProps = ComponentProps<typeof Textarea>;

export type FormInputProps =
  | (InputProps & { controlType: "text" })
  | (SelectProps & { controlType: "select" })
  | (CheckboxProps & { controlType: "checkbox" })
  | (SwitchProps & { controlType: "switch" })
  | (TextareaProps & { controlType: "textarea" })
  | (SelectProps & { controlType: "billType" });

type FormControlProps<F extends FieldValues> = ControllerProps<F> & {
  errorMessage?: string;
  helperText?: string;
  controlLabel?: string;
};

export function FormControl<T extends ControlType, F extends FieldValues>(
  props: FormControlProps<F> & Extract<FormInputProps, { controlType: T }>
) {
  const {
    controlType,
    name,
    control,
    rules,
    errorMessage,
    helperText,
    controlLabel,
    ...restProps
  } = props;

  return (
    <div className="flex flex-col gap-1">
      {controlLabel && <Label>{controlLabel}</Label>}
      <FormField
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          const {
            onChange: fieldOnChange,
            onBlur: fieldOnBlur,
            ...restField
          } = field;

          switch (controlType) {
            case "text": {
              const { onChange, onBlur, ..._restProps } =
                restProps as InputProps;
              return (
                <Input
                  onChange={_combineHandlers(fieldOnChange, onChange)}
                  onBlur={_combineHandlers(fieldOnBlur, onBlur)}
                  {...restField}
                  {..._restProps}
                />
              );
            }
            case "select": {
              const { onChange, onBlur, ..._restProps } =
                restProps as SelectProps;
              return (
                <Select
                  onValueChange={_combineHandlers(fieldOnChange, onChange)}
                  onOpenChange={_combineHandlers(fieldOnBlur, onBlur)}
                  {...restField}
                  {..._restProps}
                />
              );
            }
            case "textarea": {
              const { onChange, onBlur, ..._restProps } =
                restProps as TextareaProps;
              return (
                <Textarea
                  onChange={_combineHandlers(fieldOnChange, onChange)}
                  onBlur={_combineHandlers(fieldOnBlur, onBlur)}
                  {...restField}
                  {..._restProps}
                />
              );
            }
            case "checkbox": {
              const { value, ..._restField } = restField;
              const { label, onChange, onBlur, ..._restProps } =
                restProps as CheckboxProps;
              return (
                <Checkbox
                  checked={Boolean(value)}
                  onChange={_combineHandlers(fieldOnChange, onChange)}
                  onBlur={_combineHandlers(fieldOnBlur, onBlur)}
                  {..._restField}
                  {..._restProps}
                >
                  {label}
                </Checkbox>
              );
            }
            case "switch": {
              const { value, ..._restField } = restField;
              const { onChange, onBlur, label, ..._restProps } =
                restProps as SwitchProps;
              return (
                <div className="flex items-center justify-between">
                  <Label>{label}</Label>
                  <Switch
                    checked={Boolean(value)}
                    onChange={_combineHandlers(fieldOnChange, onChange)}
                    onBlur={_combineHandlers(fieldOnBlur, onBlur)}
                    {..._restField}
                    {..._restProps}
                  />
                </div>
              );
            }
            case "billType": {
              const { onChange, onBlur, ..._restProps } =
                restProps as SelectProps;
              return (
                <Select
                  onValueChange={_combineHandlers(fieldOnChange, onChange)}
                  onOpenChange={_combineHandlers(fieldOnBlur, onBlur)}
                  {...restField}
                  {..._restProps}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип счёта" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(BillType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {billTypesMap[type]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }
            default: {
              exhaustiveCheck(controlType);
            }
          }
        }}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _combineHandlers<T extends (...args: any[]) => any>(
  ...handlers: Array<T | undefined>
) {
  return (...args: Parameters<T>): void => {
    handlers.forEach((handler) => {
      if (typeof handler === "function") {
        handler(...args);
      }
    });
  };
}
