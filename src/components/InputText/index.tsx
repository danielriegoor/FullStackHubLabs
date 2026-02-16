import clsx from "clsx";
import { useId } from "react";

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<"input">;

export function InputText({ labelText = "", ...props }: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className="text-sm" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          "bg-white outline-0",
          "ring-2 ring-slate-400 rounded-xl",
          "py-2 px-2 transition focus:ring-blue-600",
          "placeholder:text-slate-400",
          "disabled:bg-slate-300 opacity-50",
          "disabled:text-red-500",
          "disabled:placeholder:text-slate-700",
          "disabled:cursor-not-allowed",
          "read-only:bg-amber-300 opacity-50",
          "read-only:text-red-500",
          "read-only:placeholder:text-slate-700",
          "read-only:cursor-progress",
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
