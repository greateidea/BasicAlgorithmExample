// 二叉树和二叉查找树，下面所有对树的操作可以封装在类里
class Node {
	constructor(data, leftChild, rightChild) {
		this.data = data;
		this.leftChild = leftChild;
		this.rightChild = rightChild;
	}
}

let search_tree_root = new Node(33);

// 插入二叉搜索树节点
function inseartNode(rootNode, nodeToInseart) {
	if (!rootNode || !nodeToInseart) return;
	
	if(nodeToInseart.data < rootNode.data) {
		if(rootNode.leftChild != null) {
			inseartNode(rootNode.leftChild, nodeToInseart);
		} else {
			rootNode.leftChild = nodeToInseart;
		}
	} else {
		// 等于的情况和大于的情况作相同处理
		if(rootNode.rightChild != null) {
			inseartNode(rootNode.rightChild, nodeToInseart);
		} else {
			rootNode.rightChild = nodeToInseart;
		}
	}
}

// 构造二叉查找树
function buildSearchTree(searchTreeRoot) {
	const array = [16, 50, 13, 18, 34, 58, 15, 17, 25, 51, 66, 19, 27, 55];

	for(let data of array) {
		inseartNode(searchTreeRoot, new Node(data));
	}
}
buildSearchTree(search_tree_root);
console.log('binary search tree: ', search_tree_root);

// 二叉查找树中, 查找目标值对应的节点
function searchNode(rootNode, data) {
	if(!rootNode || data === undefined) return;
	
	if(rootNode.data === data) return rootNode;
	else if(rootNode.data > data) {
		return searchNode(rootNode.leftChild, data);
	} else if (rootNode.data < data) {
		return searchNode(rootNode.rightChild, data);
	}
	
	return null;
}

const data = searchNode(search_tree_root, 27);
console.log('searchNode ', data);

// 被删节点没有直接子节点 使指向被删节点的指针（或引用），指向undefined
// 被删节点如果只有一个直接字节点，则使指向被删节点的指针（或引用） 指向被删节点的子节点
function deleteNode(rootNode, data) {
	if(!rootNode || data === undefined) return;
	
	let nodeToDelete = rootNode;
	let parentOfNodeToDelete = '';
	let childOfNodeToDelete = '';
	
	while(nodeToDelete && nodeToDelete.data !== data) {
		parentOfNodeToDelete = nodeToDelete;
		if(nodeToDelete.data > data) {
			nodeToDelete = nodeToDelete.leftChild;
		} else {
			nodeToDelete = nodeToDelete.rightChild;
		}
	}
	
	if (!nodeToDelete) return null; // 未找到需要删除的节点
	
	// 被删节点有两个子节点
	if(nodeToDelete.leftChild && nodeToDelete.rightChild) {
		let minInRight = nodeToDelete.rightChild;
		let parentOfMinInRight = '';
		
		// 找到被删节点 右子节点中的 最小值对应节点
		while(minInRight.leftChild !== undefined) {
			parentOfMinInRight = minInRight;
			minInRight = minInRight.leftChild;
		}
		
		nodeToDelete.data = minInRight.data; // 将要删除节点的值替换为其右子节点的最小值
		// 替换后需要留下的最小值对应节点则应删除
		// 因为删除的这个节点是最小值对应的节点，意味着其没有做节点，最多只有一个节点
		// 此时删除逻辑通删除最多只有一个节点逻辑相同
		nodeToDelete = minInRight;
		parentOfNodeToDelete = parentOfMinInRight;
	}
	
	// 被删节点最多只有一个节点时
	// 找到其子节点
	if(nodeToDelete.leftChild) {
		childOfNodeToDelete = nodeToDelete.leftChild
	} else if(nodeToDelete.rightChild) {
		childOfNodeToDelete = nodeToDelete.rightChild;
	} else {
		childOfNodeToDelete = undefined;
	}
	
	// 使指向被删节点的指针（或引用），指向被删节点的子节点
	if(!parentOfNodeToDelete) {
		search_tree_root = childOfNodeToDelete; // 要删除的是根节点, 因为是操作因为是操作这里写死为search_tree_root，这里就写死为search_tree_root
	} else if(nodeToDelete === parentOfNodeToDelete.leftChild) {
		parentOfNodeToDelete.leftChild = childOfNodeToDelete;
	} else {
		parentOfNodeToDelete.rightChild = childOfNodeToDelete;
	}
	
	return data;
}

function deleteNodeTest() {
	const removedData = deleteNode(search_tree_root, 55);
	console.log('delete node: ', removedData, search_tree_root);
	
	const removedData2 = deleteNode(search_tree_root, 13);
	console.log('delete node: ', removedData2, search_tree_root);
	
	const removedData3 = deleteNode(search_tree_root, 18);
	console.log('delete node: ', removedData3, search_tree_root);
	
	// 删除根节点 可以自己另外再试一下
}

deleteNodeTest();
