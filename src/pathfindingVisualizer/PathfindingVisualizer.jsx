import React, {Component} from 'react';
import Node from './Node/Node';
import dijkstra from '../pathfindingAlgorithms/dijkstra';


import './PathfindingVisualizer.css';


const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
        };
    }

    // create 2d grid of nodes
    componentDidMount() {
        const grid = [];
        for(let row=0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 45; col++) {
                const curretnNode = {
                    col,
                    row,
                    isStart: row === START_NODE_ROW && col === START_NODE_COL,
                    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                }
                // creates 1d array of nodes
                currentRow.push(curretnNode);
            }
            // creates 2d grid
            grid.push(currentRow);
        }
        this.setState({grid})
    }


    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const test = dijkstra(grid, startNode, finishNode);
        console.log(test);
    }

    render() {
        const {grid} = this.state;
        

        return (
            <>
                <button onClick={() => this.visualizeDijkstra()}>visualize Dijkstra
                </button>

                <div className='grid'>
                    {grid.map((row,rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const {isStart, isFinish} = node;
                                    return (
                                        <Node key={nodeIdx}
                                            isStart={isStart}
                                            isFinish={isFinish}>
                                        </Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }

}