import { configureStore } from "@reduxjs/toolkit";
import notesReducers from "./slices/notesSlice";

export const store = configureStore({
    reducer: {
      notes: notesReducers
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch