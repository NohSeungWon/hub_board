"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  label?: string;
  error?: string;
}

const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ className, options, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <select
          className={cn(
            "w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500",
            error ? "border-red-500" : "border-gray-300",
            className
          )}
          ref={ref}
          {...props}
        >
          <option value="">선택해주세요</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export { Dropdown };
