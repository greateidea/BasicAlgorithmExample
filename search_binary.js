// 二分查找
function binarySearchByLoop(array, searchValue) {
	if(!array || !Array.isArray(array) || array.length < 2) return;
	
	let low = 0;
	let high = array.length - 1;
	
	while(low <= high) {
		const middle = Math.floor(low + (high - low)/2);
		if(array[middle] > searchValue) {
			high = middle - 1;
		} else if(array[middle] < searchValue) {
			low = middle + 1;
		} else {
			return middle;
		}
	}
	
	return null;
}

function testBinarySearchByLoop() {
	const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	const findIndex = binarySearchByLoop(array, 11);
	console.log('after binarySeachrByLoop: ', findIndex);
}

testBinarySearchByLoop();

function binarySearchByRecursion(array, searchValue, low, high){
	if(!Number.isInteger(searchValue) || Number(low) < 0 || Number(high) < 0) return;
	if(low > high) return null;
	
	const middle = Math.floor(low + (high - low)/2);
	
	if(array[middle] > searchValue) {
		return binarySearchByRecursion(array, searchValue, low, middle - 1);
	} else if (array[middle] < searchValue) {
		return binarySearchByRecursion(array, searchValue, middle + 1, high);
	} else {
		return middle;
	}
};

function testBinarySearchByRecursion() {
	const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	const findIndex = binarySearchByRecursion(array, 11, 0, array.length);
	console.log('after binarySearchByRecursion: ', findIndex);
}

testBinarySearchByRecursion();

// 求一个数的平方根，精确到小数点后6位
// 利用二分查找先得到整数部分最接近的解x
// 然后利用二分查找从每个精度范围寻找最接近的解, x.1-x.9,x.01-x.09, x.001-x.009, ..., 最后得到解x.yqwertg
// 关于过程中的精度处理可以更好
function pfg(number, accuracy) {
	// 求解number分为小数和分小数两种情况
	if(number*number > 1) {
		// 先取的解的整数位
		const partOfInt = pfgOfInt(number);
		
		// 用整数位加上小数位开始求解
		return pfgOfFloat(partOfInt, number, accuracy = 6);
	} else {
		return pfgOfFloat(0, number, accuracy = 6);
	}
}

// 获取整数位
// 一轮循环得到整数位最接近的解
function pfgOfInt(number) {
	const numberOfInt = parseInt(number, 10);
	const array = new Array(numberOfInt);
	
	for(let i = 1; i <= numberOfInt; i++ ) {
		array[i] = i;
	}

	let low = 0;
	let high = array.length - 1;
	
	const searchValue = numberOfInt;
	
	while(low <= high) {
		const middle = Math.floor(low + (high - low)/2);
		if(array[middle] * array[middle] > searchValue) {
			high = middle - 1;
		} else if(array[middle] * array[middle] < searchValue) {
			low = middle + 1;
		} else {
			// 得到的整数位平方后和目标值一样则直接返回解
			return array[middle];
		}
	}
	
	// 循环停止则取平方后最近小于目标值的整数
	return array[high] * array[high] > searchValue ? array[high - 1] : array[high];
}

// 获取小数位
function pfgOfFloat(initialNumber, number, accuracy) {
	// i: 0.1 ->0.01 ... -> 0.000001, 小数点位数根据accuracy而定
	// 从 0.1-0.9精度中寻找最接近的解
	// 从 0.01-0.09精度中寻找最接近的解...
	// 从 0.000001-0.000009精度中寻找最接近的解
	// 每轮循环都从当前精度范围的值中(例如x.1-x.9)中求最近的解
	for(let i = 1/10; i >= 1/(Math.pow(10, accuracy)); i = i/10) {
		const array = new Array(10);
		
		// 初始化一个包含当前精度所有值的数组, 例如：x.1,x.2,...,x.9
		for(let j = 0; j < array.length - 1; j++) {
			array[j] = initialNumber + (j+1)*i;
		}
		
		// 若当前精度最小值的平方都大于目标值则直接循环进入下一精度求解
		// 例如 x.1*x.1都大于目标值, 则直接进入x.01-x.09求解
		if(Number(array[0] * array[0]).toFixed(accuracy) > number) {
			continue;
		} else {
			let low = 0;
			let high = array.length - 1;

			const searchValue = number;
			
			while(low <= high) {
				const middle = Math.floor(low + (high - low)/2);
				
				// 这里因为js精度问题 手动精度确定到12
				if(Number(array[middle] * array[middle]).toFixed(12) > searchValue) {
					high = middle - 1;
				} else if(Number(array[middle] * array[middle]).toFixed(12) < searchValue) {
					low = middle + 1;
				} else {
					return array[middle];
				}
			}
			
			// 得到当前精度最接近解的值
			initialNumber = array[high] * array[high] > searchValue ? array[high - 1] : array[high];
		}
	}
	
	// 这里因为js精度问题, 手动确定精度到accuracy
	return Number(Number(initialNumber).toFixed(accuracy));
}

function testPfg() {
	const result = pfg(5, 6);
	console.log('\'5\' afte pfg: ', result);
}

testPfg();
