import { Component, Input } from '@angular/core';
import { Node } from '../../d3';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
      class="node"
          cx="0"
          cy="0"
          r="20">
      </svg:circle>
      <svg:text>
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}