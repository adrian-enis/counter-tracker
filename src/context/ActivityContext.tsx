import { Children, createContext, Dispatch, ReactNode, useReducer } from "react";
import { activityReducer, initialState, ActivityState, ActivityActions } from "../reducers/activity-reducer";

type ActivityProviderProps = {
    children: ReactNode
}
type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
}
// Utilizamos el null! para decirle a ts que el type que utilizamos es seguro
export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

export const ActivityProvider = ({children}:ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState)
    return(

        <ActivityContext.Provider value={{
            state,
            dispatch
        }}>
            {children}
        </ActivityContext.Provider>
    )
}
