export default function BFS(grid, startNode, finishNode) {
  let queue = [];
  let visitedNodes = [];
  queue.push(startNode);
  startNode.isVisited = true;
  while (queue.length > 0) {
    let node = queue.shift();
    let neighbors = getUnvisitedNeighbours(node, grid);
    if (node.isWall) continue;
    visitedNodes.push(node);
    if (node === finishNode) return visitedNodes;
    for (let neighbor of neighbors) {
      if (neighbor.isVisited === false) {
        queue.push(neighbor);
        neighbor.isVisited = true;
        if (neighbor.isWall) continue;

        neighbor.previousNode = node;
      }
    }
  }
  return visitedNodes;
}

function getUnvisitedNeighbours(node, grid) {
  let neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  //get me the unvisited neighbours and filter the visited ones
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getShortestPathBFS(finsihNode) {
  let shortestPath = [];
  let currentNode = finsihNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
}
