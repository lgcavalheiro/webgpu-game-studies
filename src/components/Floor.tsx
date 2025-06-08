import { Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { useRef } from "react";
import Hero from "./Hero";
import { TileTypes, CELL_SIZE } from "../core/constants";

extend({
    Sprite,
});

interface FloorProps {
    x: number;
    y: number;
    cell: TileTypes;
}

export default function Floor({ x, y, cell }: FloorProps) {
    const spriteRef = useRef<Sprite>(null);

    const tint = cell === TileTypes.Door ? 0xFF0000 : 0x000000;

    return (
        <>
            <pixiSprite
                tint={tint} 
                ref={spriteRef} 
                texture={Texture.WHITE} 
                anchor={0.5} 
                width={CELL_SIZE}
                height={CELL_SIZE}
                x={x}
                y={y}
            />
            {cell === TileTypes.Player && <Hero x={x} y={y} />}
        </>
    );
}