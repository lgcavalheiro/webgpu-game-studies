import { Coords, Grid } from "../interfaces/common";
import { CELL_SIZE } from "../core/constants";

export function pixelToCellIndex(coords: Coords): Coords {
    return {
        x: Math.floor(coords.x / CELL_SIZE),
        y: Math.floor(coords.y / CELL_SIZE),
    };
}

export function printGrid(grid: Grid): void {
    for (const row of grid) {
        console.log('|' + row.map(cell => cell).join('') + '|');
    }
}