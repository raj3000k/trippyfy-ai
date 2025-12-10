import { createContext, Dispatch, SetStateAction } from "react";

interface CreateTripContextType {
    tripData: any;
    setTripData: Dispatch<SetStateAction<any>>;
  }
  const defaultContextValue: CreateTripContextType = {
    tripData: [],
    setTripData: () => {}
  };
  export const CreateTripContext = createContext<CreateTripContextType>(defaultContextValue);
