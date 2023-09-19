import React from "react";

interface Props {
  label?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  textArea?: boolean;
}

const CompInput: React.FC<Props> = ({
  label,
  name,
  value,
  onChange,
  textArea = false,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <br />
      {textArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className="border rounded-md w-full px-1 py-px"
          rows={3}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="border rounded-md w-full px-1 py-px"
        />
      )}
    </div>
  );
};

export default CompInput;
