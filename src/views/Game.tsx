import { Layer } from "react-konva";
import Grid from "../components/Grid";
import { Html } from "react-konva-utils";
import { useGameplayContext } from "../context/GameplayContext";
import Camera from "../components/Camera";

export default function Game() {
    const { goDeeper, atDoor, floor } = useGameplayContext();

    return (
        <Layer>
            <Camera zoom={8}>
                <Grid />
            </Camera>

            <Html transformFunc={(attrs) => ({ ...attrs, x: 20, y: 20 })}>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '10px',
                    color: 'white',
                    borderRadius: '4px'
                }}>
                    <button
                        onClick={goDeeper}
                        disabled={!atDoor}
                        style={{
                            padding: '5px 10px',
                            marginRight: '10px',
                            backgroundColor: atDoor ? '#4CAF50' : '#cccccc',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: atDoor ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Go deeper
                    </button>
                    <span>Floor: {floor}</span>
                </div>
            </Html>
        </Layer>
    );
}