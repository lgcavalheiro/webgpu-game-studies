import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Coords } from "../interfaces/common";
import { pixelToCellIndex } from "../core/utils";
import { CELL_SIZE, TileTypes } from "../core/constants";

interface IGameplayContext {
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
    grid: number[][];
    setGrid: Dispatch<SetStateAction<number[][]>>;
    heroPosition: Coords;
    setHeroPosition: Dispatch<SetStateAction<Coords>>;
    floor: number;
    setFloor: Dispatch<SetStateAction<number>>;
    isBlocked: (x: number, y: number) => boolean;
}

const GameplayContext = createContext<IGameplayContext | undefined>(undefined);

export default function GameplayProvider({ children }: { children: React.ReactNode }) {
    const [grid, setGrid] = useState<number[][]>([]);
    const [heroPosition, setHeroPosition] = useState<Coords>({ x: 0, y: 0 });
    const [floor, setFloor] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);

    const isBlocked = (x: number, y: number): boolean => {
        const gridX = Math.round(x / CELL_SIZE);
        const gridY = Math.round(y / CELL_SIZE);

        if (gridY < 0 || gridY >= grid.length || gridX < 0 || gridX >= grid[0]?.length) {
            return true; // Out of bounds is considered blocked
        }

        return ![TileTypes.Floor, TileTypes.Player, TileTypes.Door].includes(grid[gridY][gridX]);
    };

    useEffect(() => {
        if (!grid.length) return;
        const { x, y } = pixelToCellIndex(heroPosition);
        if (grid[y][x] === TileTypes.Door) {
            console.log("DOOR FOUND!")
        }
    }, [heroPosition])

    const value = {
        grid,
        setGrid,
        heroPosition,
        setHeroPosition,
        floor,
        setFloor,
        playing,
        setPlaying,
        isBlocked,
    }

    return (
        <GameplayContext.Provider value={value}>
            {children}
        </GameplayContext.Provider>
    );
}

export function useGameplayContext() {
    const context = useContext(GameplayContext);
    if (!context) {
        throw new Error("useGameplayContext must be used within a GameplayProvider");
    }
    return context;
}