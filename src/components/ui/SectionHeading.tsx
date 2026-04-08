import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <div className={cn("flex items-center gap-2 mb-4", align === "center" && "justify-center")}>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" />
          <p className="text-xs font-semibold tracking-widest uppercase text-gradient">
            {label}
          </p>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-white/45 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
