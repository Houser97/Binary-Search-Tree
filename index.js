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
    };

    remove(root, value){
        //Caso base: El árbol está vacío o el nodo a eliminar no está en el espacio de búsqueda.
        if(root === null){
            return root;
        };

        // 1) Buscar el nodo a eliminar recursivamente.
        // Se asigna el nodo a retornar a RIGHT o LEFT, ya que deben apuntar apuntar a NULL o al hijo
        // del nodo a eliminar.
        if(value > root.data){
            root.right = this.remove(root.right, value);
        } else if (value < root.data){
            root.left = this.remove(root.left, value)
        } else { //En otro caso, el valor es igual al del nodo, por lo que se halló el nodo a eliminar.
        //2) Revisar que el nodo a eliminar tenga hijos
            // 2.1) Si el nodo no tiene hijos, o solo 1.
            if(root.left === null){
                return root.right;
            } else if (root.right === null){
                return root.left;
            } else {
                //2.2) El nodo tiene dos hijos, por lo que se debe hallar el valor máximo más próximo
                // al del nodo a eliminar al caminar por la parte derecha del árbol hasta llegar al nodo
                // hoja más a la izquierda.

                root.data = this.nextBiggerNode(root.right);

                //2.3) Una vez hallado el valor del nodo próximo más grande, se debe revisar que no tenga
                // hijos, o si tiene dos repetir este proceso.

                root.right = this.remove(root.right, root.data);

            };
        };
        //Si no se retorna acá entonces ELSE jamás va a retornar el resultado.
        return root;
    };

    nextBiggerNode(root){
        let nextBiggerNode = root.data;
        while(root.left !== null){
            root = root.left;
            nextBiggerNode = root.value;
        };
        return nextBiggerNode;
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



let array = [1,2,3,4,5,6,7,8];

let tree = new Tree(array)

console.log(tree);
console.log(tree.remove(tree.root, 6));


module.exports = {sanitizeArray};