import { createContext } from "react";

export const WorkoutContext = createContext({
  storedWorkoutData: {},
  setStoredWorkoutData: () => {},
});
