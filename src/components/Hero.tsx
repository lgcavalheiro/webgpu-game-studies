import { extend } from "@pixi/react";
import { Sprite, Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import heroTexture from "../assets/actors/hero.png"
import { CELL_SIZE } from "../core/constants";
import { useGameplayContext } from "../context/GameplayContext";

extend({
    Sprite,
})

interface HeroProps {
    x: number;
    y: number;
}

export default function Hero({ x, y }: HeroProps) {
    const { isBlocked, heroPosition, setHeroPosition } = useGameplayContext();
    const [texture, setTexture] = useState<Texture>(Texture.WHITE);
    const positionRef = useRef(heroPosition);

    useEffect(() => {
        positionRef.current = heroPosition;
    }, [heroPosition]);

    useEffect(() => {
        setHeroPosition({ x, y });
        positionRef.current = { x, y };

        Assets.load(heroTexture).then(setTexture);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;

            let newX = positionRef.current.x;
            let newY = positionRef.current.y;

            switch (e.key) {
                case "ArrowUp":
                    newY -= CELL_SIZE;
                    break;
                case "ArrowDown":
                    newY += CELL_SIZE;
                    break;
                case "ArrowLeft":
                    newX -= CELL_SIZE;
                    break;
                case "ArrowRight":
                    newX += CELL_SIZE;
                    break;
                default:
                    return;
            }

            if (!isBlocked(newX, newY))
                setHeroPosition({ x: newX, y: newY });
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);


    return <pixiSprite
        texture={texture}
        anchor={0.5}
        x={heroPosition.x}
        y={heroPosition.y}
        zIndex={9999}
    />
}