const calcWeightIndex = (weight, height)=> {
    if(weight === undefined || height === undefined) {
        throw new Error('weight and height required');
    }

    if(typeof weight !== "number" || typeof height !== "number"){
        throw new Error('weight and height must be number');
    }

    if(weight < height) {
        throw new Error('weight must be first argument');
    }

    const data = (weight / (height ** 2)).toFixed(2);

    return Number(data);
}

export default calcWeightIndex;