export * from './d3.service'
export * from './models'
// export * from './directives'

import { DraggableDirective } from './directives/draggable.directives';
import { ZoomableDirective } from './directives/zoomable.directive';

export const DIRECTIVES = [
    DraggableDirective,
    ZoomableDirective
];