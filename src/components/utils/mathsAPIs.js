import { arrayContains, divisors, randomValue, range } from "./mathsUtils"


const ADDITION_SIGN = "+"
const SUBTRACTION_SIGN = "-"
const MULTIPLICATION_SIGN = "\u00D7"
const DIVISION_SIGN = "\u00F7"
const EQUALS_SIGN = "="


export const generateAdditionExercises = (level, count) => {
    return generateExercises(level, count, [ADDITION_SIGN])
}

export const generateSubtractionExercises = (level, count) => {
    return generateExercises(level, count, [SUBTRACTION_SIGN])
}

export const generateMultiplicationExercises = (level, count) => {
    return generateExercises(level, count, [MULTIPLICATION_SIGN])
}

export const generateDivisionExercises = (level, count) => {
    return generateExercises(level, count, [DIVISION_SIGN])
}

export const generateFractionsExercises = (level, count, types, brackets) => {
    const signs = types.map(type => determineSign(type))
    return generateExercises(level, count, signs, brackets)
}

export const generateCustomExercises = (level, count, types, brackets) => {
    const signs = types.map(type => determineSign(type))
    return generateExercises(level, count, signs, brackets)
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

const generateExercises = (level, count, signs, brackets) => {
    let exercises = [],
        temp,
        counter = 0
    for (let i = 0; i < count; i++) {
        if (counter++ > 30) {
            console.log("infinite loop ", exercises)
            break
        }
        temp = generateOperation(level, signs)
        if (!arrayContains(exercises, temp)) {
            exercises.push(temp)
            continue
        }
        i--
    }
 //   console.log("EXERCISES: ", exercises)
    return exercises
}

const generateOperation = (level, signs) => {
    const operation = []
    const length = range(2, level + 1)
    const multipleSigns = signs.length > 1
    let sign = signs[0]
    let number
    let total = 0

    for (let i=0; i<length; i++) {
        if (multipleSigns) {
            sign = randomValue(signs)
        }
        switch(sign) {
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
                total = (i === 0)? number : total * number
                break
            case DIVISION_SIGN:
                number = getDivisionNumber(level, total)
                total = (i === 0)? number : total / number
                break
            default: console.err("not recognized operation sign: ", sign)
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