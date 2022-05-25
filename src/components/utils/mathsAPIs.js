import { 
    arrayContains,
    divisors,
    randomValue, 
    range,
    reduceFraction
} from "./mathsUtils"


const ADDITION_SIGN = "+"
const SUBTRACTION_SIGN = "-"
const MULTIPLICATION_SIGN = "\u00D7"
const DIVISION_SIGN = "\u00F7"
const EQUALS_SIGN = "="


export const generateAdditionExercises = (count, level) => {
    return generateExercises(count, level, [ADDITION_SIGN])
}

export const generateSubtractionExercises = (count, level) => {
    return generateExercises(count, level, [SUBTRACTION_SIGN])
}

export const generateMultiplicationExercises = (count, level) => {
    return generateExercises(count, level, [MULTIPLICATION_SIGN])
}

export const generateDivisionExercises = (count, level) => {
    return generateExercises(count, level, [DIVISION_SIGN])
}

export const generateFractionsExercises = (count, level, types, brackets) => {
    const signs = types.map(type => determineSign(type))
    return generateExercises(count, level, signs, true, brackets)
}

export const generateCustomExercises = (count, level, types, brackets) => {
    const signs = types.map(type => determineSign(type))
    return generateExercises(count, level, signs, false, brackets)
}


const determineSign = (type) => {
    switch (type.toLowerCase()) {
        case "addition": return ADDITION_SIGN
        case "subtraction": return SUBTRACTION_SIGN
        case "multiplication": return MULTIPLICATION_SIGN
        case "division": return DIVISION_SIGN
        default: console.error("not recocnized operation type: ", type)
    }
}

const generateExercises = (count, level, signs, isFraction) => {
    
    const exercises = []
    let counter = 0,
        temp

    for (let i = 0; i < count; i++) {
        if (counter++ > 30) {
            console.log("infinite loop ", exercises)
            break
        }
        temp = generateOperation(level, signs, isFraction)
        if (arrayContains(exercises, temp)) {
            i--
        } else {
            exercises.push(temp)
        }
    }
    console.log("EXERCISES: ", exercises)
    return exercises
}

const generateOperation = (level, signs, isFraction) => {
    const operation = []
    const length = range(2, level + 1)
    const multipleSigns = signs.length > 1
    let sign = signs[0]
    let number
    let total = 0

    for (let i = 0; i < length; i++) {
        if (multipleSigns) {
            sign = randomValue(signs)
        }
        if (isFraction) {
            number = getFraction(level, sign, total)
            total = reduceFractions(total, number, sign)
        } else {
            switch (sign) {
                case ADDITION_SIGN:
                    number = getAdditionNumber(level, total)
                    total += number
                    break
                case SUBTRACTION_SIGN:
                    number = getSubtractionNumber(level, total)
                    total = (i === 0) ? number : total - number
                    break
                case MULTIPLICATION_SIGN:
                    number = getMultiplicationNumber(level, total)
                    total = (i === 0) ? number : total * number
                    break
                case DIVISION_SIGN:
                    number = getDivisionNumber(level, total)
                    total = (i === 0) ? number : total / number
                    break
                default: console.err("not recognized operation sign: ", sign)
            }
        }
        if (i === 0) {
            operation.push(number)
        } else {
            operation.push(sign, number)
        }
    }
    operation.push(EQUALS_SIGN, total)
    return operation
}

const getAdditionNumber = (level, subtotal) => {
    return range(2*level, 9*level)
}

const getSubtractionNumber = (level, subtotal) => {
    if (subtotal === 0) {
        return range(4*level, 10*level)
    }
    return range(2, subtotal - 1)
}

const getMultiplicationNumber = (level, subtotal) => {
    return range(2*level, 9*level)
}

const getDivisionNumber = (level, subtotal) => {
    if (subtotal === 0) {
        let num = range(4*level, 10*level, true)
        return num
    }
    const divs = divisors(subtotal)
    return randomValue(divs)
}

const getFraction = (level, sign, subtotal) => {
    return [1, 2]
}

const reduceFractions = (prev, next, sign) => {
    let numerator, denominator
    if (prev === 0) {
        return next
    }
    switch (sign) {
        case ADDITION_SIGN:
            numerator = prev[0] * next[1] + next[0] * prev[1]
            denominator = prev[1] * next[1]
            break
        case SUBTRACTION_SIGN:
            numerator = prev[0] * next[1] - next[0] * prev[1]
            denominator = prev[1] * next[1]
            break
        case MULTIPLICATION_SIGN:
            numerator = prev[0] * next[0]
            denominator = prev[1] * next[1]
            break
        case DIVISION_SIGN:
            numerator = prev[0] * next[1]
            denominator = prev[1] * next[0]
            break
        default: throw new Error("not recognized operation sign:", sign)
    }
    return reduceFraction(numerator, denominator)
}