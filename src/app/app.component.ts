import { Component } from '@angular/core';
// import APP_CONFIG from './app.config';
import { Link, Node } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    const N = 100,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }

    // console.log(this.links);  

    // setTimeout(() => {
    //   this.nodes[100]
    //   this.nodes.pop();
    //   this.links.pop();
    //   this.links.pop();
    // }, 2000);
  }
}
