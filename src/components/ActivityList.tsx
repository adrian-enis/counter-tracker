import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { useActivity } from "../hooks/useActivity";


const ActivityList = () => {

  const {state, dispatch, isEmptyActivity, categoryName} = useActivity();

 
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Meals and Activities
      </h2>
     
     
      {isEmptyActivity ? <p className="text-white text-center mt-2 text-lg">There is still nothing
        </p> :
      state.activities.map((activity) => (
        <div
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between"
        >
          <div className=" space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
              }`}
            >
              {categoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {activity.calories} {""}
              <span>Calorias</span>
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              onClick={() =>
                dispatch({ type: "set-activeId", payload: { id: activity.id } })
              }
            >
              <PencilSquareIcon className="h-8 w-8 text-gray-800" />
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "delete-activity",
                  payload: { id: activity.id },
                })
              }
            >
              <XCircleIcon className="h-8 w-8 text-gray-800" />
            </button>
          </div>
        </div>
      ))}
    </> 
  );
};

export default ActivityList;
