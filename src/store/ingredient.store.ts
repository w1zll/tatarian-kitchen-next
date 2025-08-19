import {
   createIngredient,
   deleteIngredient,
   getIngredients,
} from '@/actions/ingredients';
import { IIngredient } from '@/types/ingredient';
import { create } from 'zustand';

interface IIngredientState {
   ingredients: IIngredient[];
   isLoading: boolean;
   error: string | null;
   loadIngredients: () => Promise<void>;
   addIngredient: (formData: FormData) => Promise<void>;
   removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IIngredientState>((set) => ({
   ingredients: [],
   isLoading: false,
   error: null,
   loadIngredients: async () => {
      set({ isLoading: true, error: null });
      try {
         const result = await getIngredients();

         if (result.success) {
            set({ ingredients: result.ingredients, isLoading: false });
         } else {
            set({ error: result.error, isLoading: false });
         }
      } catch (error) {
         console.error('Ошибка загрузки ингредиентов:', error);
         set({ error: 'Ошибка загрузки ингредиентов', isLoading: false });
      }
   },
   addIngredient: async (formData: FormData) => {
      set({ isLoading: true, error: null });

      try {
         const result = await createIngredient(formData);
         if (result.success) {
            set((state) => ({
               ingredients: [...state.ingredients, result.ingredient],
               isLoading: false,
            }));
         } else {
            set({ error: result.error, isLoading: false });
         }
      } catch (error) {
         console.error('Ошибка создания ингредиента:', error);
         set({ error: 'Ошибка при создании ингредиента', isLoading: false });
      }
   },
   removeIngredient: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
         const result = await deleteIngredient(id);
         if (result.success) {
            set((state) => ({
               ingredients: state.ingredients.filter((i) => i.id !== id),
               isLoading: false,
            }));
         } else {
            set({ error: result.error, isLoading: false });
         }
      } catch (error) {
         console.error('Ошибка удаления ингредиента:', error);
         set({ error: 'Ошибка при удалении ингредиента', isLoading: false });
      }
   },
}));
