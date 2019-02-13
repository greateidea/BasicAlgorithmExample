// 归并排序
// 时间(最好最坏平均)复杂度O(nlogn)空复杂度O(n)
// 归并排序使用递归 递归的时间复杂度也按递归的思路找出公式计算
function mergeSort(array, start, end) {
	if(start >= end) return;
	const firstHalfStart =  start;
	const firstHalfEnd = Math.floor((start + end) / 2);
	const secondHalfStart = firstHalfEnd + 1;
	const secondHalfEnd = end;
	
	mergeSort(array, firstHalfStart, firstHalfEnd);
	mergeSort(array, secondHalfStart, secondHalfEnd);
	
	// 这里其实应该将这个函数放在外面更好 将需要的信息作为参数传入
    // 不必每次递归 都重复声明这个函数通过闭包获取数据
	function mergeSection() {
		let i = start;
		let j = secondHalfStart;
		let tempArrayIndex = 0;
		const tempArray = new Array(end - start + 1);
		
		// 不停对比两个区间当前循环时的最小值，将得到的最小值放在临时区间中
		while (i <= firstHalfEnd && j <= secondHalfEnd) {
			if(array[i] <= array[j]) {
				tempArray[tempArrayIndex++] = array[i++];
			} else {
				tempArray[tempArrayIndex++] = array[j++];
			}
		}
		
		let clearStart = i;
		let clearEnd = firstHalfEnd;
		if (j <= secondHalfEnd) {
			clearStart = j;
			clearEnd = end;
		}
		
		// 对比完成后有个数组有剩余 将剩余的内容追加入临时区间 剩余内容是已有序的
		for (let i = clearStart; i <= clearEnd; i++) {
			tempArray[tempArrayIndex++] = array[i];
		}
		
		for (let i = start, tempArrayIndex = 0; i <= end; i++) {
			array[i] = tempArray[tempArrayIndex++];
		}
	}
	
	mergeSection();
}

function mergeSortTest() {
	const testArray = [23,432,5,31,4432,532,20,94,45,325,24,4,5,5,3,99,2,43,9,39,8,4,8,3,9,5,12,4,629,5,79,6,53,33,33,7,75,43,646,38,31,26,68,113,2,0,45,26];
	mergeSort(testArray, 0, testArray.length - 1);
	console.log('after mergeSort', testArray);
}

mergeSortTest();

// 快速排序 时间复杂度O(nlogn), 最坏时间复杂度O(n2) 原地不稳定排序
// 随机取数组中的值(设定为数组最后一项)，将大于该值的项放在左边，小于该值的项放在右边，
// 递归调用左边和右边
function quikSort(array, start, end) {
	if(!array || !Array.isArray(array) || array.length < 2) return;
	if(start >= end) return;
	
	const middleIndex = partition(array, start, end);
	quikSort(array, start, middleIndex - 1);
	quikSort(array, middleIndex + 1, end);
}

// 取传入数组最后一项作为中间值，将大于该值的放于左边，小于该值的放于右边
// 方法: 分为快慢指针，快指针初始位置为数组首位，慢指针为快指针前一位，
// 循环开始时, 快指针遍历到小于中间值的项时，慢指针前进一步，此时交换快慢指针位置的值，循环执行
// 遍历过程中，快慢指针只要遇到比中间值小的项就会立马交换慢指针前进一步的项
// 因此快慢指针之间的区间(包含慢指针不包含快指针，"(]"左开又闭区间)，只会留下比大于等于中间值的项，当遍历到最后时，快满指针以移动至紧靠最后一项的右端
// 区间左端只剩比中间值小的项，最后将最红一项即中间值项与快慢指针区间首位(即慢指针后一项)进行交换，完成分区。
function partition(array, start, end) {
	let biggerPreIndex = start - 1;
	let checkIndex = start;
	let middleValue = array[end];
	
	for(; checkIndex < end; ++checkIndex) {
		if(array[checkIndex] < middleValue) {
			++biggerPreIndex;
			if(biggerPreIndex < checkIndex) {
				swap(array, biggerPreIndex, checkIndex);
			}
		}
	}
	
	swap(array, biggerPreIndex + 1, end);
	
	return biggerPreIndex + 1;
}

function swap(array, targetIndex, newValueIndex) {
	const temp = array[targetIndex];
	array[targetIndex] = array[newValueIndex];
	array[newValueIndex] = temp;
}

function quikSortTest() {
	const testArray = [23,432,5,31,4432,532,20,94,45,325,24,4,5,5,3,99,2,43,9,39,8,4,8,3,9,5,12,4,629,5,79,6,53,33,33,7,75,43,646,38,31,26,68,113,2,0,45,26];

	quikSort(testArray, 0, testArray.length - 1);
	console.log('after quikSort: ', testArray);
}

quikSortTest();

// 利用快速排序思想寻找数组中第K大的值 例如[1, 2, 3, ..., 10]中寻找第5大的值为6
// 第K大的值在数组中意味着是数组中排好序情况下,下标为: 数组长度 - K 的值
// 而快速排序每次分区都会确定一个分区位置，这分区位置即排好序后就该在的位置
// 因此 数组长度 - K 的值与该位置对比相等则是该项，大于则取右边继续递归，小于取左边继续递归
// 如果递归到最后达到递归结束条件则返回改值，说明到最后才找到该值。
function searchK(array, k) {
	const newk = array.length - k;
	return doSearchK(array, 0, array.length - 1, newk);
}

function doSearchK(array, start, end, k) {
	if(start >= end) return array[k];
	
	const middleIndex = partition(array, start, end);
	
	if (k > middleIndex) {
		return doSearchK(array, middleIndex + 1, end, k);
	} else if(k < middleIndex) {
		return doSearchK(array, start, middleIndex - 1, k);
	} else {
		return array[k];
	}
}

function searchSortTest() {
	const testArray = [6,4,2,9,10,5,1,3,7,8];
	// const testArray = [1,2,3,4,5,6,7,8,9,10];
	const k = 5;
	const kValue = searchK(testArray, k);
	
	console.log('after searchK: ', kValue, testArray);
}

searchSortTest();