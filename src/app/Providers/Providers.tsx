import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import { store } from "../store";
import { queryClient } from "../queryClient";
import ThemeSync from "../ThemeSync";
import AuthInitializer from "./AuthInitializer";
import { setupInterceptors } from "../../services";

setupInterceptors();

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeSync />
        <AuthInitializer>{children}</AuthInitializer>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
