import { configureStore } from "@reduxjs/toolkit";

import themeReducer from "../features/theme/themeSlice";
import sidebarReducer from "../ui/sidebar/state/sidebarSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    sidebar: sidebarReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
