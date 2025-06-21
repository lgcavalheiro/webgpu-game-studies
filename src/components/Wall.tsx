import { CELL_SIZE } from "../core/constants";
import { Image } from "react-konva";
import useImage from "use-image";
import wallTexture from "../assets/tiles/floor.png"

interface WallProps {
    x: number;
    y: number;
}

export default function Wall({ x, y }: WallProps) {
    const [wallImage] = useImage(wallTexture);

    return (
        <Image
            image={wallImage}
            width={CELL_SIZE}
            height={CELL_SIZE}
            x={x}
            y={y}
        />
    );
}