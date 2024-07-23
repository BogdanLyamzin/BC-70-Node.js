import calcWeightIndex from "./calcWeightIndex.js";

/*
1. Given weight in kg and height in metr.
2. Return (weight / (height * height)) round 2.
3. if given invalid data throw error with correct message.

90, 1.9 => 24.93
1.9, 90 => error 'weight must be first argument'
90 => error 'weight and height required'
'90', '1.9' => error 'weight and height must be number'
*/

describe("test calcWeightIndex function", ()=> {
    test("90, 1.9 => 24.93", ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);
        /*
        const expext = result => {
            return {
                result,
                toBe(value) {
                    return value === this.result;
                }
            }
        }
        */
    })

    test("1.9, 90 => error 'weight must be first argument'", ()=> {
        expect(() => calcWeightIndex(1.9, 90)).toThrow('weight must be first argument');
    })

    test("90 => error 'weight and height required'", ()=> {
        expect(() => calcWeightIndex(90)).toThrow('weight and height required');
    })

    it("'90', '1.9' => error 'weight and height must be number'", ()=> {
        expect(() => calcWeightIndex('90', '1.9')).toThrow('weight and height must be number');
    })
})