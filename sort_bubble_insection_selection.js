// 冒泡排序，插入排序，选择排序种最实用的是插入排序
// 选择排序不是稳定的排序，插入排序比冒泡排序操作数更少
// 最好情况选择排序复杂度O(n2), 另外两个O(n)
function bubbleSort(array) {
	if(!array || !Array.isArray(array) || array.length < 2) return;
	
	let isAction = false;
	
	for(let i = 0 ; i < array.length - 1; i++) {
		for(let j = 0; j < array.length - i - 1; j++) {
			if(array[j] > array[j+1]) {
				const temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;
				isAction = true;
			}
		}
		
		if (!isAction) break; 
	}
}

function bubbleSortTest() {
	const testArray = [23,432,5,31,4432,532,20,94,45,325,24,4,5,5,3,99,2,43,9,39,8,4,8,3,9,5,12,4,629,5,79,6,53,33,33,7,75,43,646,38,31,26,68,113,2,0,45,26];
	bubbleSort(testArray);
	console.log('after bubbleSort: ', testArray);
}

bubbleSortTest();

// 插入排序 实际上是从右至反方向冒泡
function insertionSort(array) {
	if(!array || !Array.isArray(array) || array.length < 2) return;
	
	for(let i = 1; i < array.length; i++) {
		const temp = array[i];
		let j = i - 1;
		
		for(; j >= 0 ; j--) {
			if(array[j] > temp) {
				array[j+1] = array[j];
			} else {
				break;
			}
		}
		
		array[j+1] = temp;
	}
}

function testInsertionSort() {
	const testArray = [23,432,5,31,4432,532,20,94,45,325,24,4,5,5,3,99,2,43,9,39,8,4,8,3,9,5,12,4,629,5,79,6,53,33,33,7,75,43,646,38,31,26,68,113,2,0,45,26];
	insertionSort(testArray);
	console.log('after insertionSort', testArray);
}

testInsertionSort()

// 选择排序 每次从未排序列中选出最小值的位置，将其放在未拍序列首位，即最小值与该首位调换位置，依次循环
// 属于不稳定排序 实际上和冒泡排序有异曲同工之妙
function selectionSort(array) {
	if(!array || !Array.isArray(array) || array.length < 2) return;
	
	for (let i = 0; i < array.length - 1; i++) {
		let min = array[i];
		let minIndex = i;
		
		for(let j = i; j < array.length; j++) {
			if(array[j] < min) {
				min = array[j];
				minIndex = j;
			}
		}
		
		const temp = array[i];
		array[i] = array[minIndex];
		array[minIndex] = temp;
	}
}

function selectionSortTest() {
	const testArray = [23,432,5,31,4432,532,20,94,45,325,24,4,5,5,3,99,2,43,9,39,8,4,8,3,9,5,12,4,629,5,79,6,53,33,33,7,75,43,646,38,31,26,68,113,2,0,45,26];
	selectionSort(testArray);
	console.log('after selectionSort: ', testArray);
}

selectionSortTest();