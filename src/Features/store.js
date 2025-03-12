import { configureStore } from "@reduxjs/toolkit";
import { exclusiveApi } from "./Api/exclusiveApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [exclusiveApi.reducerPath]: exclusiveApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exclusiveApi.middleware),
});
