"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItem } from "@/types/nav";

import { cn } from "@/lib/utils";

export interface DocsSidebarNavProps {
  items: SidebarNavItem[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) => (
        <NavItem key={index} item={item} pathname={pathname} />
      ))}
    </div>
  ) : null;
}

interface NavItemProps {
  item: SidebarNavItem;
  pathname: string | null;
}

function NavItem({ item, pathname }: NavItemProps) {
  const isActive = pathname === item.href;
  const hasChildren = item.items && item.items.length > 0;

  // Function to get label color class based on labelColor
  const getLabelColorClass = (color?: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-500 text-white";
      case "green":
        return "bg-green-500 text-white";
      case "orange":
        return "bg-orange-500 text-white";
      case "purple":
        return "bg-purple-500 text-white";
      case "red":
        return "bg-red-500 text-white";
      default:
        return "bg-[#adfa1d] text-[#000000]";
    }
  };

  if (hasChildren) {
    return (
      <div>
        <span className="flex w-full cursor-default items-center rounded-md p-2 text-xs font-medium text-zinc-400">
          {item.title}
        </span>
        <div className="ml-3 border-l border-zinc-800">
          <DocsSidebarNavItems items={item.items} pathname={pathname} />
        </div>
      </div>
    );
  }

  if (item.href && !item.disabled) {
    return (
      <Link
        href={item.href}
        className={cn(
          "group flex w-full text-md pl-4 items-center font-medium border border-transparent px-2 py-2 hover:underline",
          item.disabled && "cursor-not-allowed opacity-60",
          isActive
            ? "text-foreground border-l-2 border-l-white"
            : "text-zinc-400"
        )}
        target={item.external ? "_blank" : ""}
        rel={item.external ? "noreferrer" : ""}
      >
        {item.title}
        {item.label && (
          <span className={cn("ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline", getLabelColorClass(item.labelColor))}>
            {item.label}
          </span>
        )}
      </Link>
    );
  }

  return (
    <span
      className={cn(
        "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
        item.disabled && "cursor-not-allowed opacity-60"
      )}
    >
      {item.title}
      {item.label && (
        <span className={cn("ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline", getLabelColorClass(item.labelColor))}>
          {item.label}
        </span>
      )}
    </span>
  );
}
