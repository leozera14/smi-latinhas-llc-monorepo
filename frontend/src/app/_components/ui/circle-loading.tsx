import { cn } from "@/utils/cn";

interface CircleLoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CircleLoading({ size = "md", className }: CircleLoadingProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-gray-300 border-t-primary",
          sizes[size]
        )}
      />
    </div>
  );
}
