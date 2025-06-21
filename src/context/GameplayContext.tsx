import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Coords } from "../interfaces/common";
import { pixelToCellIndex } from "../core/utils";
import { CELL_SIZE, MIN_DIMENSION, TileTypes } from "../core/constants";
import { generateOrganicGrid } from "../core/gridGeneration";

interface IGameplayContext {
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
    grid: number[][];
    heroPosition: Coords;
    setHeroPosition: Dispatch<SetStateAction<Coords>>;
    floor: number;
    isBlocked: (x: number, y: number) => boolean;
    goDeeper: () => void;
    atDoor: boolean;
    floorModifier: number;
}

const GameplayContext = createContext<IGameplayContext | undefined>(undefined);

export default function GameplayProvider({ children }: { children: React.ReactNode }) {
    const [grid, setGrid] = useState<number[][]>([]);
    const [heroPosition, setHeroPosition] = useState<Coords>({ x: 0, y: 0 });
    const [floor, setFloor] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [atDoor, setAtDoor] = useState<boolean>(false);
    const [floorModifier, setFloorModifier] = useState<number>(parseFloat((floor / 25).toFixed(2)));

    const isBlocked = (x: number, y: number): boolean => {
        const gridX = Math.round(x / CELL_SIZE);
        const gridY = Math.round(y / CELL_SIZE);

        if (gridY < 0 || gridY >= grid.length || gridX < 0 || gridX >= grid[0]?.length) {
            return true; // Out of bounds is considered blocked
        }

        return ![TileTypes.Floor, TileTypes.Player, TileTypes.Door].includes(grid[gridY][gridX]);
    };

    const rebuildGrid = () => {
        const maxGridWidth = Math.floor((window.innerWidth * floorModifier) / CELL_SIZE) + floor;
        const maxGridHeight = Math.floor((window.innerHeight * floorModifier) / CELL_SIZE) + floor;
        const width = Math.max(MIN_DIMENSION, Math.floor(Math.random() * (maxGridWidth + MIN_DIMENSION)));
        const height = Math.max(MIN_DIMENSION, Math.floor(Math.random() * (maxGridHeight + MIN_DIMENSION)));
        const roomModifier = Math.ceil(floorModifier * 5)
        const newGrid = generateOrganicGrid(width, height, roomModifier); // TODO: fix hero positioning not updating sometimes on grid rebuild
        setGrid(newGrid);
    }

    const goDeeper = () => {
        setFloor(prev => { 
            const newFloor = prev + 1;
            setFloorModifier(parseFloat((newFloor / 25).toFixed(2)));
            return newFloor;
        });
        rebuildGrid();
    }

    useEffect(() => {
        rebuildGrid();
    }, []);

    useEffect(() => {
        if (!grid.length) return;
        const { x, y } = pixelToCellIndex(heroPosition);
        setAtDoor(grid[y][x] === TileTypes.Door);
    }, [heroPosition])

    const value = {
        grid,
        heroPosition,
        setHeroPosition,
        floor,
        playing,
        setPlaying,
        isBlocked,
        goDeeper,
        atDoor,
        floorModifier,
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