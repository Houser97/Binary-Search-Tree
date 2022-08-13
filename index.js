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