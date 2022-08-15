const {sanitizeArray, Node, Tree} = require('./index');

describe('sanitizeArray tests', () => {
    it('Removes duplicates and sorts array given', () => {
        let array = [1,1,1,5,6,7,7,7,12,-12,0];
        expect(sanitizeArray(array)).toEqual([-12, 0, 1 , 5, 6, 7, 12]);
    })
})

describe('Tree tests', () => {
    let array = [1,6,5,5,3,6,10,2,3,21,7,8,9];
    let tree = new Tree(array);

    it('When creating a tree, it should be already balanced', () => {
        expect(tree.isBalanced()).toBe('This tree is balanced.');
    });

    it('When inserting elements to the tree, it might become unbalanced', () => {
        tree.insert(tree.node, 100);
        tree.insert(tree.node, 101);
        expect(tree.isBalanced()).toBe('This tree is not balanced.')
    });

    describe('Tests for the inorder, preorder, postorder, and in level methods', () => {
        let array2 = [0,1,5,3,7,10,15,21];
        let tree2 = new Tree(array2);
        it('Should display arranged array according to inorder() method', () => {
            tree2.inOrder = tree2.inorder(tree2.root);
            expect(tree2.inOrder).toEqual([0,1,3,5,7,10,15,21]);
        });
        it('Should display arranged array according to postorder() method', () => {
            tree2.postOrder = tree2.postorder(tree2.root);
            expect(tree2.postOrder).toEqual([0, 3, 1, 7, 21, 15, 10, 5]);
        });
        it('Should display arranged array according to preorder() method', () => {
            tree2.preOrder = tree2.preorder(tree2.root);
            expect(tree2.preOrder).toEqual([5, 1, 0, 3, 10, 7, 15, 21]);
        });
        it('Should display arranged array according to inlevel() method', () => {
            tree2.inLevel = tree2.levelOrderIterative(tree2.root);
            expect(tree2.inLevel).toEqual([5, 1, 10, 0, 3, 7, 15, 21]);
        });
    });
})