import { Component } from '@jakeklassen/ecs';

export class Transform extends Component {
    constructor(
        public x:number = 0,
        public y: number = 0
    ) {
        super();
    }
}
