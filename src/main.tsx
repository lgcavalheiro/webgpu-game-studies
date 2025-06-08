import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import GameplayProvider from "./context/GameplayContext.tsx";

createRoot(document.getElementById("pixi-container")!).render(
    <GameplayProvider>
        <App />
    </GameplayProvider>
);
