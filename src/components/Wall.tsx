import { Assets, Sprite, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { useEffect, useRef, useState } from "react";
import floorTexture from "../../public/assets/tiles/floor.png"

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
            width={32}
            height={32}
            x={x}
            y={y}
        />
    );
}