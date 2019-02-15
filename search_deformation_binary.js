// 使用二分查找在循环有序数组中查找目标值
// 针对的是先倒序再顺序的数组
function searchK(array, target) {
	let low = 0;
	let high = array.length - 1;
	let middle = '';
	let middleEnterRight = false; // middle是否位于右边，位于右边的判断更简单
	let reverOrder = false; // 判断是否进入倒序区间, 这将影响循环结束的判断条件
	
	while(reverOrder ? low >= high : low <= high) {
		middle = low + ((high - low) >> 1);
		
		if (target === array[middle]) {
			return middle
		}
		
		if(target === array[low]) {
			return low;
		}
		
		if(target === array[high]) {
			return high;
		}
		
		middleEnterRight = array[middle] < array[high];
			
		if(middleEnterRight) {
			// middle 位于右边则判断target是否都位于middle的右边
			//是则改变low可让target已经进入有序区间,否则让区间向target靠拢
			if(target > array[middle] && target < array[high]) {
				low = middle + 1;
			} else {
				high = middle - 1;
			}
		} else {
			// middle 位于左边则判断target是否都位于middle的左边
			// 是则改变low,high可让target已经进入有序区间,否则让区间向target靠拢
			if( target > array[middle]) {
				high = low;
				low = middle - 1;
				reverOrder = true;
			} else {
				low = middle + 1;
			}
		} 
	}
	
	return null;
}

function testsearchK() {
	const array = [16,15,14,13,12,11,10,9,8,7,1,2,3,4,5,6]; // 先倒序再顺序的数组
	const result1 = searchK(array, 8);
	const result2 = searchK(array, 7);
	const result3 = searchK(array, 1);
	const result4 = searchK(array, 2);
	const result5 = searchK(array, 16);
	const result6 = searchK(array, 6);
	
	console.log('array:', array);
	console.log('after searchK(8,7,1,2,16,6): ', result1,result2,result3,result4,result5,result6);
}

testsearchK();
