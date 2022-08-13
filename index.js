class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor(root){
        this.root = root;
    };
};

function sortedArrayToBST(array, start, end){

    //Caso base.
    if(start > end){
        return null;
    };

    let mid = Math.floor((start+end)/2);
    let node = new Node(array[mid]); 

    node.left = sortedArrayToBST(array, start, mid-1);
    node.right = sortedArrayToBST(array, mid+1, end );

    return node;
}

const mergeSort = (array) => {
    if(array.length <= 1) return array;
    let result = [];

    let firstHalf = array.slice(0, Math.ceil(array.length/2));
    let secondHalf = array.slice(Math.ceil(array.length/2));

    if(firstHalf.length >= 2){
        firstHalf = mergeSort(firstHalf);
    };

    if(secondHalf.length >= 2){
        secondHalf = mergeSort(secondHalf);
    };

    if(firstHalf.length === 1 && secondHalf.length === 1){
        if(firstHalf[0] <= secondHalf[0]){
            return [...firstHalf, ...secondHalf];
        } else {
            return [...secondHalf, ...firstHalf];
        }
    };

    let continueLoop = true;
    while(continueLoop){
        if(firstHalf[0] < secondHalf[0]){
            result.push(firstHalf.shift());
        } else if(firstHalf[0] > secondHalf[0]){
            result.push(secondHalf.shift());
        } else if(firstHalf[0] === secondHalf[0]){
            result.push(firstHalf.shift());
            result.push(secondHalf.shift());
        }
        if(firstHalf.length === 0 && secondHalf.length>0){
            result = [...result, ...secondHalf];
            continueLoop = false;
        } else if(firstHalf.length > 0 && secondHalf.length === 0){
            result = [...result, ...firstHalf];
            continueLoop = false;
        } else if(firstHalf.length === 0 && secondHalf.length === 0){
            continueLoop = false;
        }
    };

    return result;
 };

const removeDuplicates = (array) => {
    let arrayResult = [];
    
    array.forEach(number => {
        if(!arrayResult.includes(number)){
            arrayResult.push(number);
        };
    });
    return arrayResult;
};

const sanitizeArray = (array) => {
    let result = [];
    result = removeDuplicates(array);
    result = mergeSort(result);
    return result;
}

module.exports = {sanitizeArray};