import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import ReducerMain from "./pages/ReducerMain";
import ZustandMain from "./pages/ZustandMain";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [mode, setMode] = useState("main");
  const queryClient = new QueryClient();
  return (
    <div className="App">
      {/* <button
        onClick={() => {
          if (mode === "main") {
            setMode("reducer");
            return;
          }
          setMode("main");
        }}
      >
        {mode}
      </button>
      {mode === "main" ? <Main /> : <ReducerMain />} */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ZustandMain />
      </QueryClientProvider>
    </div>
  );
}

export default App;
