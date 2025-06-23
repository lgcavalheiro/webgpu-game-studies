import { useCallback, useEffect, useRef } from "react";
import { CELL_SIZE } from "../core/constants";
import { useGameplayContext } from "../context/GameplayContext";
import { Image } from "react-konva";
import useImage from "use-image";
import heroTexture from "../assets/actors/hero.png";

interface HeroProps {
    x: number;
    y: number;
}

export default function Hero({ x, y }: HeroProps) {
    const { isBlocked, heroPosition, setHeroPosition, atDoor, goDeeper } = useGameplayContext();
    const positionRef = useRef(heroPosition);
    const atDoorRef = useRef(atDoor);
    const [heroImage] = useImage(heroTexture);
    const rectRef = useRef<any>(null);

    useEffect(() => {
        atDoorRef.current = atDoor;
    }, [atDoor]);

    const tryDoor = useCallback(() => {
        if (!atDoorRef.current) return;
        goDeeper();
    }, [goDeeper]);

    useEffect(() => {
        positionRef.current = heroPosition;
    }, [heroPosition]);

    useEffect(() => {
        setHeroPosition({ x, y });
        positionRef.current = { x, y };
        rectRef.current?.zIndex(9999999);

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
                case "Enter":
                    tryDoor();
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

    return <Image
        ref={rectRef}
        image={heroImage}
        x={heroPosition.x}
        y={heroPosition.y}
        offset={{ x: -12, y: -12 }}
    />
}