import React, { useState, useEffect, createContext, useContext } from "react"
import "../../styles/MathContainer.scss"
import OperationList from "./OperationList"
import ControlPanel from "./ControlPanel"
import { playSound } from "../utils/utils"
import cheerSound from "../../media/sounds/cheer.mp3"
import fartSound from "../../media/sounds/fart.mp3"
import { AppContext } from "../../App"


export const OperationContext = createContext()


const MathContainer = (props) => {

    const [ settings ] = useContext(AppContext)
    const { restoreSession, saveSession, getNewExercises, options} = props
    const volume = settings.system.volume

    const restoreScore = () => {
        let score = 0
        exercises.forEach(exercise => {
            if (exercise.checked && exercise.result) score++
        })
        return score
    }

    const [exercises, setExercises] = useState(restoreSession())
    const [score, setScore] = useState(restoreScore())
 

    const handleAnswerChange = (id, value, inputId) => {
        if (value.length > 3) return
        let temp = value
        setExercises(
            exercises.map(operation => {
                if (operation.id === id) {
                    if (inputId || inputId === 0) {  // fraction case
                        temp = operation.answerValue
                        temp[inputId] = value
                    }
                    return {
                        ...operation,
                        answerValue: temp,
                        checked: false,
                    }
                }
                return operation
            })
        )
    }

    const checkExercise = (exercise) => {
        let result = false
        if (Array.isArray(exercise.answerValue)) {
            const answer = parseInt(exercise.answerValue[0]) / parseInt(exercise.answerValue[1])
            const correct = exercise.values[exercise.answerIndex][0] / exercise.values[exercise.answerIndex][1]
            result = (answer === correct)
        } else {
            if (exercise.values[exercise.answerIndex] === parseInt(exercise.answerValue)) {
                result = true
            }
        }
        return {
            ...exercise,
            checked: true,
            result
        }
    }

    const handleSubmit = (id) => {
        let temp = 0
        setExercises(
            exercises.map(exercise => {
                if (exercise.id === id) {
                    exercise = checkExercise(exercise)
                    if (exercise.result) {
                        temp = 1
                        playSound(cheerSound, volume)
                    }
                    setScore(score + temp)
                }
                return exercise
            })
        )
    }

    const handleSubmitAll = () => {
        let temp = 0
        setExercises(
            exercises.map(exercise => {
                if (!exercise.checked) {
                    exercise = checkExercise(exercise)
                    if (exercise.result) temp++
                }
                return exercise
            })
        )
        if ((score + temp) === exercises.length) {
            playSound(cheerSound, volume)
        } else {
            playSound(fartSound, volume)
        }
        setScore(score + temp)
    }

    const resetExercises = () => {
        setExercises(
            exercises.map(exercise => {
                return {
                    ...exercise,
                    answerValue: "",
                    checked: false,
                    result: false
                }
            })
        )
        setScore(0)
    }

    const handleChangeExercises = () => {
        setExercises([])
        setScore(0)
    }


    useEffect(() => {
        if (!exercises || exercises.length === 0) {
            setExercises(getNewExercises())
        } else {
            saveSession(exercises)
        }
    }, [exercises, getNewExercises, saveSession])


    return (
        <OperationContext.Provider value={[handleAnswerChange, handleSubmit]}>

            <ControlPanel
                options={options}
                score={score}
                handleChangeExercises={handleChangeExercises}
            />

            {
                (exercises && exercises.length > 0) ?
                    <OperationList exercises={exercises} />
                    : <div>exercises are getting ready... </div>
            }

            <div className="interface-buttons">
                <button
                    type="reset"
                    className="button3d button3d-flat form-input"
                    onClick={resetExercises}
                >Clear</button>
                <button
                    type="submit"
                    className="button3d button3d-flat form-input"
                    onClick={handleChangeExercises}
                >Reload</button>
                <button
                    type="submit"
                    className="button3d button3d-flat form-input"
                    onClick={handleSubmitAll}
                >Check All</button>
            </div>

        </OperationContext.Provider>
    )
}

export default MathContainer