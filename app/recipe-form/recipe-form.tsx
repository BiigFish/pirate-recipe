'use client';

import React, { useState } from 'react'
import { Database, Ingredient } from '../database.types';
import CompInput from './input';
import MultiInput from './multi-input';
import MultiComplexInput from './multi-complex-input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const RecipeForm = () => {
    type Recipe = Database['public']['Tables']['recipes']['Row'];
    const supabase = createClientComponentClient<Database>()


    const initialRecipeData: Recipe = {
        active_cook_time: null,
        created_at: '',
        description: null,
        id: Math.floor(Math.random() * 1000000000),
        ingredients: [{ amount: '', ingredient: '' }],
        instructions: [''],
        name: '',
        notes: [],
        passive_cook_time: null,
        yield: null,
      };

      const [recipeData, setRecipeData] = useState(initialRecipeData);

      const handleInputChange = (
        name: string, value: string | string[] | Ingredient[]
      ) => {
        setRecipeData({ ...recipeData, [name]: value });
      };

      const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
          recipeData.created_at = new Date().toISOString();
            const { error } = await supabase.from('recipes').upsert(recipeData);
            if (error) throw error
          setRecipeData(initialRecipeData);
        } catch (error) {
          alert('Error updating the data!')
          console.log(error)
        }
        
      };
    
      return (
        <form onSubmit={handleFormSubmit}>
          <CompInput label="Name" name='name' value={recipeData.name || ''} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
            <CompInput label="Description" name='description' value={recipeData.description || ''} onChange={(e) => handleInputChange(e.target.name, e.target.value)} textArea/>
            <CompInput label="Yield" name='yield' value={recipeData.yield || ''} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
            <CompInput label="Active Cook Time" name='active_cook_time' value={recipeData.active_cook_time || ''} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
            <CompInput label="Passive Cook Time" name='passive_cook_time' value={recipeData.passive_cook_time || ''} onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
            <MultiInput label='Instructions' values={recipeData.instructions || []} setValues={(values) => handleInputChange('instructions', values)} />

            <MultiComplexInput label='Ingredients' values={recipeData.ingredients || []} setValues={(values) => handleInputChange('ingredients', values)} />

          <button type="submit">Create Recipe</button>
        </form>
      );
}

export default RecipeForm