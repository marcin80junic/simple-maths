import React, { useContext } from "react"
import { AppContext } from "../App"
import MathContainer from "./mathContent/MathContainer"
import { decorateExercise } from "./utils/utils"
import { generateSubtractionExercises } from "./utils/mathsAPIs"


const Subtraction = ({ options }) => {

    const [ settings, constants ] = useContext(AppContext)

    console.log("==========================")
    console.log("rendering Subtraction")

    const restoreSession = () => {
        const exercises = sessionStorage.getItem("subtraction_exercises")
        return JSON.parse(exercises) || []
    }

    const saveSession = (exercises) => {
        sessionStorage.setItem("subtraction_exercises", JSON.stringify(exercises))
    }

    const getNewExercises = () => {
        const randomizeAnswers = settings.general.randomizeAnswers === 'true'
        const level = constants.level.indexOf(options.level) + 1
        const newExercises = generateSubtractionExercises(options.count, level)
        return newExercises.map((exercise) => decorateExercise(exercise, randomizeAnswers))
    }


    return (
        <div className="content">
            <p>
                <span className="special">Subtracting{" "}</span>
                is a little bit more difficult but you should learn it quickly.
                It may not feel as natural as adding but you need to master it so you can
                calculate your due change while shopping with cash.
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

export default Subtraction