import { ChevronRightIcon } from "lucide-react";

interface BreadcrumbsProps {
  title: string;
}

export const Breadcrumbs = ({ title }: BreadcrumbsProps) => {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        Docs
      </div>
      <ChevronRightIcon className="h-4 w-4" />
      <div className="font-medium text-foreground">{title}</div>
    </div>
  );
};
