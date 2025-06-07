import { extend, useApplication } from "@pixi/react";
import { Container } from "pixi.js";
import { useEffect, useState, useMemo } from "react";
import { generateOrganicGrid } from "../core/gridGeneration";
import TileManager from "./TileManager";

extend({
    Container,
});

const CELL_SIZE = 32;

export default function Grid() {
    const { app } = useApplication();
    const [grid, setGrid] = useState<number[][]>([]);

    const gridWidth = useMemo(() => grid[0]?.length || 0, [grid]) * CELL_SIZE;
    const gridHeight = useMemo(() => grid.length, [grid]) * CELL_SIZE;

    const gridX = useMemo(() => (app.screen.width - gridWidth) / 2, [app.screen.width, gridWidth]);
    const gridY = useMemo(() => (app.screen.height - gridHeight) / 2, [app.screen.height, gridHeight]);

    useEffect(() => {
        const maxGridWidth = Math.floor((window.innerWidth * 0.9) / CELL_SIZE);
        const maxGridHeight = Math.floor((window.innerHeight * 0.9) / CELL_SIZE);
        const width = Math.floor(Math.random() * (maxGridWidth - 8 + 1) + 8);
        const height = Math.floor(Math.random() * (maxGridHeight - 8 + 1) + 8);
        const newGrid = generateOrganicGrid(width, height);
        setGrid(newGrid);
    }, []);

    return (
        <pixiContainer x={gridX} y={gridY}>
            {grid.map((row, y) =>
                row.map((cell, x) => <TileManager cell={cell} key={`${x}-${y}`} x={x * CELL_SIZE} y={y * CELL_SIZE} />)
            )}
        </pixiContainer>
    );
}