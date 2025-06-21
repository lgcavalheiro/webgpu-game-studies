import { useRoutes } from "react-router";
import { Stage } from "react-konva";
import Game from "./views/Game";
import Home from "./views/Home";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stage style={{ backgroundColor: "#1099bb" }} width={window.innerWidth} height={window.innerHeight}>
      {children}
    </Stage>
  );
}

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
];

const AppRoutes = () => {
  const element = useRoutes(
    routes.map((route) => ({
      ...route,
      element: <Layout>{route.element}</Layout>,
    }))
  );

  return element;
};

export default AppRoutes;