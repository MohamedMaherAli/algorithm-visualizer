export default function DFS(grid, startNode, finishNode) {
  let stack = [];
  let visitedNodes = [];
  stack.push(startNode);
  startNode.isVisited = true;
  while (stack.length > 0) {
    let node = stack.pop();
    let neighbors = getUnvisitedNeighbours(node, grid);
    if (node === finishNode) return visitedNodes;

    //Handle wall
    if (node.isWall) continue;
    visitedNodes.push(node);

    for (let neighbor of neighbors) {
      if (neighbor.isVisited === false) {
        stack.push(neighbor);
        neighbor.isVisited = true;
        if (neighbor.isWall) continue;
        // visitedNodes.push(neighbor);
        neighbor.previousNode = node;
      }
    }
  }

  //handles impossible path
  return visitedNodes;
}

function getUnvisitedNeighbours(node, grid) {
  let neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.unshift(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.unshift(grid[row + 1][col]);
  if (col > 0) neighbors.unshift(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.unshift(grid[row][col + 1]);

  //get me the unvisited neighbours and filter the visited ones
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getShortestPathDFS(finsihNode) {
  let shortestPath = [];
  let currentNode = finsihNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
}
