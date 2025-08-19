import {
   createRecipe,
   deleteRecipe,
   getRecipes,
   updateRecipe,
} from '@/actions/recipe';
import { IRecipe } from '@/types/recipe';
import { create } from 'zustand';

interface IActionResult {
   success: boolean;
   recipe?: IRecipe;
   error?: string;
}

interface IRecipeState {
   recipes: IRecipe[];
   isLoading: boolean;
   error: string | null;
   loadRecipes: () => Promise<void>;
   addRecipe: (formData: FormData) => Promise<IActionResult>;
   updateRecipe: (id: string, formData: FormData) => Promise<IActionResult>;
   removeRecipe: (id: string) => Promise<void>;
}

export const useRecipeStore = create<IRecipeState>((set) => ({
   recipes: [],
   isLoading: false,
   error: null,
   loadRecipes: async () => {
      set({ isLoading: true, error: null });

      try {
         const result = await getRecipes();

         if (result.success) {
            set({ recipes: result.recipes, isLoading: false });
         } else {
            set({ error: result.error, isLoading: false });
         }
      } catch (error) {
         console.error('Ошибка загрузки рецептов:', error);
         set({ error: 'Ошибка загрузки рецептов', isLoading: false });
      }
   },
   addRecipe: async (formData: FormData) => {
      set({ error: null });

      try {
         const result = await createRecipe(formData);
         if (result.success) {
            set((state) => ({
               recipes: [...state.recipes, result.recipe!],
               isLoading: false,
            }));
            return { success: true, recipe: result.recipe };
         } else {
            set({ error: result.error, isLoading: false });
            return { success: false, error: result.error };
         }
      } catch (error) {
         console.error('Ошибка создания рецепта:', error);
         set({ error: 'Ошибка при создании рецепта', isLoading: false });
         return { success: false, error: 'Ошибка при создании рецепта' };
      }
   },
   updateRecipe: async (id: string, formData: FormData) => {
      set({ error: null });

      try {
         const result = await updateRecipe(id, formData);
         if (result.success) {
            set((state) => ({
               recipes: state.recipes.map((recipe) =>
                  recipe.id === id ? result.recipe! : recipe
               ),
               isLoading: false,
            }));
            return { success: true, recipe: result.recipe };
         } else {
            set({ error: result.error, isLoading: false });
            return { success: false, error: result.error };
         }
      } catch (error) {
         console.error('Ошибка обновления рецепта:', error);
         set({ error: 'Ошибка при обновлении рецепта', isLoading: false });
         return { success: false, error: 'Ошибка при обновлении рецепта' };
      }
   },
   removeRecipe: async (id: string) => {
      set({ error: null });

      try {
         const result = await deleteRecipe(id);

         if (result.success) {
            set((state) => ({
               recipes: state.recipes.filter((recipe) => recipe.id !== id),
               isLoading: false,
            }));
         } else {
            set({ error: result.error, isLoading: false });
         }
      } catch (error) {
         console.error('Ошибка удаления рецепта:', error);
         set({ error: 'Ошибка при удалении рецепта', isLoading: false });
      }
   },
}));
