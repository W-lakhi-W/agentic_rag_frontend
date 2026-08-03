import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  className = "",
  options = [],
  rows = 4,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const inputStyles = `
    w-full rounded-lg border border-gray-300
    px-4 py-2.5
    bg-white
    text-gray-900
    placeholder:text-gray-400
    focus:border-yellow-500
    focus:outline-none
    disabled:bg-gray-100
    disabled:cursor-not-allowed
    ${leftIcon ? "pl-10" : ""}
    ${rightIcon ? "pr-10" : ""}
    ${error ? "border-red-500" : ""}
  `;

  const renderField = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            rows={rows}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`${inputStyles} resize-none`}
            {...props}
          />
        );

      case "select":
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputStyles}
            {...props}
          >
            <option value="">Select...</option>

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputStyles}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {leftIcon}
          </div>
        )}

        {renderField()}

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;