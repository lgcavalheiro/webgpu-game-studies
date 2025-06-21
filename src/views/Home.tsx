import { Layer, Text } from "react-konva";
import { Html } from "react-konva-utils";

export default function Home() {
    return (
        <Layer>
            <Text text="Den of the Devil" fontSize={24} />  
            <Html transformFunc={(attrs) => ({ ...attrs, x: attrs.x + 100, y: attrs.y + 100 })}>
                <a href="/game">
                    <button>Start</button>
                </a>
            </Html>
        </Layer>
    );
}