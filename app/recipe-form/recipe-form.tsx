"use client";

import React, { useState } from "react";
import { Database, Ingredient, Recipe } from "../database.types";
import CompInput from "./input";
import MultiInput from "./multi-input";
import MultiComplexInput from "./multi-complex-input";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import CompButton from "@/assets/button";
import CompSelect from "./select";

const categoryOptions = [
  "breakfast",
  "meal",
  "snack",
  "dessert",
  "drink",
  "soup",
  "baking",
  "other",
];

interface Props {
  editRecipe?: Recipe;
  session: Session | null;
}

const RecipeForm: React.FC<Props> = ({ editRecipe, session }) => {
  const initialRecipeData: Recipe = editRecipe || {
    author_id: "",
    active_cook_time: null,
    category: null,
    created_at: "",
    description: null,
    id: Math.floor(Math.random() * 1000000000),
    ingredients: [{ amount: "", ingredient: "" }],
    instructions: [""],
    name: "",
    notes: [""],
    passive_cook_time: null,
    yield: null,
  };
  const [recipeData, setRecipeData] = useState<Recipe>(initialRecipeData);
  const supabase = createClientComponentClient<Database>();

  const handleInputChange = (
    name: string,
    value: string | string[] | Ingredient[]
  ) => {
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      alert("You must be logged in to create a recipe!");
      return;
    }
    if (editRecipe && session.user.id !== editRecipe.author_id) {
      alert("You are not authorized to edit this recipe!");
      return;
    }
    try {
      recipeData.author_id = session.user.id;
      recipeData.created_at = new Date().toISOString();
      if (recipeData.ingredients) recipeData.ingredients.pop();
      if (recipeData.instructions) recipeData.instructions.pop();
      if (recipeData.notes) recipeData.notes.pop();

      const { error } = await supabase.from("recipes").upsert(recipeData);
      if (error) throw error;
      setRecipeData(initialRecipeData);
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
      <h1 onClick={() => console.log("aa", session)}>help</h1>

      <CompInput
        label="Name"
        name="name"
        value={recipeData.name || ""}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <CompInput
        label="Description"
        name="description"
        value={recipeData.description || ""}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        textArea
      />
      <CompSelect
        label="Category"
        name="category"
        value={recipeData.category || ""}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        options={categoryOptions}
      />
      <MultiComplexInput
        label="Ingredients"
        values={recipeData.ingredients || []}
        setValues={(values) => handleInputChange("ingredients", values)}
      />
      <MultiInput
        label="Instructions"
        values={recipeData.instructions || []}
        setValues={(values) => handleInputChange("instructions", values)}
      />
      <CompInput
        label="Active Cook Time"
        name="active_cook_time"
        value={recipeData.active_cook_time || ""}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <CompInput
        label="Passive Cook Time"
        name="passive_cook_time"
        value={recipeData.passive_cook_time || ""}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <CompInput
        label="Yield"
        name="yield"
        value={recipeData.yield || ""}
        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
      />
      <MultiInput
        label="Notes"
        values={recipeData.notes || []}
        setValues={(values) => handleInputChange("notes", values)}
      />

      <CompButton type="submit" fullWidth>
        {editRecipe ? "Update Recipe" : "Create Recipe"}
      </CompButton>
    </form>
  );
};

export default RecipeForm;
