import { cn } from "@/lib/utils";

/**
 * Reusable Select dropdown that visually matches the Input component.
 * Supports an optional left icon, label, and a description under each option.
 */
export function Select({
  id,
  label,
  icon: Icon,
  options = [],
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
        <select
          id={id}
          name={id}
          className={cn(
            "block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 border dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors appearance-none bg-white cursor-pointer",
            Icon ? "pl-10" : ""
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom chevron arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
