import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import { categories } from "../data/categories";

import type { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
} 

const initialState = {
  category: 1,
  name: "",
  calories: 0,
}

function Form({dispatch}:FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  const handleChange = (e : ChangeEvent<HTMLSelectElement> |  ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ["category", "calories"].includes(e.target.id)
   
    setActivity({
        ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    });

    
  
  };

  const isValidActivity = () => {
    const {name, calories} = activity

    return name.trim() !== "" && calories > 0
  }

  const handleSubmit = (e :FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: "save-activity", payload:{newActivity: activity}})
    setActivity(initialState)
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Cetegory:
        </label>
        <select
          className="border-slate-300 p-2 rounded-lg w-full bg-white border"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Activities:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Meal, Orange Juice, Salad, Weights, Bycicles"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calories:
        </label>
        <input
          id="calories"
          value={activity.calories}
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder=" Calories. Ej. 100 or 200, 300"
          onChange={handleChange}
        />

        <input
          type="submit"
          className="bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase text-white font-bold cursor- disabled:opacity-10"
          value={activity.category === 1 ? "Save Meal" : "Save Training"}
          disabled={!isValidActivity()}
        />
      </div>
    </form>
  );
}

export default Form;
