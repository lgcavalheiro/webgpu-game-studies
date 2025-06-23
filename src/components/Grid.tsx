import TileManager from "./TileManager";
import { CELL_SIZE } from "../core/constants";
import { useGameplayContext } from "../context/GameplayContext";
import { Group } from "react-konva";

export default function Grid() {
    const { grid } = useGameplayContext();

    return (
        <Group>
            {grid.map((row, y) =>
                row.map((cell, x) => <TileManager cell={cell} key={`${x}-${y}`} x={x * CELL_SIZE} y={y * CELL_SIZE} />)
            )}
        </Group>
    );
}