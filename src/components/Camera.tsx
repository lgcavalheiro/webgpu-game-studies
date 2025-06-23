import { Group } from "react-konva";
import { useGameplayContext } from "../context/GameplayContext";
import { PropsWithChildren, useMemo, useRef } from "react";
import { CELL_SIZE } from "../core/constants";

interface CameraProps {
    zoom?: number;
    smoothTime?: number;
}

export default function Camera({ children, zoom = 1, smoothTime = 1 }: PropsWithChildren<CameraProps>) {
    const { heroPosition } = useGameplayContext();
    const prevPosition = useRef({ x: 0, y: 0 });

    const cameraPosition = useMemo(() => {
        const targetPosition = {
            x: -heroPosition.x * zoom + window.innerWidth / 2 - CELL_SIZE / 2,
            y: -heroPosition.y * zoom + window.innerHeight / 2 - CELL_SIZE / 2
        }

        // might need to kill smoothTime
        const x = prevPosition.current.x + (targetPosition.x - prevPosition.current.x) * smoothTime;
        const y = prevPosition.current.y + (targetPosition.y - prevPosition.current.y) * smoothTime;
        
        prevPosition.current = { x, y };
        
        return { x, y };
    }, [heroPosition, zoom, smoothTime]);

    return (
        <Group
            x={cameraPosition.x}
            y={cameraPosition.y}
            scale={{ x: zoom, y: zoom }}
        >
            {children}
        </Group>
    );
}