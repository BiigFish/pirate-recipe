'use client';

import React from 'react';

interface Ingredient {
    amount: string;
    ingredient: string;
  }

interface Props {
    label?: string;
    values: Ingredient[];
    setValues: (v: Ingredient[]) => void;
}

const MultiComplexInput: React.FC<Props> = ({label, values, setValues}) => {
       
      const handleRemoveValue = (index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        setValues(newValues);
      };
    
      const handleValueChange = (index: number, field: keyof Ingredient, value: string) => {
        const newValues = [...values];
        newValues[index][field] = value;

        if (index === newValues.length - 1) {
            newValues.push({ amount: '', ingredient: '' });
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
            <div className='flex gap-x-2'>
          <input
            type="text"
            value={value.amount}
            onChange={(e) => handleValueChange(index, 'amount', e.target.value)}
          />
          <input
            type="text"
            value={value.ingredient}
            onChange={(e) => handleValueChange(index, 'ingredient', e.target.value)}
          />
          </div>
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

export default MultiComplexInput;