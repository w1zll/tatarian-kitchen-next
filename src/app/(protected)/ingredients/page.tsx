import IngredientsTable from '@/components/UI/tabels/ingredients';
import IngredientForm from '@/forms/ingredient.form';

type Props = {};

const IngredientsPage = (props: Props) => {
   return (
      <div className="max-w-3xl mx-auto w-full px-4">
         <IngredientForm />
         <IngredientsTable />
      </div>
   );
};

export default IngredientsPage;
