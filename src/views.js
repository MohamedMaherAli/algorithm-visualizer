import { Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import SortingVisualizer from './components/SortingVisualizer/sortingVisualizer';
import PathfindingVisualizer from './components/PathVisualizer/pathfindingVisualizer';
function Views() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/sort' element={<SortingVisualizer />} />
      <Route path='/path' element={<PathfindingVisualizer />} />
    </Routes>
  );
}

export default Views;
