import clsx from "clsx";

type ButttonVariants = "default" | "ghost" | "danger" | "upload";
type ButtonSizes = "sm" | "md" | "lg" | "upld";

type ButtonProps = {
  variant?: ButttonVariants;
  size?: ButtonSizes;
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButttonVariants, string> = {
    default: clsx("bg-blue-600 text-blue-100 hover:bg-blue-700 font-semibold"),
    ghost: clsx("bg-slate-200 text-slate-900 hover:bg-slate-300 font-semibold"),
    danger: clsx("bg-red-600 text-red-100 hover:bg-red-700 font-semibold"),
    upload: clsx(
      "bg-purple-900 text-amber-100 hover:bg-purple-950 font-semibold",
    ),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      "text-xs/tight",
      "py-1",
      "px-2",
      "rounded-sm",
      "[&_svg]:w-4 [&_svg]:h-4] gap-1",
    ),
    md: clsx(
      "text-base/tight",
      "py-2",
      "px-10",
      "rounded-md",
      "[&_svg]:w-5 [&_svg]:h-5] gap-2",
    ),
    lg: clsx(
      "text-lg/tight",
      "py-4",
      "px-6",
      "rounded-lg",
      "[&_svg]:w-6 [&_svg]:h-6] gap-3",
    ),
    upld: clsx(
      "text-lg/tight",
      "py-2",
      "px-4",
      "rounded-md",
      "[&_svg]:w-4 [&_svg]:h-4] gap-2",
    ),
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[size],
    "flex",
    "items-center",
    "justify-center",
    "cursor-pointer",
    "transition",
    "duration-200",
    "disabled:opacity-60",
    "disabled:bg-slate-200",
    "disabled:text-slate-400",
    "disabled:cursor-not-allowed",
    "focus:outline-none",
    props.className,
  );

  return <button {...props} className={buttonClasses} />;
}
