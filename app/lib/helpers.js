const divideNumberRandomParts = (number = 100, parts = 5, min=5) => {
    const random = [];

    for (let i = 0; i < parts; i++) {
        random.push(Math.random());
    }

    const sum = random.reduce((p, c) => p + c, 0);

    const result =  random.map(r => (r / sum) * number);

    if(result.some(e => e < 5)) {
        return divideNumberRandomParts(number, parts, min);
    }

    return result;



};


module.exports = {
    divideNumberRandomParts
};