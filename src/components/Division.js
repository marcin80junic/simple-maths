import React, { useContext } from "react"
import { AppContext } from "../App"
import MathContainer from "./mathContent/MathContainer"
import { decorateExercise } from "./utils/utils"
import { generateDivisionExercises } from "./utils/mathsAPIs"


const Division = ({ options }) => {

    const [ settings, constants ] = useContext(AppContext)

    console.log("==========================")
    console.log("rendering Division")

    const restoreSession = () => {
        const exercises = sessionStorage.getItem("division_exercises")
        return JSON.parse(exercises) || []
    }

    const saveSession = (exercises) => {
        sessionStorage.setItem("division_exercises", JSON.stringify(exercises))
    }

    const getNewExercises = () => {
        const randomizeAnswers = settings.general.randomizeAnswers
        const level = constants.level.indexOf(options.level) + 1
        const newExercises = generateDivisionExercises(level, options.count)
        return newExercises.map((exercise) => decorateExercise(exercise, randomizeAnswers))
    }


    return (
        <div className="content">
            <p>
                Think of <span className="special">dividing{" "}</span>as of sharing something with your
                friends. It might be hard at first but soon you will understand that sharing will make
                you and your friends happy!
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

export default Division