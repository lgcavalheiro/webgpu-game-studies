import { TileTypes } from "../core/constants";

export type Grid = TileTypes[][];

export type Room = [number, number, number, number]; // x, y, width, height

export type Coords = {
    x: number;
    y: number;
}