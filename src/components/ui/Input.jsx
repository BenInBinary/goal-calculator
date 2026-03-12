import { cn } from "@/lib/utils";

export function Input({
  id,
  label,
  icon: Icon,
  type = "text",
  className,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          id={id}
          name={id}
          type={type}
          className={cn(
            "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 border dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors",
            Icon ? "pl-10" : "",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
