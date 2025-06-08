import { MIN_DIMENSION, TileTypes } from "./constants";
import { Grid, Room } from "../interfaces/common";

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateOrganicGrid(width: number, height: number): Grid {
    // Validate dimensions
    if (width < MIN_DIMENSION) width = MIN_DIMENSION;
    if (height < MIN_DIMENSION) height = MIN_DIMENSION;
    
    // Calculate maximum rooms (biggest dimension/2, minimum 2)
    const maxRooms = Math.max(2, Math.floor(Math.max(width, height) / 2));
    const numRooms = getRandomInt(2, maxRooms);
    
    // Initialize grid with walls and empty spaces
    const grid: Grid = Array(height).fill(null).map(() => Array(width).fill(TileTypes.Wall));
    
    const rooms: Room[] = [];
    
    // Place rooms (allowing overlaps)
    for (let r = 0; r < numRooms; r++) {
        // Random room dimensions (3-7 width/height, but no bigger than grid-2)
        const roomWidth = getRandomInt(3, Math.min(7, width - 2));
        const roomHeight = getRandomInt(3, Math.min(7, height - 2));
        
        // Random position (keeping 1 cell border)
        const x = getRandomInt(1, width - roomWidth - 2);
        const y = getRandomInt(1, height - roomHeight - 2);
        
        rooms.push([x, y, roomWidth, roomHeight]);
        
        // Fill room with empty spaces (0)
        for (let i = y; i < y + roomHeight; i++) {
            for (let j = x; j < x + roomWidth; j++) {
                if (i >= 0 && i < height && j >= 0 && j < width) {
                    grid[i][j] = TileTypes.Floor;
                }
            }
        }
    }
    
    // Connect all rooms with minimum spanning tree
    if (rooms.length > 1) {
        // Calculate room centers
        const centers: [number, number][] = [];
        for (const [x, y, w, h] of rooms) {
            centers.push([x + Math.floor(w / 2), y + Math.floor(h / 2)]);
        }
        
        // Prim's algorithm to connect rooms
        const connected: [number, number][] = [centers[0]];
        const unconnected = centers.slice(1);
        
        while (unconnected.length > 0) {
            let closestPair: [[number, number], [number, number]] | null = null;
            let minDist = Infinity;
            
            // Find closest pair between connected and unconnected
            for (const conn of connected) {
                for (const unconn of unconnected) {
                    const dist = Math.abs(conn[0] - unconn[0]) + Math.abs(conn[1] - unconn[1]);
                    if (dist < minDist) {
                        minDist = dist;
                        closestPair = [conn, unconn];
                    }
                }
            }
            
            if (closestPair) {
                // Draw L-shaped corridor
                const [[x1, y1], [x2, y2]] = closestPair;
                
                // Horizontal then vertical
                const stepX = x2 > x1 ? 1 : -1;
                const stepY = y2 > y1 ? 1 : -1;
                
                for (let x = x1; x !== x2 + stepX; x += stepX) {
                    if (x > 0 && x < width - 1 && y1 > 0 && y1 < height - 1) {
                        grid[y1][x] = TileTypes.Floor;
                    }
                }
                
                for (let y = y1; y !== y2 + stepY; y += stepY) {
                    if (y > 0 && y < height - 1 && x2 > 0 && x2 < width - 1) {
                        grid[y][x2] = TileTypes.Floor;
                    }
                }
                
                // Move newly connected to connected set
                connected.push(closestPair[1]);
                unconnected.splice(unconnected.indexOf(closestPair[1]), 1);
            }
        }
    }
    
    // Place a door (2) in a random floor cell (0) that's not on the edge
    const floorCells: [number, number][] = [];
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            if (grid[y][x] === TileTypes.Floor) {
                floorCells.push([x, y]);
            }
        }
    }
    
    let doorX = -1, doorY = -1;
    
    // Place door if there are valid floor cells
    if (floorCells.length > 0) {
        [doorX, doorY] = floorCells[Math.floor(Math.random() * floorCells.length)];
        grid[doorY][doorX] = TileTypes.Door;
        
        // Remove door position from floor cells
        const doorIndex = floorCells.findIndex(([x, y]) => x === doorX && y === doorY);
        if (doorIndex !== -1) {
            floorCells.splice(doorIndex, 1);
        }
        
        // Place player (3) as far as possible from the door
        if (floorCells.length > 0) {
            let maxDistance = -1;
            let playerX = -1, playerY = -1;
            
            // Find the floor cell with maximum Manhattan distance from the door
            for (const [x, y] of floorCells) {
                const distance = Math.abs(x - doorX) + Math.abs(y - doorY);
                if (distance > maxDistance) {
                    maxDistance = distance;
                    playerX = x;
                    playerY = y;
                }
            }
            
            if (playerX !== -1 && playerY !== -1) {
                grid[playerY][playerX] = TileTypes.Player;
                
                // Remove player position from floor cells
                const playerIndex = floorCells.findIndex(([x, y]) => x === playerX && y === playerY);
                if (playerIndex !== -1) {
                    floorCells.splice(playerIndex, 1);
                }
            }
        }
    }

    // TODO: commented out for the time being as it bumps complexity to O(n^2)
    // Flood fill to check connectivity
    // function isConnected(): boolean {
    //     const visited: boolean[][] = Array(height).fill(null).map(() => Array(width).fill(false));
    //     const queue: [number, number][] = [];
        
    //     // Find first empty space not on edge
    //     let found = false;
    //     for (let i = 1; i < height - 1 && !found; i++) {
    //         for (let j = 1; j < width - 1; j++) {
    //             if (grid[i][j] === TileTypes.Floor) {
    //                 queue.push([i, j]);
    //                 visited[i][j] = true;
    //                 found = true;
    //                 break;
    //             }
    //         }
    //     }
        
    //     if (queue.length === 0) {
    //         return false;
    //     }
        
    //     // BFS to mark all connected empty spaces
    //     const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    //     while (queue.length > 0) {
    //         const [i, j] = queue.shift()!;
    //         for (const [di, dj] of directions) {
    //             const ni = i + di;
    //             const nj = j + dj;
    //             if (ni > 0 && ni < height - 1 && nj > 0 && nj < width - 1) {
    //                 if (grid[ni][nj] === TileTypes.Floor && !visited[ni][nj]) {
    //                     visited[ni][nj] = true;
    //                     queue.push([ni, nj]);
    //                 }
    //             }
    //         }
    //     }
        
    //     // Check if all non-edge empty spaces were visited
    //     for (let i = 1; i < height - 1; i++) {
    //         for (let j = 1; j < width - 1; j++) {
    //             if (grid[i][j] === TileTypes.Floor && !visited[i][j]) {
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // }    
    // Add organic details while maintaining connectivity
    // for (let attempt = 0; attempt < Math.floor((width * height) / 10); attempt++) {
    //     const i = getRandomInt(1, height - 2);
    //     const j = getRandomInt(1, width - 2);
        
    //     if (grid[i][j] === TileTypes.Wall) {
    //         // Only convert if adjacent to existing empty space
    //         let adjacent = false;
    //         const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            
    //         for (const [di, dj] of directions) {
    //             const ni = i + di;
    //             const nj = j + dj;
    //             if (ni >= 0 && ni < height && nj >= 0 && nj < width) {
    //                 if (grid[ni][nj] === TileTypes.Floor) {
    //                     adjacent = true;
    //                     break;
    //                 }
    //             }
    //         }
            
    //         if (adjacent) {
    //             grid[i][j] = 0;
    //             if (!isConnected()) {
    //                 grid[i][j] = TileTypes.Wall; // Revert if breaks connectivity
    //             }
    //         }
    //     }
    // }
    
    return grid;
}