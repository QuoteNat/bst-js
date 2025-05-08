import { Tree } from "./bst.js";

let test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log("Building from " + JSON.stringify(test));
let testTree = new Tree();
testTree.buildTree(test);
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(testTree.root);
console.log("Inserting 100:");
testTree.insert(100);
prettyPrint(testTree.root);
testTree.delete(9);
prettyPrint(testTree.root);
