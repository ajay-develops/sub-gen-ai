import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BrandLogoIconProps = {
  className?: string;
  variant?: "default" | "onPrimary";
};

export function BrandLogoIcon({
  className,
  variant = "default",
}: BrandLogoIconProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-bold",
        variant === "onPrimary"
          ? "bg-white text-primary"
          : "bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      S
    </span>
  );
}

type BrandLogoProps = {
  className?: string;
  iconClassName?: string;
  nameClassName?: string;
  showName?: boolean;
};

export function BrandLogo({
  className,
  iconClassName,
  nameClassName,
  showName = true,
}: BrandLogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <BrandLogoIcon className={cn("size-7 text-xs", iconClassName)} />
      {showName ? (
        <span className={cn("font-semibold text-foreground", nameClassName)}>
          {APP_NAME}
        </span>
      ) : null}
    </span>
  );
}
