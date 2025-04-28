import {  createContext, Dispatch, ReactNode, useReducer, useMemo } from "react";
import { activityReducer, initialState, ActivityState, ActivityActions } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";

type ActivityProviderProps = {
    children: ReactNode
}
type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    consumedCalories: number
    caloriesBurned: number
    caloriesDiference: number
    categoryName: (category: Activity["category"]) => string[]
    isEmptyActivity: boolean
}
// Utilizamos el null! para decirle a ts que el type que utilizamos es seguro
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

export const ActivityProvider = ({children}:ActivityProviderProps) => {

    //Contador
    const [state, dispatch] = useReducer(activityReducer, initialState)
    const consumedCalories = useMemo(() =>state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total,0),[state.activities]);
    const caloriesBurned = useMemo(() =>state.activities.reduce((total, activity) =>  activity.category === 2 ? total + activity.calories : total,0),[state.activities]);
    const caloriesDiference = useMemo(() => consumedCalories - caloriesBurned, [state.activities] )
    
    const categoryName = useMemo(() => (category: Activity["category"]) => categories.map((cat) => (cat.id === category ? cat.name : "")),[state.activities]);
  
    const isEmptyActivity = useMemo(() => state.activities.length === 0, [state.activities]);
    return(

        <ActivityContext.Provider value={{
            state,
            dispatch,
            consumedCalories,
            caloriesBurned,
            caloriesDiference,
            categoryName,
            isEmptyActivity
        }}>
            {children}
        </ActivityContext.Provider>
    )
}
