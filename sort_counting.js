// 计数排序
// 当数组范围远小于数组长度时可以考虑使用
// 对目标数组内每个值的数量进行计数，并将数量按照对应值的大小顺序，存储在另一个数组中 [0,0,1,1,3,3] -> [2,2,0,2]
// 对存储数量的数组顺序求和，[0,0,1,1,3,3] -> [2,2,0,2] -> [2,4,4,6]
// ...
function countingSort(array) {
	if(!array || !Array.isArray(array) || array.length < 2) return;

	// 查询数组计数范围
	let max = 0;
	let min = 0;
	
	for(let i = 0; i < array.length; i++) {
		if(array[i] > max) {
			max = array[i];
		} else if(array[i] < min) {
			min = array[i];
		}
	}
		
	// 申请计数数组 默认填充计数为0
	const countingArray = new Array(max - min + 1).fill(0);
	
	// 根据数组范围计数
	for(let i = 0; i < array.length; i++) {
		countingArray[array[i]] = ++countingArray[array[i]];
	}
	
	// 累加计数数组
	for(let i = 1; i < countingArray.length; i++) {
		countingArray[i] = countingArray[i] + countingArray[i - 1];
	}
	
	// 申请临时排序数组
	const tempSortArray = new Array(array.length);
	for(let i = 0; i < array.length; i++) {
		// 注意细节，累计数值减一才是目标数组中值的排序位置
		// 例如: [0,0,1,1] -> [2,2] -> [2,4], 第一个检测到的1的排序位置是3。
		tempSortArray[--countingArray[array[i]]] = array[i];
	}
	
	// 目标数组替换为临时数组
	for(let i = 0; i < array.length; i++) {
		array[i] = tempSortArray[i];
	}
}

function testcountingSort() {
	const testArray = [3,4,2,5,6,4,3,2,1,4,0,6,5,1,2,3,4,5,4,1];
	countingSort(testArray);
	console.log('after countingSort: ', testArray);
}

testcountingSort();