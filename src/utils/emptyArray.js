export default function emptyArray(arr) {
  arr.pop()
  if (arr.length) emptyArray(arr)
}