const {sanitizeArray, Node, Tree} = require('./index');

describe('sanitizeArray tests', () => {
    it('Removes and sorts array given', () => {
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
})