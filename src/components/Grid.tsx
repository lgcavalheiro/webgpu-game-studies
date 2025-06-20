import { useEffect, useMemo } from "react";
import { generateOrganicGrid } from "../core/gridGeneration";
import TileManager from "./TileManager";
import { CELL_SIZE, MIN_DIMENSION } from "../core/constants";
import { useGameplayContext } from "../context/GameplayContext";
import { Layer } from "react-konva";



export default function Grid() {
    const { grid, setGrid } = useGameplayContext();

    const gridWidth = useMemo(() => grid[0]?.length || 0, [grid]) * CELL_SIZE;
    const gridHeight = useMemo(() => grid.length, [grid]) * CELL_SIZE;

    const gridX = useMemo(() => (window.innerWidth - gridWidth) / 2, [window.innerWidth, gridWidth]);
    const gridY = useMemo(() => (window.innerHeight - gridHeight) / 2, [window.innerHeight, gridHeight]);

    useEffect(() => {
        const maxGridWidth = Math.floor((window.innerWidth * 0.9) / CELL_SIZE);
        const maxGridHeight = Math.floor((window.innerHeight * 0.9) / CELL_SIZE);
        const width = Math.floor(Math.random() * (maxGridWidth - MIN_DIMENSION + 1) + MIN_DIMENSION);
        const height = Math.floor(Math.random() * (maxGridHeight - MIN_DIMENSION + 1) + MIN_DIMENSION);
        const newGrid = generateOrganicGrid(width, height);
        setGrid(newGrid);
    }, []);

    return (
        <Layer x={gridX} y={gridY}>
            {grid.map((row, y) =>
                row.map((cell, x) => <TileManager cell={cell} key={`${x}-${y}`} x={x * CELL_SIZE} y={y * CELL_SIZE} />)
            )}
        </Layer>
    );
}