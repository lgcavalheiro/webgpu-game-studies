import { Layer } from "react-konva";
import Grid from "../components/Grid";
import { Html } from "react-konva-utils";
import { useGameplayContext } from "../context/GameplayContext";

export default function Game() {
    const { goDeeper, atDoor, floor } = useGameplayContext();

    return (
        <Layer>
            <Html transformFunc={(attrs) => ({ ...attrs, x: attrs.x + 100, y: attrs.y + 100 })}>
                <button onClick={goDeeper} disabled={!atDoor}>Go deeper</button>
                <p>Current floor: {floor}</p>
            </Html>
            <Grid />
        </Layer>
    );
}