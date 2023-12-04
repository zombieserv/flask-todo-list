import React from 'react';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({label, checked, onChange}) => {
    return (
        <div className="mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="mr-2 leading-tight"
                />
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
