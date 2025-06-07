import { Application } from "@pixi/react";
import Grid from "./components/Grid";

export default function App() {
  return (
    <Application background={"#1099bb"} resizeTo={window}>
      <Grid />
    </Application>
  );
}
