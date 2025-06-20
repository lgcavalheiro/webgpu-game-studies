import Grid from "./components/Grid";
import { Stage } from "react-konva";

function Layout() {
  return (
    <Stage style={{ backgroundColor: "#1099bb" }} width={window.innerWidth} height={window.innerHeight}>
      <Grid />
    </Stage>
  );
}

export default function App() {
  return <Layout />;
}
