import React from "react";
import Floor from "./Floor";
import Wall from "./Wall";

const TILE_LITERALS: Record<number, React.FC<any>> = {
    0: Floor,
    1: Wall,
    2: Floor,
    3: Floor,
}

interface TileManagerProps {
    cell: number;
    [key: string]: any;
}

export default function TileManager(props: TileManagerProps) {
    const Tile = TILE_LITERALS[props.cell];
    return <Tile {...props} />;
}