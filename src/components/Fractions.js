import React, { useContext } from "react"
import { AppContext } from "../App"
import MathContainer from "./mathContent/MathContainer"
import { decorateExercise } from "./utils/utils"
import { generateFractionsExercises } from "./utils/mathsAPIs"


const Fractions = ({ options }) => {

    const [ settings, constants ] = useContext(AppContext)

    console.log("==========================")
    console.log("rendering Fractions")

    const restoreSession = () => {
        const exercises = sessionStorage.getItem("fractions_exercises")
        return JSON.parse(exercises) || []
    }

    const saveSession = (exercises) => {
        sessionStorage.setItem("fractions_exercises", JSON.stringify(exercises))
    }

    const getNewExercises = () => {
        const randomizeAnswers = settings.general.randomizeAnswers
        const level = constants.level.indexOf(options.level) + 1
        const types = ["addition"]
        const brackets = false
        const newExercises = generateFractionsExercises(level, options.count, types, brackets)
        return newExercises.map((exercise) => decorateExercise(exercise, randomizeAnswers))
    }


    return (
        <div className="content">
            <p>
                Welcome to <span className="special">fractions!{" "}</span>
                It's the final and the most challenging part of your basic mathematical education.
                Before you start learning <span className="special">fractions{" "}</span> you
                really need to master division, multiplication, subtraction and addition.
                Well, let's get to it!
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

export default Fractions