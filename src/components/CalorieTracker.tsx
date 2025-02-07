import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};
export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const consumedCalories = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  
  const caloriesDiference = useMemo(() => consumedCalories - caloriesBurned, [activities] )

 
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10 bg-red-300">
       <CalorieDisplay calories={consumedCalories} text={"consumidas"}/>
       <CalorieDisplay calories={caloriesBurned} text={"Quemadas"}/>
       <CalorieDisplay calories={caloriesDiference} text={"Balance"}/>
 

      </div>
    </>
  );
}
