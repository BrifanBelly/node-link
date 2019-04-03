import { Component, Input } from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';

import * as d3 from 'd3';

@Component({
  selector: 'graph',
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
        (click)="called(node)"
        [draggableNode]="node"
        [draggableInGraph]="graph"
      ></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @Input('nodes') nodes;
  @Input('links') links;

  graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service) { }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  private _options: { width, height } = { width: 800, height: 600 };

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  called(d) {
    console.log("called", d);
    let newId = Math.trunc(Math.random() * 1000);
    let newNode = {"id": newId, "name": "server 22", x: d.x, y: d.y};
    let newNodes = [newNode];
    let newLinks = new Link(d.id, newNode.id);

    this.graph.addNodes(newNode, newLinks);
  }

//   doubleIndex(node) {
//     console.log(node);
//     node.id = node.id * 2
//   }
}