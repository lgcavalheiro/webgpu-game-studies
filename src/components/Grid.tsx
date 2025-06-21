import { useMemo } from "react";
import TileManager from "./TileManager";
import { CELL_SIZE } from "../core/constants";
import { useGameplayContext } from "../context/GameplayContext";
import { Group } from "react-konva";

export default function Grid() {
    const { grid } = useGameplayContext();

    const gridWidth = useMemo(() => grid[0]?.length || 0, [grid]) * CELL_SIZE;
    const gridHeight = useMemo(() => grid.length, [grid]) * CELL_SIZE;

    const gridX = useMemo(() => (window.innerWidth - gridWidth) / 2, [window.innerWidth, gridWidth]);
    const gridY = useMemo(() => (window.innerHeight - gridHeight) / 2, [window.innerHeight, gridHeight]);

    return (
        <Group x={gridX} y={gridY}>
            {grid.map((row, y) =>
                row.map((cell, x) => <TileManager cell={cell} key={`${x}-${y}`} x={x * CELL_SIZE} y={y * CELL_SIZE} />)
            )}
        </Group>
    );
}