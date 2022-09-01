export default function BubbleSort(arr) {
  let animations = [];
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      let animate = {};
      animate.compare = [j, j + 1, i - 1];
      animations.push(animate);
      if (arr[j] > arr[j + 1]) {
        animate.swap = [j, j + 1, arr[j], arr[j + 1]];
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      animations.push(animate);
    }
  }
  return animations;
}
