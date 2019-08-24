import { System, World } from '@jakeklassen/ecs';
import { Tilemap } from '../components/Tilemap';
import { CanvasConfig } from '../config';

export class TilemapRenderingSystem extends System {

    private readonly offscreenCanvas: HTMLCanvasElement;
    private readonly offscreenCtx: CanvasRenderingContext2D;

    constructor(private readonly ctx: CanvasRenderingContext2D, private readonly config: CanvasConfig) {
        super();
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = config.width;
        this.offscreenCanvas.height = config.height;
        this.offscreenCtx = this.offscreenCanvas.getContext('2d') as CanvasRenderingContext2D;
    }

    update(world: World, dt: number): void {
        // Find the first entity with a tilemap component
        const level = world.findEntity(Tilemap);
        if (!level) return;

        // Pull the tilemap component off it
        const map = world.getEntityComponents(level)!.get(Tilemap) as Tilemap;

        // Draw the map
        this.offscreenCtx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
        this.offscreenCtx.fillStyle = map.bgColor;
        this.offscreenCtx.fillRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
        this.ctx.drawImage(this.offscreenCanvas, 0, 0);
    }
}
