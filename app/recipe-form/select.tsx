import React from "react";

interface Props {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const CompSelect: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  options,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <br />
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-md w-full px-1 py-px"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompSelect;
