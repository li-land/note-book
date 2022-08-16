import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.scss";
import AppRouter from "./components/AppRouter";
import { store } from "./store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />;
      </BrowserRouter>
    </Provider>
  );
};

export default App;
