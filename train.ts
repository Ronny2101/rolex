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

function stringToKebab(a: string) {
    return a.toLowerCase().split(' ').join('-');
}


console.log(stringToKebab("I Love Kebab"));