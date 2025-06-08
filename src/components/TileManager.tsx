import React from "react";
import Floor from "./Floor";
import Wall from "./Wall";
import { TileTypes } from "../core/constants";

const TILE_LITERALS: Record<TileTypes, React.FC<any>> = {
    [TileTypes.Floor]: Floor,
    [TileTypes.Wall]: Wall,
    [TileTypes.Door]: Floor,
    [TileTypes.Player]: Floor,
}

interface TileManagerProps {
    cell: TileTypes;
    [key: string]: any;
}

export default function TileManager(props: TileManagerProps) {
    const Tile = TILE_LITERALS[props.cell];
    return <Tile {...props} />;
}