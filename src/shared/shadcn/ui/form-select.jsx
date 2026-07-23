"use client";

import { FormControl } from "./form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/ui/select";

export function FormSelect({ options, placeholder, onValueChange, defaultValue, value, ...props }) {
  return (
    <FormControl>
      <Select onValueChange={onValueChange} defaultValue={defaultValue} value={value} {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormControl>
  );
}
