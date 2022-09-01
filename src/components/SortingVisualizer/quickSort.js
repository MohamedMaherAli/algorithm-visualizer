export default function QuickSort(arr) {
  let animations = [];
  QuickSortHelper(arr, 0, arr.length - 1, animations);
  return animations;
}

function QuickSortHelper(arr, left = 0, right = arr.length - 1, animations) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right, animations);
    QuickSortHelper(arr, left, pivotIndex - 1, animations);
    QuickSortHelper(arr, pivotIndex + 1, right, animations);
  }
}

function pivot(arr, startIdx, endIdx, animations) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };
  let pivot = arr[startIdx];
  let swapIdx = startIdx;
  for (let i = startIdx + 1; i <= endIdx; i++) {
    var animate = {};
    animate.compare = [swapIdx, i];
    animations.push(animate);
    if (pivot > arr[i]) {
      swapIdx++;
      animate.smallSwap = [swapIdx, i, arr[swapIdx], arr[i]];
      animations.push(animate);
      swap(arr, swapIdx, i);
    }
  }

  animate.swap = [startIdx, swapIdx, arr[startIdx], arr[swapIdx]];
  animations.push(animate);
  swap(arr, startIdx, swapIdx);

  return swapIdx;
}
