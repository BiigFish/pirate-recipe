import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { Database, Recipe } from "../database.types";
import Link from "next/link";
import CompButton from "@/assets/button";

const RecipePage = async ({ params }: { params: { recipeId: string } }) => {
  const supabase = createClientComponentClient<Database>();
  const { data, error: recipeError } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", params.recipeId);
  if (recipeError) {
    alert("Error loading recipe!");
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  const recipeData: Recipe | undefined = data ? data[0] : undefined;
  if (!recipeData) {
    return <div>Recipe not found!</div>;
  }
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Link href="/">
          <CompButton>Go Back</CompButton>
        </Link>
        {userId === recipeData.author_id && (
          <Link href={`/recipe-form/?recipeId=${params.recipeId}`}>
            <CompButton>Edit Recipe</CompButton>
          </Link>
        )}
      </div>
      <h1 className="text-3xl font-bold">{recipeData.name}</h1>
      <p className="my-4">{recipeData.description}</p>
      <div className="border border-black p-2.5 space-y-2">
        {recipeData.yield && <p className="">YIELD: {recipeData.yield}</p>}
        <div className="text-center flex gap-x-4 mx-auto w-fit">
          <div>
            <p className="text-gray-500">COOK TIME</p>
            <p>
              {recipeData.active_cook_time ? recipeData.active_cook_time : "-"}
            </p>
          </div>
          <div className="h-auto border-r-2 border-slate-400" />
          <div>
            <p className="text-gray-500">PASSIVE TIME</p>
            <p>
              {recipeData.passive_cook_time
                ? recipeData.passive_cook_time
                : "-"}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Ingredients</h2>
        {recipeData.ingredients && recipeData.ingredients.length > 0 && (
          <table className="table-auto">
            <tbody>
              {recipeData.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="pr-8">{ingredient.amount}</td>
                  <td> {ingredient.ingredient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h2 className="text-2xl font-bold">Instructions</h2>
        {recipeData.instructions && recipeData.instructions.length > 0 && (
          <ol className="list-decimal list-inside">
            {recipeData.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        )}
        {recipeData.notes && recipeData.notes.length > 0 && (
          <>
            <h2 className="text-2xl font-bold">Notes</h2>
            <ol className="list-decimal list-inside">
              {recipeData.notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
