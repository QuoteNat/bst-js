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
    let sorted = mergesort(array, (left, right) => {
      return left < right;
    });
    console.log(sorted);
  }
}
