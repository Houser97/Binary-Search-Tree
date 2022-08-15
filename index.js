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

    insert(root = this.root, value){
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
    };

    find(root, value){
        if(root.data === value || root === null){
            return root;
        };

        if(value < root.data){
            return this.find(root.left, value);
        } else if(value > root.data){
            return this.find(root.right, value);
        };
    };

    levelOrderIterative(root, functionArg){
        let queue = [root.left, root.right];
        if(typeof functionArg === 'undefined'){
            let arrayResult = [root.data];
            while(queue.length > 0){
                if(queue[0] !== null){ //En caso de que la raíz apunte a NULL en un hijo.
                    if(queue[0].left !== null){
                        queue.push(queue[0].left);
                    };
                    if(queue[0].right !== null){
                        queue.push(queue[0].right);
                    };
                    arrayResult.push(queue.shift().data);
                } else {
                    queue.shift(); //Si el nodo es NULL, se elimina simplemente.
                };
            };
            return arrayResult;
        } else {
            let arrayResult = [];
            while(queue.length > 0){
                if(queue[0] !== null){ //En caso de que la raíz apunte a NULL en un hijo.
                    if(queue[0].left !== null){
                        queue.push(queue[0].left);
                    };
                    if(queue[0].right !== null){
                        queue.push(queue[0].right);
                    };
                    arrayResult.push(functionArg(queue.shift().data));
                } else {
                    queue.shift();
                };
            };
            return arrayResult
        };
    };

    levelOrderSecondMethod(root){
        let result = [root.data];
        let queue = [];
        let continueLoop = true;
        if(root.left !== null){
            queue.push(root.left);
        };
        if(root.right !== null){
            queue.push(root.right);
        };
        if(root.right === null && root.left === null){
            return result;
        };

        while(continueLoop){
            if(queue === false){
                continueLoop = false
            } else {
                queue.forEach(node => {
                    result.push(node.data);
                })
                queue = this.createNextQeue(queue);
            };
        };
        return result;
    };

    createNextQeue(currentQueue){
        let queue = [];
        currentQueue.forEach(node => {
            if(node.left !== null){
                queue.push(node.left);
            };
            if(node.right !== null){
                queue.push(node.right);
            };
        }); 

        if(queue.length === 0){
            return false;
        };
        return queue;
    };

    inorder(root){
        if(root === null) return null;

        let resultPrev;

        let result = [];
        resultPrev = this.inorder(root.left);
        // Pasando la línea anterior ya se llegó al caso base, por lo que en este contexto
        // se puede acceder al nodo más a la izquierda.
        if(resultPrev !== null){
            result = [...result, ...resultPrev];
        }; 
        result = [...result, root.data] // SI se coloca antes del IF anterior retorna orden PREORDER
        resultPrev = this.inorder(root.right);
        if(resultPrev !== null){
            result = [...result, ...resultPrev];
        }; 
        // Ahora se debe ir a la derecha, si es que hay algún nodo. De lo contrario, se acaba ahí
        // la función y se regresa a este contexto, en donde se puede retornar RESULT.
        return result;
    };

    preorder(root){
        if(root === null) return null;

        let result = [];
        let prevToResult;

        // Paso 1. Leer el nodo.
        result.push(root.data);

        // Paso 2. Ir hacia la izquierda.
        prevToResult = this.preorder(root.left);

            // Paso 2.1. Almacenar el valor retornado por la función si es diferente de NULL.
        if(prevToResult !== null){
            result = [...result, ...prevToResult];
        }
        
        // Paso 3. Cuando ya no hay elementos a la izquierda, o ya se leyeron, ahora ir a la derecha.
        prevToResult = this.preorder(root.right);

            // Paso 2.1. Almacenar el valor retornado por la función si es diferente de NULL.
        if(prevToResult !== null){
            result = [...result, ...prevToResult];
        }

        return result;

    };

    postorder(root){
        if(root === null) return null;

        let result = [];
        let prevToResult;

        // Paso 1. Ir hasta el nodo más a la izquierda.
        prevToResult = this.postorder(root.left);

        // Paso 1.2. Almacenar el valor retornado de la función.
        if(prevToResult !== null){
            result = [...result, ...prevToResult];
        }

        // Paso 2. Llegado al nodo más a la izquierda, ahora se va a la derecha.
        prevToResult = this.postorder(root.right);
        if(prevToResult !== null){
            result = [...result, ...prevToResult];
        }

        // Paso 3. Al ya no haber ni nodos a la izquierda o derecha, o si ya se leyeron, toca leer
        // este nodo.
        //console.log(root.data);
        result.push(root.data);

        return result;

    };

    height(root){
        if(root === null){
            return 0;
        };
        
        let heightLeft = this.height(root.left);
        let heighRight = this.height(root.right);

        if(heightLeft > heighRight) return heightLeft+1;
        else return heighRight+1;
    };

    // height2(root){
    //     if(root === null){
    //         return 0;
    //     };
        
    //     return 1 + Math.max(this.height2(root.left), this.height2(root.right));
    // }

    // height3(root){
    //     if(root === null){
    //         return -1;
    //     };
        
    //     let heightLeft = this.height(root.left);
    //     let heighRight = this.height(root.right);

    //     return Math.max(heightLeft, heighRight) + 1;
    // }

    depth(desiredeNode){
        let result = this.recursiveDepth(this.root, desiredeNode)
        if(result === 0) return 'Such node is not in the tree.'
        else return result-1;
    };

    recursiveDepth(root = this.root, node){
        if(root === null) return 0;
        if(root.data === node) return 1;

        let height = 0;

        if(height === 0){
            height = this.recursiveDepth(root.left, node);
        }
        if(height === 0){
            height = this.recursiveDepth(root.right, node);
        }

        if(height === 0){
            return 0;
        } else return height + 1;
    };

    isBalanced(){
        let heightLeft = this.height(this.root.left);
        let heightRight = this.height(this.root.right);
        
        if(heightLeft === heightRight || heightLeft + 1 === heightRight || heightRight + 1 === heightLeft){
            return 'This tree is balanced';
        }else {
            return 'This tree is not balanced';
        }
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
//console.log(tree.remove(tree.root, 6));
//console.log(tree.find(tree.root, 8));

// console.log(tree.levelOrderIterative(tree.root, function(num){
//     return num < 3;
// }) + ' Iterativo');
//console.log(tree.levelOrderSecondMethod(tree.root) + ' Recursivo');

// console.log(tree.inorder(tree.root) + ' Inorder');
// console.log(tree.preorder(tree.root) + ' Preorder');
// console.log(tree.postorder(tree.root) + ' Postorder');
// console.log(tree.height(tree.root) + ' Height');
// console.log(tree.height3(tree.root) + ' Height3');
console.log(tree.depth(4) + ' Depth');
console.log(tree.insert(this.root,10) + ' insert');
console.log(tree.insert(this.root,0) + ' insert');
console.log(tree.isBalanced() + ' Balanced');


module.exports = {sanitizeArray};