import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Node from './Node/node';
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import Dijkstra from './algorithms/Dijkstra';
import { getShortestPath } from './algorithms/Dijkstra';
import BFS from './algorithms/BFS';
import { getShortestPathBFS } from './algorithms/BFS';
import DFS from './algorithms/DFS';
import { getShortestPathDFS } from './algorithms/DFS';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { createTheme } from '@mui/system';

function PathfindingVisualizer() {
  const ROWS = 20;
  const COLS = 40;
  const START_NODE_ROW = ROWS / 2;
  const START_NODE_COL = COLS - (COLS - 5);
  const END_NODE_ROW = ROWS / 2;
  const END_NODE_COL = COLS - 6;

  let [grid, setGrid] = useState([]);
  let [mousePressed, setMousePressed] = useState(false);
  let [startRow, setStartRow] = useState(START_NODE_ROW);
  let [startCol, setStartCol] = useState(START_NODE_COL);
  let [endRow, setEndRow] = useState(END_NODE_ROW);
  let [endCol, setEndCol] = useState(END_NODE_COL);
  let [startClicked, setStartClicked] = useState(false);
  let [endClicked, setEndClicked] = useState(false);
  let [algo, setAlgo] = useState('dijkstra');
  let [algorithmRunning, setAlgorithmRunning] = useState(false);
  let [boardClean, setBoardClean] = useState(true);
  let [open, setOpen] = useState(false);
  const theme = createTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getInitialGrid = () => {
    let grid = [];
    for (let row = 0; row < ROWS; row++) {
      let currRow = [];
      for (let col = 0; col < COLS; col++) {
        currRow.push(createNode(row, col));
      }
      grid.push(currRow);
    }
    return grid;
  };

  const createNode = (row, col) => {
    return {
      col,
      row,
      isVisited: false,
      isWall: false,
      previousNode: null,
      distance: Infinity,
      isStart: row === startRow && col === startCol,
      isFinish: row === endRow && col === endCol,
    };
  };

  const animateAlgorithm = (visitedNodesInOrder, shortestPath) => {
    /*  
      when trying to catch the value if algorithm is animating or not component re renders
      resulting in wall disappears so i have to make sure to re-pain them again
      until i find a solution for that
    */
    for (let row of grid) {
      for (let node of row) {
        if (node.isWall) {
          const { row, col } = node;
          document.getElementById(`node-${row}-${col}`).style.background =
            '#140e3c';
        }
      }
    }

    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        if (i === visitedNodesInOrder.length - 1) {
          animatePath(shortestPath);
          return;
        }
        let node = visitedNodesInOrder[i];
        let startNode = grid[startRow][startCol];
        let endNode = grid[endRow][endCol];
        let nodeElementStyle = document.getElementById(
          `node-${node.row}-${node.col}`
        ).style;
        if (node === startNode) {
          nodeElementStyle.background = 'green';
          nodeElementStyle.border = '.3px solid green';
        } else if (node === endNode) {
          nodeElementStyle.background = 'red';
          nodeElementStyle.border = '.3px solid red';
        } else {
          nodeElementStyle.background = '#f8e0e8';
          nodeElementStyle.border = '.3px solid #f8e0e8';
        }
      }, i * 5);
    }
  };

  const animatePath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        if (i === shortestPath.length - 1) {
          setAlgorithmRunning(false);
        }
        let node = shortestPath[i];
        let startNode = grid[startRow][startCol];
        let endNode = grid[endRow][endCol];
        let nodeElementStyle = document.getElementById(
          `node-${node.row}-${node.col}`
        ).style;
        if (node === startNode) {
          nodeElementStyle.background = 'green';
          nodeElementStyle.border = '.3px solid green';
        } else if (node === endNode) {
          nodeElementStyle.background = 'red';
          nodeElementStyle.border = '.3px solid red';
        } else {
          nodeElementStyle.background = '#8f7eab';
          nodeElementStyle.border = '.3px solid #8f7eab';
        }
      }, i * 20);
    }
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    let node = grid[row][col];
    let startNode = grid[startRow][startCol];
    let endNode = grid[endRow][endCol];
    let newNode = {
      ...node,
      isWall: node === startNode || node === endNode ? false : !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getNewGridWithStartOrEndNodeToggled = (row, col) => {
    if (startClicked) {
      let originalStartNodeStyle = document.getElementById(
        `node-${startRow}-${startCol}`
      ).style;
      originalStartNodeStyle.background = 'none';
      let newStartNodeStyle = document.getElementById(
        `node-${row}-${col}`
      ).style;
      newStartNodeStyle.background = 'green';
      setStartRow(row);
      setStartCol(col);
    }

    if (endClicked) {
      let originalEndNodeStyle = document.getElementById(
        `node-${endRow}-${endCol}`
      ).style;
      originalEndNodeStyle.background = 'none';
      let newEndNodeStyle = document.getElementById(`node-${row}-${col}`);
      newEndNodeStyle.style.background = 'red';
      setEndRow(row);
      setEndCol(col);
    }
  };

  const handleMouseDown = (row, col) => {
    if (grid[row][col] === grid[startRow][startCol]) {
      setStartClicked(true);
    }
    if (grid[row][col] === grid[endRow][endCol]) {
      setEndClicked(true);
    }
    let newGrid = getNewGridWithWallToggled(grid, row, col);
    if (algorithmRunning || !boardClean) {
      handleClickOpen();
      return;
    }
    setGrid(newGrid);
    setMousePressed(true);
  };
  const handleMouseEnter = (row, col) => {
    if (!mousePressed) return;
    if (algorithmRunning || !boardClean) return;
    if (startClicked) {
      getNewGridWithStartOrEndNodeToggled(row, col);
      return;
    }
    if (endClicked) {
      getNewGridWithStartOrEndNodeToggled(row, col);
      return;
    }
    let newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };
  const handleMouseUp = () => {
    if (algorithmRunning || !boardClean) return;
    setMousePressed(false);
    setStartClicked(false);
    setEndClicked(false);
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startRow][startCol];
    const endNode = grid[endRow][endCol];
    const visitedNodesInOrder = Dijkstra(grid, startNode, endNode);
    const shortestPath = getShortestPath(endNode);
    animateAlgorithm(visitedNodesInOrder, shortestPath);
  };

  const visualizeBFS = () => {
    const startNode = grid[startRow][startCol];
    const endNode = grid[endRow][endCol];
    const visitedNodes = BFS(grid, startNode, endNode);
    const shortestPath = getShortestPathBFS(endNode);
    animateAlgorithm(visitedNodes, shortestPath);
  };

  const visualizeDFS = () => {
    const startNode = grid[startRow][startCol];
    const endNode = grid[endRow][endCol];
    const visitedNodes = DFS(grid, startNode, endNode);
    const path = getShortestPathDFS(endNode);
    animateAlgorithm(visitedNodes, path);
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  const handleAlgoVisualization = () => {
    if (!boardClean) return;
    setBoardClean(false);
    setAlgorithmRunning(true);
    switch (algo) {
      case 'dijkstra':
        visualizeDijkstra();
        break;
      case 'bfs':
        visualizeBFS();
        break;
      case 'dfs':
        visualizeDFS();
        break;
      default:
        break;
    }
  };

  const handleResetWallsAndStartingNodes = () => {
    window.location.reload();
  };
  useEffect(() => {
    setGrid(getInitialGrid());
  }, []);

  return (
    <>
      <Box
        component='div'
        sx={{
          position: 'static',
          minHeight: '90px',
          backgroundColor: '#3b4d80',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
          Path Finding Visualizer
        </Typography>
        <FormControl onChange={handleAlgoChange} disabled={algorithmRunning}>
          <InputLabel
            variant='standard'
            htmlFor='uncontrolled-native'
            sx={{ color: 'white' }}
          >
            Choose Algorithm
          </InputLabel>
          <NativeSelect
            defaultValue='dijkstra'
            inputProps={{
              name: 'Algorithm',
              id: 'uncontrolled-native',
            }}
            sx={{ color: 'orange' }}
          >
            <option value='dijkstra' sx={{ color: '#3b4d80' }}>
              Dijkstra
            </option>
            <option value='bfs'>BFS (Breadth first search)</option>
            <option value='dfs'>DFS (Depth first search)</option>
          </NativeSelect>
        </FormControl>

        <Button
          variant='contained'
          onClick={handleAlgoVisualization}
          disabled={algorithmRunning}
          sx={{
            textTransform: 'none',
            backgroundColor: 'white',
            color: '#3b4d80',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'orange',
            },
          }}
        >
          Visualize {algo}
        </Button>

        <Button
          variant='contained'
          onClick={handleResetWallsAndStartingNodes}
          sx={{
            textTransform: 'none',
            backgroundColor: 'white',
            color: '#3b4d80',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'orange',
            },
          }}
        >
          Reset Board
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginY: '10px',
        }}
      >
        <Box>
          <Box
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: 'green',
              display: 'inline-block',
            }}
          />
          <Box
            component='span'
            sx={{ padding: '3px', color: '#140e3c', letterSpacing: '1px' }}
          >
            Start Node
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: 'red',
              display: 'inline-block',
            }}
          />
          <Box
            component='span'
            sx={{ padding: '3px', color: '#140e3c', letterSpacing: '1px' }}
          >
            Target Node
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: '#f8e0e8',

              display: 'inline-block',
            }}
          />
          <Box
            component='span'
            sx={{ padding: '3px', color: '#140e3c', letterSpacing: '1px' }}
          >
            Visited Node
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: '#140e3c',

              display: 'inline-block',
            }}
          />
          <Box
            component='span'
            sx={{ padding: '3px', color: '#140e3c', letterSpacing: '1px' }}
          >
            Wall Node
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: '#8f7eab',

              display: 'inline-block',
            }}
          />
          <Box
            component='span'
            sx={{ padding: '3px', color: '#140e3c', letterSpacing: '1px' }}
          >
            Path Node
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              width: '25px',
              height: '25px',
              backgroundColor: 'white',
              border: '.3px solid #ADD8E6',
              display: 'inline-block',
            }}
          />
          <Box
            component='span'
            sx={{ padding: '3px', color: '#140e3c', letterSpacing: '1px' }}
          >
            Unvisited Node
          </Box>
        </Box>
      </Box>
      <Divider variant='middle' sx={{ marginBottom: '5px' }} />
      <Box
        sx={{
          position: 'static',
          minHeight: '40px',
          maxHeight: '100px',
        }}
      >
        <Typography textAlign='center' sx={{ marginTop: '5px' }}>
          {algo === 'dijkstra' ? (
            <>
              <Typography>
                Dijkstra algorithm uses a weighted graph and{' '}
                <Box
                  component='span'
                  sx={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'green',
                    textTransform: 'uppercase',
                  }}
                >
                  it guarantees
                </Box>{' '}
                shortest path
              </Typography>
              <Typography>
                The time complexity is{' '}
                <Box
                  component='span'
                  sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
                >
                  O((V+E)logV) or O(V2)using Adjacency list or Matrix
                  respectively
                </Box>
              </Typography>
            </>
          ) : algo === 'bfs' ? (
            <>
              <Typography>
                Breadth First Search algorithm uses an unweighted graph and{' '}
                <Box
                  component='span'
                  sx={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'green',
                    textTransform: 'uppercase',
                  }}
                >
                  it guarantees
                </Box>{' '}
                shortest path
              </Typography>
              <Typography>
                The time complexity is{' '}
                <Box
                  component='span'
                  sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
                >
                  O((V+E)) Where V (number of vertices ) and E (number of edges)
                </Box>
              </Typography>
            </>
          ) : (
            <>
              <Typography>
                Depth First Search algorithm uses an unweighted graph and{' '}
                <Box
                  component='span'
                  sx={{
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: '#ef5350',
                    textTransform: 'uppercase',
                  }}
                >
                  it does not guarantee
                </Box>{' '}
                shortest path
              </Typography>
              <Typography>
                The time complexity is{' '}
                <Box
                  component='span'
                  sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
                >
                  O((V+E)) Where V (number of vertices ) and E (number of edges)
                </Box>
              </Typography>
            </>
          )}
        </Typography>
      </Box>

      {setOpen ? (
        <>
          <Box component='div'>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogContent>
                <DialogContentText
                  id='alert-dialog-description'
                  sx={{ color: 'black' }}
                >
                  Please reset the board in order to be able to add walls or use
                  different algorithm.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleResetWallsAndStartingNodes}
                  sx={{ textTransform: 'none', color: 'green' }}
                >
                  Reset Board
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{ textTransform: 'none', color: '#3b4d80' }}
                  autoFocus
                >
                  Dismiss
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      ) : null}

      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box component='div'>
          {grid.map((row, rowIdx) => {
            return (
              <Box
                key={rowIdx}
                sx={{
                  height: '25px',
                  [theme.breakpoints.down('md')]: {
                    height: '15px',
                  },
                }}
              >
                {row.map((node, nodeIdx) => {
                  let {
                    isStart,
                    isFinish,
                    col,
                    row,
                    isVisited,
                    previousNode,
                    isWall,
                  } = node;

                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      col={col}
                      row={row}
                      isVisited={isVisited}
                      previousNode={previousNode}
                      isWall={isWall}
                      onMouseDown={handleMouseDown}
                      onMouseEnter={handleMouseEnter}
                      onMouseUp={handleMouseUp}
                      mouseIsPressed={mousePressed}
                    ></Node>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default PathfindingVisualizer;
