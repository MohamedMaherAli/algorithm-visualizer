import { Button, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import graphImage from '../images/graph.jfif';
import sortImage from '../images/sort.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
function Main() {
  const navigate = useNavigate();

  return (
    <Box component='div'>
      <Container maxWidth='md'>
        <Box sx={{ padding: '20px' }}>
          <Typography variant='h6' textAlign='center' fontWeight='bold'>
            Algorithm Visualizer
          </Typography>
          <Typography textAlign='center' fontStyle='italic'>
            Visualize algorithm for a better understanding
          </Typography>
        </Box>
        <Grid container spacing={5}>
          <Grid item md={6} xs={12}>
            <Button
              onClick={() => navigate('/path')}
              sx={{ textTransform: 'none' }}
            >
              {' '}
              View the app &nbsp;
              <ArrowForwardIcon fontSize='sm' />
            </Button>
            <Card
              sx={{ maxWidth: 345, height: '300px' }}
              onClick={() => navigate('/path')}
            >
              <CardActionArea>
                <CardMedia component='img' image={graphImage} alt='Graph' />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Pathfinding Visualizer
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Visualize different graph path finding algorithms such as
                    Dijkstra, DFS (Depth first search) and BFS (Breadth first
                    search)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Button
              onClick={() => navigate('/sort')}
              sx={{ textTransform: 'none' }}
            >
              View the app &nbsp;
              <ArrowForwardIcon fontSize='sm' />
            </Button>
            <Card
              sx={{ maxWidth: 345, height: '300px' }}
              onClick={() => navigate('/sort')}
            >
              <CardActionArea>
                <CardMedia component='img' image={sortImage} alt='Sorting' />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Sorting Visualizer
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Visualize different sorting algorithms such as Merge sort,
                    quick sort, bubble sort and selection sort
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Main;
