const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    if (!this.rootNode) {
      return null;
    } else {
      return this.rootNode;
    }
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode !== null) {
      this.addNode(this.rootNode, newNode);
    } else {
      this.rootNode = newNode;
    }
  }

  addNode(parent, child) {
    if (child.data < parent.data) {
      if (parent.left !== null) {
        this.addNode(parent.left, child)
      } else {
        parent.left = child;
      }
    } else if (child.data > parent.data) {
      if (parent.right !== null) {
        this.addNode(parent.right, child)
      } else {
        parent.right = child;
      }
    } else {
      console.log(`Error, ${child.data} is already exists`)
    }
  }

  has(data) {
    return this.search(this.rootNode, data) !== null;
  }

  search(currentNode, data) {
    if (currentNode !== null) {
      if (currentNode.data > data) {
        return this.search(currentNode.left, data);
      } else if (currentNode.data < data) {
        return this.search(currentNode.right, data);
      } else {
        return currentNode;
      }
    }
    return null;
  }

  find(data) {
    return this.search(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this.deleteNode(this.rootNode, data);
  }

  deleteNode(currentNode, data) {
    if (currentNode === null) {
      return null;
    } else if (currentNode.data > data) {
      currentNode.left = this.deleteNode(currentNode.left, data);
      return currentNode;
    } else if (currentNode.data < data) {
      currentNode.right = this.deleteNode(currentNode.right, data);
      return currentNode;
    } else {

      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      }
      const minNode = this.findMinNode(currentNode.right);
      currentNode.data = minNode.data;
      currentNode.right = this.deleteNode(currentNode.right, minNode.data);
      return currentNode;
    }

  }

  min() {
    if (!this.rootNode) return null;
    return this.findMinNode(this.rootNode).data;
  }

  findMinNode(currentNode) {
    if (currentNode.left === null) {
      return currentNode;
    } else {
      return this.findMinNode(currentNode.left);
    }
  }

  max() {
    if (!this.rootNode) return null;
    return this.findMaxNode(this.rootNode).data;
  }

  findMaxNode(currentNode) {
    if (currentNode.right === null) {
      return currentNode;
    } else {
      return this.findMaxNode(currentNode.right);
    }
  }
}

module.exports = {
  BinarySearchTree
};

// const tree = new BinarySearchTree();
// tree.add(20);
// tree.add(10);
// tree.add(30);
// tree.add(1);
// console.log(tree.min());

// console.log(tree);
