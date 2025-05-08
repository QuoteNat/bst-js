import { mergesort } from "./odin-recursion/mergesort.js";

class Node {
  value = null;
  left = null;
  right = null;

  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export class Tree {
  root = null;
  buildTree(array) {
    console.log(`Inputted array is ${JSON.stringify(array)}`);
    let set = new Set(array);
    let sorted = mergesort(Array.from(set), (left, right) => {
      return left < right;
    });
    console.log(`Sorted and deduplicated array is ${JSON.stringify(sorted)}`);
  }
}
