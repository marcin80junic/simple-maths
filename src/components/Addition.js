import React, { useContext } from "react"
import { AppContext } from "../App"
import MathContainer from "./mathContent/MathContainer"
import { decorateExercise } from "./utils/utils"
import { generateAdditionExercises } from "./utils/mathsAPIs"


const Addition = ({ options }) => {

    const [ settings, constants ] = useContext(AppContext)

    console.log("==========================")
    console.log("rendering Addition")

    const restoreSession = () => {
        const exercises = sessionStorage.getItem("addition_exercises")
        return JSON.parse(exercises) || []
    }

    const saveSession = (exercises) => {
        sessionStorage.setItem("addition_exercises", JSON.stringify(exercises))
    }

    const getNewExercises = () => {
        const randomizeAnswers = settings.general.randomizeAnswers === 'true'
        const level = constants.level.indexOf(options.level) + 1
        const newExercises = generateAdditionExercises(options.count, level)
        return newExercises.map((exercise) => decorateExercise(exercise, randomizeAnswers))
    }


    return (
        <div className="content">
            <p>
                <span className="special">Addition </span>
                is like an "A" in alphabet, it's the most important mathematical operation.
                Everyone is adding when collecting things or money...
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

export default Addition