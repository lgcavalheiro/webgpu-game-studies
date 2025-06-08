import { extend } from "@pixi/react";
import { Sprite, Assets, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import heroTexture from "../../public/assets/actors/hero.png"
import { CELL_SIZE } from "../core/constants";

extend({
    Sprite,
})

interface HeroProps {
    x: number;
    y: number;
}

export default function Hero({x, y}: HeroProps) {
    const [texture, setTexture] = useState<Texture>(Texture.WHITE);
    const [coords, setCoords] = useState({x, y});

    useEffect(() => {
        Assets.load(heroTexture).then((texture) => {
            setTexture(texture);
        });

        const onKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                    setCoords((prev) => ({x: prev.x, y: prev.y - CELL_SIZE}));
                    break;
                case "ArrowDown":
                    setCoords((prev) => ({x: prev.x, y: prev.y + CELL_SIZE}));
                    break;
                case "ArrowLeft":
                    setCoords((prev) => ({x: prev.x - CELL_SIZE, y: prev.y}));
                    break;
                case "ArrowRight":
                    setCoords((prev) => ({x: prev.x + CELL_SIZE, y: prev.y}));
                    break;
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);


    return <pixiSprite 
        texture={texture} 
        anchor={0.5} 
        x={coords.x} 
        y={coords.y}
        zIndex={9999}
    />
}