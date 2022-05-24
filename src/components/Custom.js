import React, { useContext } from "react"
import { AppContext } from "../App"
import MathContainer from "./mathContent/MathContainer"
import { decorateExercise } from "./utils/utils"
import { generateCustomExercises } from "./utils/mathsAPIs"


const Custom = ({ options }) => {

    const [ settings, constants ] = useContext(AppContext)

    console.log("==========================")
    console.log("rendering Custom")

    const restoreSession = () => {
        const exercises = sessionStorage.getItem("custom_exercises")
        return JSON.parse(exercises) || []
    }

    const saveSession = (exercises) => {
        sessionStorage.setItem("custom_exercises", JSON.stringify(exercises))
    }

    const getNewExercises = () => {
        const randomizeAnswers = settings.general.randomizeAnswers
        const level = constants.level.indexOf(options.level) + 1
        const types = ["addition", "subtraction"]
        const brackets = false
        const newExercises = generateCustomExercises(level, options.count, types, brackets)
        return newExercises.map((exercise) => decorateExercise(exercise, randomizeAnswers))
    }


    return (
        <div className="content">
            <p>
                If you mastered all mathematical operations and you are still eager for new
                challenges you are in a right spot! In Custom section you can mix and match
                everything you learnt so far... enough talking, get to it!
            </p>
            <MathContainer
                restoreSession={restoreSession}
                saveSession={saveSession}
                getNewExercises={getNewExercises}
                options={options}
            />
        </div>
    )

}

export default Custom