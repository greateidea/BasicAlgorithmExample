class Node {
	constructor(data, leftChild, rightChild) {
		this.data = data;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}
}

let rootNode = '';

// 构造一个四层的链表存储的二叉树满树
// 构造算法同样适用于按层遍历二叉树
function build_binary_tree() {
	const queen = [];
	let count = 0;
	const maxCount = 15;
	rootNode = new Node(++count);
	
	queen.push(rootNode);
	
	function do_build_binary_tree() {
		if(count > maxCount - 2) return;
		
		const currentNode = queen.shift();
		currentNode.leftChild = new Node(++count);
		currentNode.rightChild = new Node(++count);
		
		queen.push(currentNode.leftChild, currentNode.rightChild);
		do_build_binary_tree();
	}
	
	do_build_binary_tree();
}

build_binary_tree();
console.log('rootNode: ', rootNode);

// 前序遍历二叉树
function preOrder(node) {
	if(!node) return;
	
	console.log(`node ${node.data}`);
	preOrder(node.leftChild);
	preOrder(node.rightChild);
}

console.log('preOrder: ');
preOrder(rootNode);

// 中序遍历二叉树
function inOrder(node) {
	if(!node) return;
	
	inOrder(node.leftChild);
	console.log(`node ${node.data}`);
	inOrder(node.rightChild);
}

console.log('inOrder: ');
inOrder(rootNode);

// 后序序遍历二叉树
function postOrder(node) {
	if(!node) return;
	
	postOrder(node.leftChild);
	postOrder(node.rightChild);
	console.log(`node ${node.data}`);
}

console.log('postOrder: ');
postOrder(rootNode);
