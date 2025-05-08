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

function balance(array) {
  // Base case
  if (array.length == 0) {
    return null;
  } else if (array.length == 1) {
    return new Node(array[0]);
  }
  let middle = Math.floor(array.length / 2);
  let value = array[middle];
  let left = balance(array.slice(0, middle));
  let right = balance(array.slice(middle + 1));
  return new Node(value, left, right);
}

export class Tree {
  root = null;
  comparison = (left, right) => {
    return left < right;
  };
  buildTree(array) {
    let set = new Set(array);
    let sorted = mergesort(Array.from(set), this.comparison);
    this.root = balance(sorted);
  }

  insert(value) {
    let currentNode = this.root;
    while (currentNode !== null) {
      let comparison = this.comparison(value, currentNode.value);
      // If less than value
      if (comparison) {
        if (currentNode.left == null) {
          currentNode.left = new Node(value);
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right == null) {
          currentNode.right = new Node(value);
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  delete(value, node = this.root) {
    let previousNode = null;
    let currentNode = node;
    while (currentNode !== null && currentNode.value !== value) {
      let comparison = this.comparison(value, currentNode.value);
      previousNode = currentNode;
      if (comparison) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (currentNode == null) return false;
    // Note, the code needs to remove the trees references
    // Case 1: leaf node/no child nodes
    if (previousNode !== null) {
      let comparison = this.comparison(value, previousNode.value);
      if (currentNode.left == null && currentNode.right == null) {
        if (comparison) {
          previousNode.left = null;
        } else {
          previousNode.right = null;
        }
        return true;
      } // Case 2: Single child
      else if (currentNode.left != null && currentNode.right == null) {
        if (comparison) {
          previousNode.left = currentNode.left;
        } else {
          previousNode.right = currentNode.left;
        }
      } else if (currentNode.left == null && currentNode.right != null) {
        if (comparison) {
          previousNode.left = currentNode.right;
        } else {
          previousNode.right = currentNode.right;
        }
      } // Case 3: two children!
      else {
        // Find the inorder successor of the current node
        let inOrderNode = currentNode.right;
        while (inOrderNode.left !== null) {
          inOrderNode = inOrderNode.left;
        }
        currentNode.value = inOrderNode.value;
        this.delete(inOrderNode.value, currentNode.right);
      }
    } // same stuff but with the root node
    else {
      if (currentNode.left == null && currentNode.right == null) {
        this.head = null;
        return true;
      } // Case 2: Single child
      else if (currentNode.left != null && currentNode.right == null) {
        this.head = currentNode.left;
      } else if (currentNode.left == null && currentNode.right != null) {
        this.head = currentNode.right;
      } // Case 3: two children!
      else {
        // Find the inorder successor of the current node
        let inOrderNode = currentNode.right;
        while (inOrderNode.left !== null) {
          inOrderNode = inOrderNode.left;
        }
        currentNode.value = inOrderNode.value;
        this.delete(inOrderNode.value, currentNode.right);
      }
    }
  }
}
