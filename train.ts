//Task ZJ

// function reduceNestedArray(array: any[]) {
//     let son = 0;

//     for(const val of array) {
//         son += Array.isArray(val) 
//         ? reduceNestedArray(val) 
//         : val;
//     }

//     return son;
// }

// console.log(reduceNestedArray([1, [1, 2, [4]]]));


//Task ZK

// function printNumbers(a: number = 1) {
//   if (a > 5) return;
//     setTimeout(() => printNumbers(a + 1), 1000);
//     console.log(a);
// }

// printNumbers();


//Task ZM

// function reverseInteger(a: number) {
//     const reversed = Number(a.toString().split('').reverse().join(''));
//     return reversed;
// }


// console.log(reverseInteger(123456789));

//Task ZL

// function stringToKebab(a: string) {
//     return a.toLowerCase().split(' ').join('-');
// }


// console.log(stringToKebab("I Love Kebab"));

//Task ZN

// function rotateArray(array: number[], index: number) {
//     return[...array.slice(index + 1), ...array.slice(0, index + 1)];
// }


// console.log(rotateArray([1, 2, 3, 4, 5, 6, ], 3));

//Task ZO

// function areParenthesesBalanced(a: string) {
//     let count = 0;
//     for (let i = 0;
//         i < a.length; 
//         i++) {
//             if (a[i] === '(') count++;
//             else if(a[i] === ')') {
//                 count--;
//                 if (count < 0) return false;
//             }
//         }
//         return count === 0;
// }

// console.log(areParenthesesBalanced("string()ichida(qavslar) soni()balansda"));
// console.log(areParenthesesBalanced("string()ichida(qavslar) soni()balansda emas)"));

//Task ZP

// function areArraysEqual(a: any[], b: any[]) {
//     return [...new Set(a)].sort().toString() === [...new Set(b)].sort().toString();
//   }

//   console.log(areArraysEqual([1,2,3], [3,1,2]));
//   console.log(areArraysEqual([1,2,3], [3,1,5,2,1]));
//   console.log(areArraysEqual([1,2,3], [4,1,2]));

//Task ZQ

// function findDuplicates(a: number[]) {
//   const count: Record<number, number> = {};
//   a.forEach(n => count[n] = (count[n] || 0) + 1);
//   return [...new Set(a.filter(n => count[n] > 1))];
// }

// console.log(findDuplicates([1, 2, 3, 4, 5, 4, 3,4]));

//TASK ZR

// function countNumberAndLetters(a: string) {
//   let number = 0, letter = 0;

//   for (const char of a) {
//     if (/[0-9]/.test(char)) number++;
//     else if (/[a-zA-Z]/.test(char)) letter++;
//   }
//   return { number, letter };
// }

// console.log(countNumberAndLetters("string1523%&"));

//TASK ZS 

// function singleNumber(arr: number[]) {
//   return arr.find(x => arr.indexOf(x) === arr.lastIndexOf(x));
// }

// console.log(singleNumber([4, 2, 1, 2, 1]));

//TASK ZT

// function firstUniqueCharIndex(str: string) {
//   for (let i = 0; i < str.length; i++) {
//     if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return i;
//   }
//   return -1
// }


// console.log(firstUniqueCharIndex("stamp"));
// console.log(firstUniqueCharIndex("sstammpp"));

//Task ZU

function sumOfUnique(num: number[]) {
  return num.filter(n => num.indexOf(n) === num.lastIndexOf(n)).reduce((sum, n ) => sum + n, 0);
}

console.log(sumOfUnique([1, 2, 3, 2, 5, 4]));