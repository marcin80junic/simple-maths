import React, { useContext } from "react"
import { AppContext } from "../App"
import MathContainer from "./mathContent/MathContainer"
import { decorateExercise } from "./utils/utils"
import { generateMultiplicationExercises } from "./utils/mathsAPIs"


const Multiplication = ({ options }) => {

    const [ settings, constants ] = useContext(AppContext)

    console.log("==========================")
    console.log("rendering Multiplication")

    const restoreSession = () => {
        const exercises = sessionStorage.getItem("multiplication_exercises")
        return JSON.parse(exercises) || []
    }

    const saveSession = (exercises) => {
        sessionStorage.setItem("multiplication_exercises", JSON.stringify(exercises))
    }

    const getNewExercises = () => {
        const randomizeAnswers = settings.general.randomizeAnswers === 'true'
        const level = constants.level.indexOf(options.level) + 1
        const newExercises = generateMultiplicationExercises(options.count, level)
        return newExercises.map((exercise) => decorateExercise(exercise, randomizeAnswers))
    }


    return (
        <div className="content">
            <p>
                <span className="special">Multiplication{" "}</span> is used to
                make some long addition operations shorter. As a quick example 5 + 5 + 5
                is the same as 3 &times; 5. A good practice is to learn and understand
                a multiplication table. Don't rush it though, you need a lot of exercises to
                consolidate your knowledge...
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

export default Multiplication