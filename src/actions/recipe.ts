'use server';

import prisma from '@/utils/prisma';
import { error } from 'console';

export async function getRecipes() {
   try {
      const recipes = await prisma.recipe.findMany({
         include: {
            ingredients: {
               include: {
                  ingredient: true,
               },
            },
         },
      });

      return { success: true, recipes };
   } catch (error) {
      console.error('Ошибка получения рецептов', error);
      return { error: 'Ошибка при получении рецептов' };
   }
}
// https://eda.ru/images/RecipePhoto/1280x960/azu-po-tatarski_21751_photo_82797.jpg
export async function createRecipe(formData: FormData) {
   try {
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const imageUrl = formData.get('imageUrl') as string;
      console.log(Array.from(formData.entries()), 'formData.entries()');
      const ingredients = Array.from(formData.entries())
         .filter(([key]) => key.startsWith('ingredient_'))
         .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: parseFloat(
               formData.get(`quantity_${key.split('_')[1]}`) as string
            ),
         }));

      if (!name || ingredients.length === 0) {
         console.log(name, ingredients.length);
         console.log('как он сюда попал????????????????');
         return {
            success: false,
            error: 'Имя и хотя бы один ингредиент обязательны',
         };
      }
      const recipe = await prisma.recipe.create({
         data: {
            name,
            description,
            imageUrl,
            ingredients: {
               create: ingredients.map(({ ingredientId, quantity }) => ({
                  ingredient: { connect: { id: ingredientId } },
                  quantity,
               })),
            },
         },
         include: {
            ingredients: {
               include: {
                  ingredient: true,
               },
            },
         },
      });
      return { success: true, recipe };
   } catch (error) {
      console.error('Ошибка создания рецепта', error);
      return { error: 'Ошибка при создании рецепта' };
   }
}

export async function updateRecipe(id: string, formData: FormData) {
   try {
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const imageUrl = formData.get('imageUrl') as string;
      const ingredients = Array.from(formData.entries())
         .filter(([key]) => key.startsWith('ingredient_'))
         .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: parseFloat(
               formData.get(`quantity_${key.split('_')[1]}`) as string
            ),
         }));

      if (!name || ingredients.length === 0) {
         return {
            success: false,
            error: 'Имя и хотя бы один ингредиент обязательны',
         };
      }
      const recipe = await prisma.recipe.update({
         where: { id },
         data: {
            name,
            description,
            imageUrl,
            ingredients: {
               deleteMany: {},
               create: ingredients.map(({ ingredientId, quantity }) => ({
                  ingredient: { connect: { id: ingredientId } },
                  quantity,
               })),
            },
         },
         include: {
            ingredients: {
               include: {
                  ingredient: true,
               },
            },
         },
      });

      return { success: true, recipe };
   } catch (error) {
      console.error('Ошибка обновления рецепта', error);
      return { error: 'Ошибка при обновлении рецепта' };
   }
}

export async function deleteRecipe(id: string) {
   try {
      await prisma.recipeIngredient.deleteMany({
         where: {
            recipeId: id,
         },
      });
      await prisma.recipe.delete({
         where: { id },
      });
      return { success: true };
   } catch (error) {
      console.error('Ошибка удаления рецепта', error);
      return { error: 'Ошибка при удалении рецепта' };
   }
}
