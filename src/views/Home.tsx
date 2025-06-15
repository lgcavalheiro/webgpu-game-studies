import { extend } from "@pixi/react";
import { HTMLText, TextStyle } from 'pixi.js'

extend({
    HTMLText,
    TextStyle
})

export default function Home() {
    return (
        // @ts-ignore
        <pixiHTMLText text="Welcome to WebGPU Game Studies" anchor={0.5}
        x={250}
        y={150}
        style={
            new TextStyle({
                align: 'center',
                fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                fontSize: 50,
                fontWeight: '400',
                // @ts-ignore
                fill: ['#ffffff', '#00ff99'], 
                stroke: '#01d27e',
                strokeThickness: 5,
                letterSpacing: 20,
                dropShadow: true,
                dropShadowColor: '#ccced2',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440,
            })
        } />
    );
}