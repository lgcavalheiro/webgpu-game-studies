import { Assets, Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import floorTexture from "../assets/tiles/floor.png"
import { CELL_SIZE } from "../core/constants";

extend({
    Sprite,
});

interface WallProps {
    x: number;
    y: number;
}

export default function Wall({ x, y }: WallProps) {
    const spriteRef = useRef<Sprite>(null);
    const [texture, setTexture] = useState<Texture>(Texture.WHITE);

    useEffect(() => {
        Assets.load(floorTexture).then((texture) => {
            setTexture(texture);
        });
    }, []);

    return (
        <pixiSprite 
            ref={spriteRef} 
            texture={texture} 
            anchor={0.5} 
            width={CELL_SIZE}
            height={CELL_SIZE}
            x={x}
            y={y}
        />
    );
}