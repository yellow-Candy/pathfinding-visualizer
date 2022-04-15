export default function dijkstra(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    //console.log(unvisitedNodes);
    while (!!unvisitedNodes.length) {
        sortNodeByDistance(unvisitedNodes);
        // /console.log(unvisitedNodes[0]);
        const closestNode = unvisitedNodes.shift();
        console.log(closestNode)

        closestNode.isVisited = true;
        if (closestNode === finishNode) return 'success!';
        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function sortNodeByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA,nodeB) => nodeA.distance = nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const neighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance + 1;
    }
}


function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].lenght - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}


function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}