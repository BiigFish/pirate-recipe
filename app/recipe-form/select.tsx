import React from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const CompSelect: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  options,
  ...props
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <br />
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border rounded-md w-full px-2 py-px capitalize"
        {...props}
      >
        {options.map((option) => (
          <option className="capitalize" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompSelect;
