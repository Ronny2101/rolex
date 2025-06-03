//Task ZJ

function reduceNestedArray(array: any[]) {
    let son = 0;

    for(const val of array) {
        son += Array.isArray(val) 
        ? reduceNestedArray(val) 
        : val;
    }

    return son;
}

console.log(reduceNestedArray([1, [1, 2, [4]]]));