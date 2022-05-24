
/*
    returns true if array (first argument) contains an element (second argument) even if an argument
    is an array itself
*/
export const arrayContains = (array, element) => {
    element = JSON.stringify(element)
    for (let i=0; i<array.length; i++) {
        if (JSON.stringify(array[i]) === element) {
            return true
        }
    }
    return false
}

/*
  takes an array and returns its one random element
*/
export const randomValue = (array) => {
    if (array.length === 0) {
        return undefined;
    }
    let chance = 1 / array.length;
    return array[Math.floor(Math.random() / chance)];
}

/*
  divisors method takes number and returns its divisors NOT including 1 and number itself
*/
export const divisors = (number) => {
    const divArray = [];
    if (number <= 1) {
        return divArray;
    }
    for (let i = 2; i < number / 2 + 1; i++) {
        if (number % i === 0) {
            divArray.push(i);
        }
    }
    return divArray;
}

/*
    returns true if its argument is a prime number
*/
const isPrime = (num) => {
    if (num > 0 && num < 4) {
        return true;
    }
    for (let i = 4; i <= num / 2; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

/*
  By default range method returns random integer number between min and max (including) values.
  If max is < than min NaN will be returned.
 
  Optional boolean excludePrimes passed to the method ensures that returned number will not
  be a prime number. If excludePrimes is provided and its value is true, there should be some
  not-prime numbers between min and max parameters, otherwise the NaN value will be returned.
 
  It is possible to provide an array of numbers as the fourth argument, in which case the randomly
  chosen number from this array will be returned instead. Only numbers between min and max parameters
  can be returned. In case when there is no number in range or the array is empty the NaN will be 
  returned.
*/
export const range = (min, max, excludePrimes, optArray) => {
    min = Math.floor(min)
    max = Math.floor(max)
    const temp = []
    let random

    if (min > max) {  // exclude abnormal case
        return NaN;
    }

    if (excludePrimes) {
        if (max < 4) {  // nums 1-3 are primes
            return NaN;
        }
        if (optArray) {
            for (const num of optArray) {
                if (!isPrime(num) && (num >= min) && (num <= max)) {
                    temp.push(num);
                }
            }
            /* return random number matching above conditions or NaN if no numbers left */
            return (temp.length === 0) ? NaN : randomValue(temp);
        }
        /* case when excludePrimes is true and no optional array provided */
        if (max - min > 0) {  // making sure there will be a not-prime number in range
            while (true) {
                random = Math.floor(Math.random() * (max - min + 1) + min);
                if (!isPrime(random)) {
                    return random;
                }
            }
        }
        return isPrime(min) ? NaN : min;   // case when min === max
    }

    /* if excludesPrime is false and optArray is provided */
    if (optArray) {
        for (const num of optArray) {
            if ((num >= min) && (num <= max)) {
                temp.push(num);
            }
        }
        return (temp.length === 0) ? NaN : randomValue(temp);
    }

    /* simple case when min and max parameters are in order and no optional parameters are provided*/
    return random = Math.floor(Math.random() * (max - min + 1) + min);
}



/* 
  Reduce method takes whole operation array and returns its total result.
  It is using a reducer method (see below) to get sub totals of each operation.
  Every second index (starting at 1) should be an operation sign.
  The valid operation signs are MathOperation constants: ADDITION_SIGN, SUBTRACTION_SIGN,
  MULTIPLICATION_SIGN and DIVISION_SIGN.
*/
const reduce = (array) => {
    let total = array[0];
    const size = array.length,
        isFraction = (array[0].length > 1);

    if (array.length < 3) {
        return isFraction ?
            array[0][0] / array[0][1]
            : array[0];
    }
    for (let i = 2; i < size; i += 2) {
        total = reducer(total, array[i], array[i - 1], isFraction);
    }
    return total;
}
/*
  Reduces single operation. 
*/
const reducer = (prev, curr, sign, isFraction) => {

    const reduceFraction = (num, den) => {
        let x = num, y = den, temp;
        while (y) {  // find greatest common divisor
            temp = y;
            y = x % y;
            x = temp;
        }
        return [num / x, den / x];
    },
        addFraction = () => {
            let num = prev[0] * curr[1] + curr[0] * prev[1],
                den = prev[1] * curr[1];
            return reduceFraction(num, den);
        },
        subtrFraction = () => {
            let num = prev[0] * curr[1] - curr[0] * prev[1],
                den = prev[1] * curr[1];
            return reduceFraction(num, den);
        },
        multiplyFraction = () => {
            let num = prev[0] * curr[0],
                den = prev[1] * curr[1];
            return reduceFraction(num, den);
        },
        divideFraction = () => {
            let num = prev[0] * curr[1],
                den = prev[1] * curr[0];
            return reduceFraction(num, den);
        };

    switch (sign) {
        case "+":
            return isFraction ?
                addFraction()
                : prev + curr;
        case "-":
            return isFraction ?
                subtrFraction()
                : prev - curr;
        case "":
            return isFraction ?
                multiplyFraction()
                : prev * curr;
        case "":
            return isFraction ?
                divideFraction()
                : prev / curr;
        default:
            throw new Error('unrecognized operation sign character');
    }
}