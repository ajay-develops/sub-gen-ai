import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({
  label,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <BlurFade inView className={cn("space-y-3", className)}>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary">
        {label}
      </p>
      <AnimatedShinyText className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </AnimatedShinyText>
      {description && (
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      )}
    </BlurFade>
  );
}
