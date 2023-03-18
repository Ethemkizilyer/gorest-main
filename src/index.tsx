import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";

import { CssBaseline } from "@mui/material";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

export const TokenContext = createContext<IContext>({
  token: "",
  setToken: () => {},
});

interface IContext {
  token: string | undefined;
  setToken: (t: string) => void;
}

const Main = () => {
  const [token, setToken] = useState<string>();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TokenContext.Provider value={{ token, setToken }}>
          <CssBaseline />
          <App />
        </TokenContext.Provider>
      </PersistGate>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Main />);
