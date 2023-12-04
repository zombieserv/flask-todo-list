import React from 'react';

interface SelectDropdown {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectDropdown: React.FC<SelectDropdown> = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-gray-700 text-sm font-bold mb-2">
        {label}:
      </label>
      <select
        id={label}
        onChange={onChange}
        value={value}
        className="mb-5 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
