import { Component } from '@jakeklassen/ecs';

export type TileLayer = {
    width: number;
    height: number;
    visible: boolean;
    tiles: number[];
}

export class Tilemap extends Component {

    public readonly tileWidth: number;
    public readonly tileHeight: number;

    public readonly tilesWide: number;
    public readonly tilesHigh: number;

    public bgColor: string;

    public readonly layers: TileLayer[] = [];

    constructor(data: any) {
        super();

        // Get tilemap properties
        this.tileWidth = data.tilewidth || 0;
        this.tileHeight = data.tileheight || 0;
        this.tilesWide = data.width || 0;
        this.tilesHigh = data.height || 0;
        this.bgColor = data.backgroundcolor || '#000000';

        // Build layers
        for (const layer of data.layers) {
            if (layer.type != 'tilelayer') continue;
            this.layers.push(layer as TileLayer);
        }
    }
}
