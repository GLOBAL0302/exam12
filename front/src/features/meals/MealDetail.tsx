import Box from "@mui/material/Box";
import { useAppSelector } from "../../app/hooks";
import { selectMeals } from "./mealSlice";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../GlobalConstant";

const MealDetail = () => {
    const {mealId} = useParams()
    const meal = (useAppSelector(selectMeals).filter(item =>item._id === mealId))[0]

      let image;
      if (meal.image) {
        image = apiUrl + '/' + meal.image;
      }
  return (
    <div>
      <Box component="div" className="gap-3">
        <Box component="div" className="flex justify-center">
          <img className="w-40 " src={image} alt={meal.title} />
        </Box>
        <Box component="div">
          <p className="font-extrabold underline text-1xl capitalize">{meal.title}</p>
          <p className="uppercase font-extrabold text-xs">recipe</p>
          <p className="text-slate-700 text-xs">{meal.recipe}</p>
        </Box>
        <Box component="div">
          <p>comments</p>
        </Box>
      </Box>
    </div>
  );
};

export default MealDetail;
