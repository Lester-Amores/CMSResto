import React from 'react';
import { cn } from "@/admin/lib/utils";

// SelectItem component
interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

export const SelectItem = ({ children, ...props }: SelectItemProps) => {
  return (
    <option {...props}>
      {children}
    </option>
  );
};

// SelectDropDown component
interface SelectDropDownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

export const SelectDropDown = ({
  children,
  placeholder,
  className = '',
  ...props
}: SelectDropDownProps) => {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          `block w-full px-3 py-2 bg-white text-gray-900 placeholder-gray-400
           dark:bg-gray-600 dark:text-white dark:placeholder-gray-300 border border-gray-300
           rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`,
          className
        )}
        {...props}
      >
        {placeholder && <option className="text-gray-500" value="">{placeholder}</option>}
        {children} 
      </select>
    </div>
  );
};
