import { v4 as uuidv4 } from "uuid"


const getAnswerIndex = (length, random) => {
    if (random) {
        const number = Math.ceil(length / 2)
        const result = Math.round(Math.random() * (number - 1) + 1)
        return result * 2 - 2
    } 
    return length - 1
}

export const decorateExercise = (exercise, random) => {
    return {
        id: uuidv4(),
        values: [...exercise],
        answerIndex: getAnswerIndex(exercise.length, random),
        answerValue: "",
        checked: false,
        result: null
    }
}

export const playSound = (url, volume) => {
    if (volume > 0) {
        const sound = new Audio(url)
        sound.volume = volume / 100
        sound.play()
    }
}