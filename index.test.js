const {sanitizeArray} = require('./index');

describe('sanitizeArray tests', () => {
    it('Removes and sorts array given', () => {
        let array = [1,1,1,5,6,7,7,7,12,-12,0];
        expect(sanitizeArray(array)).toEqual([-12, 0, 1 , 5, 6, 7, 12]);
    })
})