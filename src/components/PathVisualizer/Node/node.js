import { Box } from '@mui/material';
import { createTheme } from '@mui/system';

function Node({
  isStart,
  isFinish,
  col,
  row,
  isVisited,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const id = `node-${row}-${col}`;
  const NodeBackgroundColor = (isVisited, isStart, isFinish) => {
    if (isStart) {
      return 'green';
    } else if (isFinish) {
      return 'red';
    } else if (isVisited) {
      return 'transparent';
    } else if (isWall) {
      return '#140e3c';
    } else {
      return null;
    }
  };

  const theme = createTheme();

  const NodeBorderColor = (isWall) => {
    return isWall ? '.3px solid black' : '.3px solid #ADD8E6';
  };
  return (
    <>
      <Box
        id={id}
        component='div'
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        sx={{
          width: '25px',
          [theme.breakpoints.down('md')]: {
            width: '15px',
            height: '15px',
          },
          height: '100%',
          border: NodeBorderColor(isWall),
          display: 'inline-block',
          backgroundColor: NodeBackgroundColor(isVisited, isStart, isFinish),
        }}
      ></Box>
    </>
  );
}

export default Node;
