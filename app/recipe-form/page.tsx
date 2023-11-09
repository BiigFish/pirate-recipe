import React, { cache } from "react";
import RecipeForm from "./recipe-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Recipe } from "../database.types";
import Link from "next/link";
import CompButton from "@/assets/button";
import { cookies } from "next/headers";

const serverSupabaseCookies = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

const RecipeFormPage = async ({
  searchParams,
}: {
  searchParams: { recipeId: string };
}) => {
  const supabase = serverSupabaseCookies();

  const fetchRecipe = async () => {
    const { data, error: recipeError } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", searchParams.recipeId);
    if (recipeError) {
      alert("Error loading recipe!");
    }
    if (!data || !data[0]) {
      alert("Recipe not found!");
      return undefined;
    }
    return data[0] as Recipe;
  };

  let recipeData: Recipe | undefined = undefined;
  if (searchParams.recipeId) {
    recipeData = await fetchRecipe();
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <Link href={recipeData ? `/${searchParams.recipeId}` : "/"}>
        <CompButton>Go Back</CompButton>
      </Link>
      <h1 className="text-2xl font-bold my-2">Recipe Form Page</h1>
      <RecipeForm editRecipe={recipeData} session={session} />
    </>
  );
};

export default RecipeFormPage;
