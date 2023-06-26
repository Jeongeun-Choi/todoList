import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import ReducerMain from "./pages/ReducerMain";

function App() {
  const [mode, setMode] = useState("main");
  return (
    <div className="App">
      <button
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
      {mode === "main" ? <Main /> : <ReducerMain />}
    </div>
  );
}

export default App;
