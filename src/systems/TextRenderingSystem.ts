import { System, World } from '@jakeklassen/ecs';
import { Color } from '../components/Color';
import { Text } from '../components/Text';
import { Transform } from '../components/Transform';

export class TextRenderingSystem extends System {
    
    constructor(
        private readonly ctx: CanvasRenderingContext2D
    ) {
        super();
    }

    update(world: World, dt: number): void {
        for (const [entity, components] of world.view(Transform, Text)) {
            const transform = components.get<Transform>(Transform)!;
            const text = components.get<Text>(Text)!;

            // Check for an optional Color component
            const color = components.get<Color>(Color);

            this.ctx.fillStyle = (color && color.color) || '#ffffff';
            this.ctx.font = text.font;
            this.ctx.fillText(text.text, transform.x, transform.y);
        }
    }
}
