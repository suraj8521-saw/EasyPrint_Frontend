import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./app/Store";
import AppRoutes from "./routes/AppRoutes";

import "./index.css";
import ThemeSync from "./app/ThemeSync";

function App() {
  return (
    <Provider store={store}>
      <ThemeSync />
      <AppRoutes />
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);