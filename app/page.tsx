import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./database.types";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";

const Home = async () => {
  config.autoAddCss = false;
  const supabase = createClientComponentClient<Database>();

  const { data, error } = await supabase.from("recipes").select("name, id");

  if (error) {
    alert("Error loading recipes!");
  }

  // console.log(data);

  return (
    <>
      {data && (
        <ul>
          {data.map((recipe, index) => (
            <Link key={index} href={recipe.id.toString()}>
              <li>{recipe.name}</li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
