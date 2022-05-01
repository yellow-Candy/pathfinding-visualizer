import React, {Component} from 'react';
import Node from './Node/Node';

import {dijkstra, getNodesInShortestPathOrder} from '../pathfindingAlgorithms/dijkstra';


import './PathfindingVisualizer.css';


const START_NODE_ROW = 10;
const START_NODE_COL = 15;
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
                    distance: Infinity,
                    isVisited: false,
                    isWall: false,
                    previousNode: null,
                }
                // creates 1d array of nodes
                currentRow.push(curretnNode);
            }
            // creates 2d grid
            grid.push(currentRow);
        }
        this.setState({grid})
    }


    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
        // itterate through the list of all visited nodes in order
        // and set their class name to visited to actuate the animation
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {

            // to start animation of shortest path once end-node  is found
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                console.log(visitedNodesInOrder[i]);
                const node = visitedNodesInOrder[i];
                if (i !== 0 && i !== visitedNodesInOrder.length - 1) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
                }  
            }, 10 * i);
        }
        
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                if (i !== 0 && i !== nodesInShortestPathOrder.length - 1) {
                    document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
                }
            }, 50 * i);
        }
    }


    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        //console.log(test);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
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
                                    const {row, col, isStart, isFinish} = node;
                                    return (
                                        <Node key={nodeIdx}
                                            col={col}
                                            row = {row}
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