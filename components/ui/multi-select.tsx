"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MultiSelectProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
  error?: string;
  className?: string;
  isMulti?: boolean;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      selectedValues,
      onChange,
      label,
      error,
      className,
      isMulti = true,
    },
    ref
  ) => {
    const handleChange = (value: string) => {
      if (isMulti) {
        const newValues = selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value)
          : [...selectedValues, value];
        onChange(newValues);
      } else {
        onChange([value]);
      }
    };

    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className={cn("grid grid-cols-2 md:grid-cols-3 gap-2", className)}>
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer",
                !isMulti &&
                  selectedValues.includes(option.value) &&
                  "bg-blue-50 border-blue-200"
              )}
            >
              {isMulti ? (
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleChange(option.value)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="radio"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleChange(option.value)}
                  className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              )}
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
