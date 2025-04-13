import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4",
          {
            "border-red-200 bg-red-50 text-red-800": variant === "destructive",
            "border-blue-200 bg-blue-50 text-blue-800": variant === "default",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

export { Alert };
