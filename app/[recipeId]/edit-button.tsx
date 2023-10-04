"use client";
import CompButton from "@/assets/button";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import React from "react";

interface Props {
  recipeId: string;
  authorId: string;
}

const EditButton: React.FC<Props> = ({ recipeId, authorId }) => {
  const userId = useUserData()?.id;

  if (userId !== authorId) return null;

  return (
    <Link href={`/recipe-form/?recipeId=${recipeId}`}>
      <CompButton>Edit Recipe</CompButton>
    </Link>
  );
};

export default EditButton;
