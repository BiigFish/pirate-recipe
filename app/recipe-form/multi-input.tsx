'use client';

import React from 'react';

interface Props {
    label?: string;
    values: string[];
    setValues: (v: string[]) => void;
}

const MultiInput: React.FC<Props> = ({label, values, setValues}) => {
       
      const handleRemoveValue = (index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        setValues(newValues);
      };
    
      const handleValueChange = (index: number, value: string) => {
        const newValues = [...values];
        newValues[index] = value;

        if (index === newValues.length - 1) {
          newValues.push('');
        }
        setValues(newValues);
      };
    
      const handleMoveValue = (index: number, direction: 'up' | 'down') => {
        const newValues = [...values];
        const currentIndex = index;
        const newIndex = direction === 'up' ? index - 1 : index + 1;
    
        if (newIndex >= 0 && newIndex < newValues.length) {
          const temp = newValues[currentIndex];
          newValues[currentIndex] = newValues[newIndex];
          newValues[newIndex] = temp;
          setValues(newValues);
        }
      };
    return (
        <div>
            <p>{label}</p>
             {values.map((value, index) => (
        <div key={index}>
            <p>input {index}</p>
          <input
            type="text"
            value={value}
            onChange={(e) => handleValueChange(index, e.target.value)}
          />
          {index < values.length - 1 && (
            <>
            <button type='button' onClick={() => handleRemoveValue(index)}>Remove</button>
            <button type='button' onClick={() => handleMoveValue(index, 'up')}>Up</button>
            <button type='button' onClick={() => handleMoveValue(index, 'down')}>Down</button>
            </>
          )}
        </div>
      ))}
        </div>
    );
};

export default MultiInput;