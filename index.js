class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor(array){
        this.array = [...sanitizeArray(array)];
        this.root = this.buildTree(this.array, 0, this.array.length - 1);
    };

    buildTree(array, start, end){

        //Caso base.
        if(start > end){
            return null;
        };
    
        let mid = Math.floor((start+end)/2);
        let node = new Node(array[mid]); 
    
        node.left = this.buildTree(array, start, mid-1);
        node.right = this.buildTree(array, mid+1, end );
    
        return node;
    };

    insert(root, value){
        if(root === null){
            root = new Node(value);
            return root;
        };

        if(root.data < value){
            root.right = this.insert(root.right, value);
        };
        if(root.data > value){
            root.left = this.insert(root.left, value);
        };

        return root;
    }
};

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



let array = [1,2,3,4];

let tree = new Tree(array)

console.log(tree);
console.log(tree.insert(tree.root, 0));
console.log(tree.insert(tree.root, 1.5));
console.log(tree.insert(tree.root, 3.5));
module.exports = {sanitizeArray};