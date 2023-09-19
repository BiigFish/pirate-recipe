import React from 'react';

interface Props {
    label?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textArea?: boolean
}

const CompInput: React.FC<Props> = ({label, name, value, onChange, textArea = false}) => {
    return (
        <div>
            {label && <label>{label}</label>}
            {textArea ? (<textarea name={name} value={value} onChange={onChange} />) : (
            <input name={name} value={value} onChange={onChange} />)}
        </div>
    );
};

export default CompInput;