import { useEffect, useState } from 'react';
import MergeSort from './mergeSort';
import BubbleSort from './bubbleSort';
import SelectionSort from './selectionSort';
import QuickSort from './quickSort';
import {
  Button,
  Container,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  NativeSelect,
} from '@mui/material';
import { Box } from '@mui/system';

function SortingVisualizer() {
  let [Array, setArray] = useState([]);
  let [ArraySize, setArraySize] = useState(150);
  let [algoSpeed, setAlgoSpeed] = useState(100);
  let [algo, setAlgo] = useState('mergeSort');
  let [disableButtons, setDisableBttons] = useState(false);
  let [sorted, setSorted] = useState(false);

  const randomIntergerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetArray = () => {
    let arr = [];
    for (let i = 0; i < ArraySize; i++) {
      arr.push(randomIntergerFromInterval(5, 500));
    }
    setArray(arr);
  };

  const handleArraySize = (event, value) => {
    setTimeout(setArraySize(value), 0.05);
  };

  const handleAlgorithmSpeed = (event, value) => {
    setAlgoSpeed(value);
  };

  const handleRandomize = () => {
    setSorted(false);
    let arr = [];
    for (let i = 0; i < ArraySize; i++) {
      arr.push(randomIntergerFromInterval(5, 500));
    }
    setArray(arr);

    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.height = `${Array[i]}px`;
      arrayBars[i].style.backgroundColor = '#1769aa';
    }
  };

  const handleAlgoChange = (e) => {
    setAlgo(e.target.value);
  };
  const handleSortVisualize = () => {
    if (sorted) {
      alert('Array is already sorted');
      return;
    }
    handleRandomize();
    setDisableBttons(true);
    switch (algo) {
      case 'mergeSort':
        mergeSort();
        break;
      case 'quickSort':
        quickSort();
        break;
      case 'bubbleSort':
        bubbleSort();
        break;
      case 'selectionSort':
        setDisableBttons(true);
        selectionSort();
        break;
      default:
        break;
    }
  };

  function mergeSort() {
    const animations = MergeSort(Array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? 'red' : 'turquoise';
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, i * (300 / algoSpeed));
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, i * (300 / algoSpeed));
      }
    }
  }

  function quickSort() {
    const animations = QuickSort(Array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      let animate = animations[i];
      const [swapIdxBar, indicatorBar] = animate.compare;
      const swapIdxBarStyle = arrayBars[swapIdxBar].style;
      const indicatorBarStyle = arrayBars[indicatorBar].style;
      const color = i % 2 === 0 ? 'red' : 'turquoise';
      setTimeout(() => {
        swapIdxBarStyle.backgroundColor = color;
        indicatorBarStyle.backgroundColor = color;
        if (i === animations.length - 1) {
          setDisableBttons(false);
          setSorted(true);
        }
        if (color === 'red') {
          setTimeout(() => {
            swapIdxBarStyle.backgroundColor = 'turquoise';
            indicatorBarStyle.backgroundColor = 'turquoise';
            if (i === animations.length - 1) {
              setDisableBttons(false);
              setSorted(true);
            }
          }, 0.5);
        }
      }, i * (300 / algoSpeed));

      if (animate.smallSwap !== undefined) {
        setTimeout(() => {
          const [swapIdxBar, iBar, swapIdxHeight, iHeight] = animate.smallSwap;
          const swapIdxBarStyle = arrayBars[swapIdxBar].style;
          const iBarStyle = arrayBars[iBar].style;
          swapIdxBarStyle.height = `${iHeight}px`;
          iBarStyle.height = `${swapIdxHeight}px`;
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, i * (300 / algoSpeed));
      }
      if (animate.swap !== undefined) {
        setTimeout(() => {
          const [startIdxBar, swapIdxBar, startIdxHeight, swapIdxHeight] =
            animate.swap;
          const startIdxBarStyle = arrayBars[startIdxBar].style;
          const swapIdxBarStyle = arrayBars[swapIdxBar].style;
          startIdxBarStyle.height = `${swapIdxHeight}px`;
          swapIdxBarStyle.height = `${startIdxHeight}px`;
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, i * (300 / algoSpeed));
      }
    }
  }

  function bubbleSort() {
    const animations = BubbleSort(Array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const animate = animations[i];
      const [barOneIdx, barTwoIdx, lastBar] = animate.compare;
      let color = i % 2 === 0 ? 'red' : '#1769aa';
      if (lastBar === 1) color = 'turquoise';
      setTimeout(() => {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const lastBarStyle = arrayBars[lastBar].style;
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
        lastBarStyle.backgroundColor = 'turquoise';
        if (i === animations.length - 1) {
          setDisableBttons(false);
          setSorted(true);
        }
      }, i * (300 / algoSpeed));

      if (animate.swap !== undefined) {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx, heightOne, heightTwo] = animate.swap;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${heightTwo}px`;
          barTwoStyle.height = `${heightOne}px`;
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, i * (300 / algoSpeed));
      }
    }
  }

  function selectionSort() {
    const animations = SelectionSort(Array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const animate = animations[i];
      const [indicatorBar, movingBar, firstBar] = animate.compare;
      let color = i % 2 === 0 ? 'red' : '#1769aa';
      if (firstBar === Array.length - 2) color = 'turquoise';
      setTimeout(() => {
        const indicatorBarStyle = arrayBars[indicatorBar].style;
        const movingBarStyle = arrayBars[movingBar].style;
        const firstBarStyle = arrayBars[firstBar].style;
        indicatorBarStyle.backgroundColor = color;
        movingBarStyle.backgroundColor = '#1769aa';
        if (i === animations.length - 1) {
          setDisableBttons(false);
          setSorted(true);
        }
        setTimeout(() => {
          firstBarStyle.backgroundColor = 'turquoise';
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, 0.5);
      }, i * (300 / algoSpeed));

      if (animate.swap !== undefined) {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx, heightOne, heightTwo] = animate.swap;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          barOneStyle.height = `${heightTwo}px`;
          barTwoStyle.height = `${heightOne}px`;
          if (i === animations.length - 1) {
            setDisableBttons(false);
            setSorted(true);
          }
        }, i * (300 / algoSpeed));
      }
    }
  }

  useEffect(() => {
    resetArray();
  }, [ArraySize, disableButtons]);

  return (
    <>
      <Box
        component='div'
        sx={{
          position: 'static',
          minHeight: '90px',
          backgroundColor: '#D3D3D3',
          overflow: 'hidden',
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <Box>
            <Button
              variant='contained'
              sx={{
                textTransform: 'none',
                backgroundColor: 'gray',
                '&:hover': { backgroundColor: 'white', color: 'black' },
              }}
              onClick={handleRandomize}
              disabled={disableButtons}
            >
              Randomize
            </Button>
          </Box>
          <Box>
            <Slider
              min={10}
              max={300}
              size='small'
              defaultValue={150}
              sx={{ width: '200px' }}
              onChange={handleArraySize}
              disabled={disableButtons}
            />
            <Typography>Array size</Typography>
          </Box>
          <Box>
            <Slider
              min={30}
              max={100}
              size='small'
              defaultValue={100}
              sx={{ width: '200px' }}
              onChange={handleAlgorithmSpeed}
              disabled={disableButtons}
            />
            <Typography>Algorithm speed</Typography>
          </Box>
          <Box>
            <FormControl
              fullWidth
              onChange={handleAlgoChange}
              disabled={disableButtons}
            >
              <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                Choose Algorithm
              </InputLabel>
              <NativeSelect
                defaultValue='mergeSort'
                inputProps={{
                  name: 'Choose Algorithm',
                  id: 'uncontrolled-native',
                }}
              >
                <option value='bubbleSort'>Bubble Sort</option>
                <option value='selectionSort'>Selection Sort</option>
                <option value='mergeSort'>Merge Sort</option>
                <option value='quickSort'>Quick Sort</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <Box>
            <Button
              variant='contained'
              size='large'
              sx={{
                textTransform: 'none',
                backgroundColor: 'yellow',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#d500f9', color: 'white' },
              }}
              onClick={handleSortVisualize}
              disabled={disableButtons}
            >
              Sort & Visualize
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        component='div'
        sx={{
          backgroundColor: '#eceff1',
          height: '100vh',
          overflowY: 'hidden',
        }}
      >
        <Container
          maxWidth='md'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box component='div' sx={{ display: 'flex' }}>
            {Array.map((val, idx) => (
              <Box
                component='div'
                key={idx}
                className='array-bar'
                id={idx}
                sx={{
                  width: `${750 / ArraySize}px`,
                  height: `${val}px`,
                  marginX: '1px',
                  backgroundColor: '#1769aa',
                  borderRadius: '2px',
                  fontSize: '8px',
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {ArraySize < 50
                  ? Number(
                      document.getElementById(idx).style.height.slice(0, -2)
                    )
                  : null}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default SortingVisualizer;
