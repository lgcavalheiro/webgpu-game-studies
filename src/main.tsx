import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import GameplayProvider from "./context/GameplayContext.tsx";

const container = document.getElementById("pixi-container");
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <GameplayProvider>
      <App />
    </GameplayProvider>
  </BrowserRouter>
);
