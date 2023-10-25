export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Ingredient = {
  amount: string;
  ingredient: string;
};

export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      recipes: {
        Row: {
          author_id: string;
          active_cook_time: string | null;
          category: string | null;
          created_at: string;
          description: string | null;
          id: number;
          ingredients: Ingredient[] | null;
          instructions: string[] | null;
          name: string | null;
          notes: string[] | null;
          passive_cook_time: string | null;
          yield: string | null;
        };
        Insert: {
          author_id?: string;
          active_cook_time?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          ingredients?: Ingredient[] | null;
          instructions?: string[] | null;
          name?: string | null;
          notes?: string[] | null;
          passive_cook_time?: string | null;
          yield?: string | null;
        };
        Update: {
          author_id?: string;
          active_cook_time?: string | null;
          category?: string | null;
          created_at?: string;
          description?: string | null;
          id?: number;
          ingredients?: Ingredient[] | null;
          instructions?: string[] | null;
          name?: string | null;
          notes?: string[] | null;
          passive_cook_time?: string | null;
          yield?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
