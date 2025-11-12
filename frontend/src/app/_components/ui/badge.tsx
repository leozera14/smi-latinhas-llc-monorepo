import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { StatusDemanda } from "@/types/demanda";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusDemanda;
}

export function Badge({ status, className, ...props }: BadgeProps) {
  const variants = {
    [StatusDemanda.PLANEJAMENTO]: "bg-blue-100 text-blue-800",
    [StatusDemanda.EM_ANDAMENTO]: "bg-primary-100 text-primary-800",
    [StatusDemanda.CONCLUIDO]: "bg-green-100 text-green-800",
  };

  const labels = {
    [StatusDemanda.PLANEJAMENTO]: "Planejamento",
    [StatusDemanda.EM_ANDAMENTO]: "Em Andamento",
    [StatusDemanda.CONCLUIDO]: "Concluído",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[status],
        className
      )}
      {...props}
    >
      {labels[status]}
    </span>
  );
}
