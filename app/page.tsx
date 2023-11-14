import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";
import Link from "next/link";
import { cookies } from "next/headers";
import { cache } from "react";

const Home = async () => {
  const serverSupabaseCookies = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient<Database>({
      cookies: () => cookieStore,
    });
  });
  const supabase = serverSupabaseCookies();

  const { data, error } = await supabase
    .from("recipes")
    .select("name, id, category");

  if (error) {
    alert("Error loading recipes!");
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const uniqueValues: Set<string> = new Set<string>();
  data.forEach((recipe) => {
    if (recipe.category) {
      uniqueValues.add(recipe.category);
    }
  });

  return (
    <div className="space-y-4">
      {data &&
        Array.from(uniqueValues).map((category: string) => (
          <fieldset
            key={category}
            className="border border-black rounded-lg px-4"
          >
            <legend className=" capitalize font-bold">{category}</legend>
            <ul className="space-y-2">
              {data
                .filter((d) => d.category === category)
                .map((recipe, index) => (
                  <Link
                    key={index}
                    href={recipe.id.toString()}
                    className="w-fit block"
                  >
                    <li>{recipe.name}</li>
                  </Link>
                ))}
            </ul>
          </fieldset>
        ))}
    </div>
  );
};

export default Home;
