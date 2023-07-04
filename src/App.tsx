import { createContext } from "react";
import { Outlet } from "react-router-dom";
export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: (loadingState: boolean) => {},
});

function App() {
  return (
    <div className="App">
      <div className="content container mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
