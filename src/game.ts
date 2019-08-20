import { World } from "@jakeklassen/ecs";
import { Transform } from "./components/Transform";
import { Text } from "./components/Text";
import { TextRenderingSystem } from "./systems/TextRenderingSystem";
import { Color } from "./components/Color";
import { SpriteRenderingSystem } from "./systems/SpriteRenderingSystem";
import { Sprite } from "./components/Sprite";
import { loadImage } from "./utils";
import sheetSimon from '../assets/images/sheet-simon.png';

// Create canvas
const canvas = document.createElement('canvas') as HTMLCanvasElement;
canvas.width = 640;
canvas.height = 480;

// Create rendering context
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
(document.getElementById('container') as Element).appendChild(canvas);

// Create world
const world = new World();

// Load content function
async function loadContent() {
    // Create entities
    const helloWorldText = world.createEntity();
    world.addEntityComponents(
        helloWorldText,
        new Transform(50, 50),
        new Text('Hello World!', '50px serif'),
        new Color('red')
    );

    try {
        const sheet = await loadImage(sheetSimon);
        const simon = world.createEntity();
        world.addEntityComponents(
            simon,
            new Transform(100, 100),
            new Sprite(sheet)
        );
    } catch (err) {
        console.error(err);
    }

    // Create systems
    world.addSystem(new TextRenderingSystem(ctx));
    world.addSystem(new SpriteRenderingSystem(ctx));
}

// Render frame function
let deltaTime, lastUpdateTime = 0;
function frame(timestamp: DOMHighResTimeStamp) {
    // Calculate delta time
    deltaTime = (timestamp - lastUpdateTime) / 1000.0;

    // Update
    world.updateSystems(deltaTime);

    lastUpdateTime = timestamp;
    requestAnimationFrame(frame);
}

loadContent().then(() => requestAnimationFrame(frame));
