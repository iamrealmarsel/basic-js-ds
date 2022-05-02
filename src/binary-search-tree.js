const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
      return;
    }

    let checkedNode = this._root;

    while (true) {
      if (data < checkedNode.data) {
        if (!checkedNode.left) {
          checkedNode.left = new Node(data);
          break;
        } else {
          checkedNode = checkedNode.left;
        }
      } else if (data > checkedNode.data) {
        if (!checkedNode.right) {
          checkedNode.right = new Node(data);
          break;
        } else {
          checkedNode = checkedNode.right;
        }
      } else if (data === checkedNode.data) {
        break;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    if (!this._root) return null;

    let checkedNode = this._root;

    while (true) {
      if (data === checkedNode.data) {
        return checkedNode;
      } else if (data < checkedNode.data) {
        if (!checkedNode.left) {
          return null;
        } else {
          checkedNode = checkedNode.left;
        }
      } else if (data > checkedNode.data) {
        if (!checkedNode.right) {
          return null;
        } else {
          checkedNode = checkedNode.right;
        }
      }
    }
  }

  _findMin(node) {
    let checkedNode = node;

    while (true) {
      if (!checkedNode.left) return checkedNode;
      checkedNode = checkedNode.left;
    }
  }

  _removeNode(parentNode, direction, checkedNode) {
    if (checkedNode === this._root) {
      if (!checkedNode.left && !checkedNode.right) {
        this._root = null;
      } else if (checkedNode.left && !checkedNode.right) {
        this._root = checkedNode.left;
      } else if (!checkedNode.left && checkedNode.right) {
        this._root = checkedNode.right;
      } else if (checkedNode.left && checkedNode.right) {
        const parentMinNode = checkedNode.right;
        const minNode = this._findMin(checkedNode.right);
        parentMinNode.left = minNode.right;
        this._root = minNode;
        minNode.left = checkedNode.left;
        minNode.right = checkedNode.right;
        checkedNode = null;
      }
    } else if (!checkedNode.left && !checkedNode.right) {
      parentNode[direction] = null;
      checkedNode = null;
    } else if (checkedNode.left && !checkedNode.right) {
      parentNode[direction] = checkedNode.left;
      checkedNode = null;
    } else if (!checkedNode.left && checkedNode.right) {
      parentNode[direction] = checkedNode.right;
      checkedNode = null;
    } else if (checkedNode.left && checkedNode.right) {
      const parentMinNode = checkedNode.right;
      const minNode = this._findMin(checkedNode.right);
      parentMinNode.left = minNode.right;
      parentNode[direction] = minNode;
      minNode.left = checkedNode.left;
      minNode.right = checkedNode.right;
      checkedNode = null;
    }
  }

  remove(data) {
    if (!this._root) return;

    let checkedNode = this._root;
    let parentCheckedNode;
    let direction;

    while (true) {
      if (data === checkedNode.data) {
        this._removeNode(parentCheckedNode, direction, checkedNode);
        checkedNode = null;
        return;
      } else if (data < checkedNode.data) {
        if (!checkedNode.left) {
          return;
        } else {
          parentCheckedNode = checkedNode;
          direction = 'left';
          checkedNode = checkedNode.left;
        }
      } else if (data > checkedNode.data) {
        if (!checkedNode.right) {
          return;
        } else {
          parentCheckedNode = checkedNode;
          direction = 'right';
          checkedNode = checkedNode.right;
        }
      }
    }
  }

  min() {
    if (!this._root) return null;

    let checkedNode = this._root;

    while (true) {
      if (!checkedNode.left) return checkedNode.data;
      checkedNode = checkedNode.left;
    }
  }

  max() {
    if (!this._root) return null;

    let checkedNode = this._root;

    while (true) {
      if (!checkedNode.right) return checkedNode.data;
      checkedNode = checkedNode.right;
    }
  }
}

module.exports = {
  BinarySearchTree,
};
