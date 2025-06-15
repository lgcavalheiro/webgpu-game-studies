import { Route, Routes } from "react-router";
import Home from "./views/Home";
import Game from "./views/Game";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
        </Routes>
    );
}