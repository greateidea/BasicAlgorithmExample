class Heap {
	constructor(n) {
		if(Array.isArray(n) && n.length >= 2) {
			this.heap = this.build(n);
			this.count = n.length - 1;
			this.n = n.length - 1;
		} else if(Number(n) !== NaN) {
			this.heap = new Array(n + 1); // n为4 [undefined, 1,2,3,4];
			this.count = 0;
			this.n = n;
		}
	}
	
	build(array) {
		if(!Array.isArray(array) && array.length < 2) return;
		let len = array.length - 1;
	
		// len/2之前的都是非叶子节点，len/2之后的都是叶子节点
		for(let i = parseInt(len >> 1, 10); i >= 1; --i) {
			Heap.heapify(array, i, array.length - 1);
		}
		
		return array;
	}
	
	static heapify(array, currentPosition, count) {
		const len = count;
		
		while(true) {
			let maxPosition = currentPosition;
			let leftChildPosition = currentPosition * 2;
			let rightChildPosition = currentPosition * 2 + 1;

			if(leftChildPosition <= len && array[currentPosition] < array[leftChildPosition]) maxPosition = leftChildPosition;
			if(rightChildPosition <= len && array[maxPosition] < array[rightChildPosition]) maxPosition = rightChildPosition;
			if(currentPosition === maxPosition) break;
			
			Heap.swap(array, currentPosition, maxPosition);
			currentPosition = maxPosition;
		}
	}
	
	static swap(array, position1, position2) {
		const temp = array[position1];
		array[position1] = array[position2];
		array[position2] = temp;
	}
	
	insert(data) {
		if(this.count >= this.n) {
			this.heap.push(data);
			this.count++;
		} else {
			this.heap[++this.count] = data;
		}
		
		let currentPosition = this.count;
		while(parseInt(currentPosition >> 1, 10) > 0 && this.heap[currentPosition] > this.heap[parseInt(currentPosition >> 1, 10)]) {
			Heap.swap(this.heap, currentPosition, parseInt(currentPosition >> 1, 10));
			currentPosition = parseInt(currentPosition >> 1, 10);
		}
		
		return data;
	}
	
	removeMax() {
		if(this.count < 1) return;
		
		this.heap[1] = this.heap[this.count--];
		Heap.heapify(this.heap, 1, this.count);
	}
	
	// 堆排序时间复杂度O(nlogn) 不稳定排序
	static sort(heapObj) {
		function doSort(array) {
			for(let i = array.length - 1; i > 1;) {
				Heap.swap(array, 1, i--);
				Heap.heapify(array, 1, i);
			}
		}
		
		if((heapObj instanceof Heap) && heapObj.count > 1) {
			doSort(heapObj.heap);
		} else if(Array.isArray(heapObj) && heapObj.length > 2) {
			doSort(heapObj);
		}
	}
}

// 构造堆
function buildTest() {
	console.log('after buildHead: ', new Heap([, 7, 5, 19, 8, 4, 1, 20, 13, 16]).heap);
}

buildTest();

// 堆插入
function inserTest() {
	const newHeap = new Heap([, 33, 27, 21, 16, 13, 15, 9, 5, 6, 7, 8, 1, 2]);
	newHeap.insert(22);
	console.log('after insert data to heap: ', newHeap.heap);
}

inserTest();

// 删除堆顶元素
function removeMaxTest() {
	const newHeap = new Heap([, 33, 27, 21, 16, 13, 15, 19, 5, 6, 7, 8, 1, 2, 12]);
	newHeap.removeMax();
	console.log('after removeMaxTest: ', newHeap.heap);
}

removeMaxTest();

// 堆排序
function sortTest() {
	const heapObj = new Heap([, 9, 6, 3, 1, 5])
	Heap.sort(heapObj);
	console.log('after Heap sort(Heap): ', heapObj.heap);
	
	const array = [, 9, 6, 3, 1, 5];
	Heap.sort(array);
	console.log('after Heap sort(Array): ', array);
}

sortTest();
