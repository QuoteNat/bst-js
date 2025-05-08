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
console.log("Deleting 9:");
testTree.delete(9);
prettyPrint(testTree.root);
console.log("Deleting 324:");
testTree.delete(324);
prettyPrint(testTree.root);
console.log("Deleting 8:");
testTree.delete(8);
prettyPrint(testTree.root);
console.log("Find 6345: " + JSON.stringify(testTree.find(6345)));
console.log("Find 88: " + testTree.find(88));
console.log("Level order traversal:");
testTree.levelOrder((node) => console.log(node.value));
console.log("Preorder traversal:");
testTree.preorder((node) => console.log(node.value));

console.log("Inorder traversal:");
testTree.inorder((node) => console.log(node.value));

console.log("Postorder traversal:");
testTree.postorder((node) => console.log(node.value));

console.log("Height of root: " + testTree.height(23));
console.log("Depth of 6345: " + testTree.height(6345));

let testBalanceArray = [];
for (let i = 0; i < 10; i++) {
  testBalanceArray.push(Math.floor(Math.random() * 100));
}

testTree.buildTree(testBalanceArray);
prettyPrint(testTree.root);
console.log(testTree.isBalanced());
testTree.insert(101);
testTree.insert(102);
testTree.insert(103);
prettyPrint(testTree.root);
console.log(testTree.isBalanced());
