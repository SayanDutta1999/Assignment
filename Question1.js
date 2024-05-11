/*
    1. Write a program in javascript to take two input arrays A & B and calculate which
    elements to delete from B and add to B to make B same as A. Try to provide an
    optimized solution.
    
    Example: Given A = [2, 5, 7] & B = [1, 2, 3, 4, 5], the result should be [[7], [1, 3, 4]].
    The first array of the result should contain elements to add and the second should
    contain elements to delete.



*/

// Answer 

const A = [2, 5, 7];
const B = [1, 2, 3, 4, 5];

// Declare a map to store the repeatative and non-repeatative elements from both A and B arrays
const hashArray = new Map();

// Merge both A and B arrays 
const tempArray = A.concat(B);

// Declare result array for storing the result
const result = [];


for (let i = 0; i < tempArray.length; i++) {
    // If the hash map doesn't stores the current array element as key
    // then below condition gets true and the elemnts set as a key  into the hash map 
    //  with the value of 1, this value 1 marks it's key as it's first entry.
    if (!hashArray.has(tempArray[i])) {
        hashArray.set(tempArray[i], 1);
    } else {
        // If the key is already exists in this hash map then 
        // in this else part the value will increament by 1.
        hashArray.set(tempArray[i], hashArray.get(tempArray[i]) + 1);
    }
}


let index = 0;
// Temporary array to store the element which needs to add into array B.
const temp1 = [];
for (let i = 0; i < A.length; i++) {
    // Traversing the array A to get the element which does not
    // exists into array B
    if (hashArray.get(A[i]) == 1) {
        temp1.push(A[i]);
    }
}

result[index++] = temp1;
// Temporary array to store the element which needs to deleted from array B.
const temp2 = [];
for (let i = 0; i < B.length; i++) {
    // Traversing the array B to get the element which need to be
    // delete from array B.
    if (hashArray.get(B[i]) == 1) {
        temp2.push(B[i]);
    }
}

result[index++] = temp2;

console.log(result);












