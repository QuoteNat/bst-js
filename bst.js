import { mergesort } from "./odin-recursion/mergesort.js";

/**
 * Node class for use in binary trees
 */
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

/**
 * Creates a balanced BST from an array
 * @param {*} array
 * @returns the root node of the tree
 */
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

  /**
   * Comparison function
   * @param {*} left
   * @param {*} right
   * @returns boolean
   */
  comparison = (left, right) => {
    return left < right;
  };

  /**
   * Builds a new BST from the values in array
   * @param {*} array
   */
  buildTree(array) {
    let set = new Set(array);
    let sorted = mergesort(Array.from(set), this.comparison);
    this.root = balance(sorted);
  }

  /**
   * Inserts a new value into the binary tree
   * @param {*} value
   * @returns
   */
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

  /**
   * Deletes a value from the binary tree
   * @param {*} value
   * @param {*} node
   * @returns true if successful and false if the value is not in the tree
   */
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

  /**
   * Finds a value in the binary tree
   * @param {*} value
   * @returns The node containing the value, or null if it isn't found
   */
  find(value) {
    let currentNode = this.root;
    while (currentNode !== null && currentNode.value !== value) {
      let comparison = this.comparison(value, currentNode.value);
      if (comparison) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    if (currentNode) return currentNode;
    return null;
  }

  /**
   * Performs the callback on all nodes in the tree in levelorder
   * @param {*} callback
   */
  levelOrder(callback = null) {
    if (callback == null) throw new Error("levelOrder requires a callback");

    let queue = [this.root];
    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode.left != null) queue.push(currentNode.left);
      if (currentNode.right != null) queue.push(currentNode.right);
      callback(currentNode);
    }
  }

  /**
   * Performs the callback on all nodes in the tree in preorder
   * @param {*} callback
   */
  preorder(callback = null, node = this.root) {
    if (callback == null) throw new Error("preorder requires a callback");
    if (node === null) return;
    callback(node);
    this.preorder(callback, node.left);
    this.preorder(callback, node.right);
  }

  /**
   * Performs the callback on all nodes in the tree in order
   * @param {*} callback
   */
  inorder(callback = null, node = this.root) {
    if (callback == null) throw new Error("inorder requires a callback");
    if (node === null) return;
    this.inorder(callback, node.left);
    callback(node);
    this.inorder(callback, node.right);
  }

  /**
   * Performs the callback on all nodes in the tree in postorder
   * @param {*} callback
   */
  postorder(callback = null, node = this.root) {
    if (callback == null) throw new Error("postorder requires a callback");
    if (node === null) return;
    this.postorder(callback, node.left);
    this.postorder(callback, node.right);
    callback(node);
  }

  /**
   * Recursive helper function for finding height of a node
   * @param {*} node
   * @param {*} depth
   * @returns
   */
  #heightHelper(node, depth) {
    if (node == null) return true;

    let leftHeight = depth;
    let rightHeight = depth;
    if (node.left != null) {
      leftHeight = this.#heightHelper(node.left, depth + 1);
    }
    if (node.right != null) {
      rightHeight = this.#heightHelper(node.right, depth + 1);
    }
    console.log;
    return Math.max(leftHeight, rightHeight);
  }

  /**
   * Returns the height of a value in the tree
   * @param {*} value
   * @returns The height of the value, or null if it isn't found
   */
  height(value) {
    let node = this.find(value);
    if (node == null) return null;
    return this.#heightHelper(node, 0);
  }

  /**
   * Returns the depth of a value in the tree
   * @param {*} value
   * @returns The depth of the value, or null if it isn't found
   */
  depth(value) {
    let currentNode = this.root;
    let depth = 0;
    while (currentNode !== null && currentNode.value !== value) {
      let comparison = this.comparison(value, currentNode.value);
      if (comparison) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      depth += 1;
    }
    if (currentNode) return depth;
    return null;
  }

  /**
   * Recursive helper function for isBalanced.
   * @param {*} node
   * @returns true if both children of a node are balanced
   */
  #isBalancedHelper(node) {
    if (node == null) return true;
    let balanced =
      Math.abs(
        this.#heightHelper(node.left, 1) - this.#heightHelper(node.right, 1)
      ) <= 1;
    return (
      this.#isBalancedHelper(node.left) &&
      this.#isBalancedHelper(node.right) &&
      balanced
    );
  }

  /**
   * Returns whether the tree is balanced or not
   */
  isBalanced() {
    return this.#isBalancedHelper(this.root);
  }

  /**
   * Rebalances the tree
   */
  rebalance() {
    let values = [];
    this.inorder((node) => {
      values.push(node.value);
    }, this.root);
    this.buildTree(values);
  }
}
