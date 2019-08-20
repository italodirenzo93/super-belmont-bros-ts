import { System, World } from '@jakeklassen/ecs';
import { Transform } from '../components/Transform';
import { Sprite } from '../components/Sprite';

export class SpriteRenderingSystem extends System {

    constructor(private readonly ctx: CanvasRenderingContext2D) {
        super();
    }

    update(world: World, dt: number) {
        for (const [entity, components] of world.view(Transform, Sprite)) {
            const transform = components.get<Transform>(Transform)!;
            const sprite = components.get<Sprite>(Sprite)!;

            this.ctx.drawImage(sprite.image, transform.x, transform.y);
        }
    }
}
