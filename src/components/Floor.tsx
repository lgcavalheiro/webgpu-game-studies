import { useRef } from "react";
import Hero from "./Hero";
import { TileTypes, CELL_SIZE } from "../core/constants";
import { Rect } from "react-konva";

interface FloorProps {
    x: number;
    y: number;
    cell: TileTypes;
}

export default function Floor({ x, y, cell }: FloorProps) {
    const rectRef = useRef(null);

    const color = cell === TileTypes.Door ? "red" : "black";

    return (
        <>
            {cell === TileTypes.Player && <Hero x={x} y={y} />}
            <Rect
                fill={color} 
                ref={rectRef} 
                width={CELL_SIZE}
                height={CELL_SIZE}
                x={x}
                y={y}
            />
        </>
    );
}