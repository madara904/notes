import { createContext, useContext } from "react";


export const ContextChange = createContext(undefined)

export function useNotesContext() {
    const context = useContext(ContextChange);
    if (!context) {
        throw new Error ("context should be used within the context Provider")
      }
      return context;
}