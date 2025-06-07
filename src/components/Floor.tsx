import { Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { useRef } from "react";
import Hero from "./Hero";

extend({
    Sprite,
});

interface FloorProps {
    x: number;
    y: number;
    cell: number;
}

export default function Floor({ x, y, cell }: FloorProps) {
    const spriteRef = useRef<Sprite>(null);

    const tint = cell === 2 ? 0xFF0000 : 0x000000;

    return (
        <>
            <pixiSprite
                tint={tint} 
                ref={spriteRef} 
                texture={Texture.WHITE} 
                anchor={0.5} 
                width={32}
                height={32}
                x={x}
                y={y}
            />
            {cell === 3 && <Hero x={x} y={y} />}
        </>
    );
}