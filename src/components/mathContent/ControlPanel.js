import React, { useContext } from "react"
import { v4 as uuidv4 } from "uuid"
import { AppContext } from "../../App"


const ControlPanel = ( {options, score, handleChangeExercises} ) => {

    const [settings, constants, dispatchOptions] = useContext(AppContext)

    const createSelectBox = (optionType, defaultValue, actionType) => {
        const optionsList = constants[optionType]
        if(!defaultValue) {
            defaultValue = optionsList[0]
        }
        return (
            <select 
                className="form-input"
                name={optionType}
                value={defaultValue}
                onChange={
                    (event) => {
                        const newValue = event.target.value
                        if (newValue !== defaultValue) {
                            handleChangeExercises()
                            dispatchOptions({type: actionType, value: newValue})
                        }
                    }
                }
            >
                { optionsList.map((option) => <option key={uuidv4()}> {option} </option>) }
            </select>
        )
    }

    return (
        <fieldset className="interface">
            <legend className="center">Control Panel</legend>
            <div className="interface-item">
                <label>Difficulty:</label>
                {createSelectBox("level", options.level, "UPDATE_LEVEL")}
            </div>
            <div className="interface-item">
                <label>How many exercises?</label>
                {createSelectBox("count", options.count, "UPDATE_COUNT")}
            </div>
            <div className="interface-item-score">
                <div>Your Score:</div>
                <div>
                    <div> {score} </div>
                    <div>/</div>
                    <div> {options.count} </div>
                </div>
            </div>
        </fieldset>
    )

}

export default ControlPanel