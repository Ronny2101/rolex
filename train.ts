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

function areParenthesesBalanced(a: string) {
    let count = 0;
    for (let i = 0;
        i < a.length; 
        i++) {
            if (a[i] === '(') count++;
            else if(a[i] === ')') {
                count--;
                if (count < 0) return false;
            }
        }
        return count === 0;
}

console.log(areParenthesesBalanced("string()ichida(qavslar) soni()balansda"));
console.log(areParenthesesBalanced("string()ichida(qavslar) soni()balansda emas)"));