import { Component } from '@jakeklassen/ecs';

export class Text extends Component {
    constructor(
        public text: string,
        public font: string
    ) {
        super();
    }
}
