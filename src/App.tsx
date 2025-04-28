import {  useEffect, useMemo } from "react";
import Form from "./components/Form";

import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { useActivity } from "./hooks/useActivity";

function App() {
  
  const {state, dispatch,} = useActivity();
  const {activities} = state;
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities])
  const restarApp = () => useMemo(() => state.activities.length > 0, [state.activities])
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-center text-2xl font-bold text-white bg-blue-500 p-3 rounded-lg mb-1 ">
            Calorie Tracker
          </h1>
         
          <button disabled={!restarApp()}
           className="text-lg font-bold text-white bg-gray-800 hover:bg-gray-700 
           transition-all p-3 rounded-lg mb-1 disabled:opacity-10" onClick={() => dispatch({type:"restart-app"})}>Restart App</button>
        </div>
        <section className="bg-lime-500 py-20 px-5">
          <div className="max-w-4xl mx-auto">
            <Form  
            dispatch={dispatch}
            state={state}
            />
          </div>
        </section>
      </header>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker activities={activities}/>
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl  mt-8">
        <ActivityList 

        />
      </section>
    </>
  );
}

export default App;
