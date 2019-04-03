// path : d3/models/force-directed-graph.ts

import { EventEmitter, OnInit } from '@angular/core';
import { Link } from './link';
import { Node } from './node';
import * as d3 from 'd3';

const FORCES = {
    LINKS: 1 / 20,
    COLLISION: 20,
    CHARGE: -10
}

export class ForceDirectedGraph implements OnInit {
    public ticker: EventEmitter<d3.Simulation<Node, Link>> = new EventEmitter();
    public simulation: d3.Simulation<any, any>;

    public nodes: Node[] = [];
    public links: Link[] = [];

    constructor(nodes, links, private options: { width, height }) {
        this.nodes = nodes;
        this.links = links;
    }

    ngOnInit(): void {
        this.initSimulation(this.options);
    }

    initNodes() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }

        this.simulation.nodes(this.nodes);
    }

    initLinks() {
        if (!this.simulation) {
            throw new Error('simulation was not initialized yet');
        }
        
        // Initializing the links force simulation
        this.simulation.force('links',
            d3.forceLink(this.links)
                .strength(FORCES.LINKS)
        );
    }

    initSimulation(options) {
        if (!options || !options.width || !options.height) {
            throw new Error('missing options when initializing simulation');
        }

        /** Creating the simulation */
        if (!this.simulation) {
            const ticker = this.ticker;
            
            // Creating the force simulation and defining the charges
            this.simulation = d3.forceSimulation()
            .force("charge",
                d3.forceManyBody()
                    .strength(FORCES.CHARGE)
            )
            .force("collide", d3.forceCollide(40))
            .force("centers", d3.forceCenter(options.width / 2, options.height / 2));

            // Connecting the d3 ticker to an angular event emitter
            this.simulation.on('tick', function () {
                ticker.emit(this);
            });
            console.log(this.links.length)
            this.initNodes();
            this.initLinks();
        }

        /** Updating the central force of the simulation */
        // this.simulation.force("centers", d3.forceCenter(options.width / 2, options.height / 2));

        /** Restarting the simulation internal timer */
        this.simulation.restart();
    }

    addNodes(node, link) {
        this.nodes.push(node);
        this.links.push(link);

        // console.log(this.nodes)
        console.log(this.links[this.links.length - 1 ])

        this.initNodes();
        this.initLinks();
        console.log(this.links.length)

        this.simulation.restart();
    }
}