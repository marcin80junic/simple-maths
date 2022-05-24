import React, { useContext } from "react"
import "../../styles/utils/form-input.scss"
import "../../styles/utils/button3d.scss"
import questionMark from "../../media/pics/question.png"
import tick from "../../media/pics/correct.png"
import cross from "../../media/pics/wrong.png"
import { v4 as uuidv4 } from "uuid"
import { OperationContext } from "./MathContainer"


const Operation = ({ operation }) => {
    
    const [handleAnswerChange, handleSubmit] = useContext(OperationContext)

    const handleKeyDown = event => {
        switch(event.key) {
            case "Enter": handleSubmit(operation.id)
                break
            case "Escape": event.target.blur()
                break
            default: handleAnswerChange(operation.id, event.target.value)
        }
    }
    
    const getIcon = () => {
        return (
            operation.checked ?
                operation.result ? tick : cross
                : questionMark
        )
    }

    const getInputStyle = () => {
        if (operation.checked && !operation.result) {
            return {
                border: "2px solid red"
            }
        }
    }

    const getButtonStyle = () => {
        const visible = operation.result? "hidden" : "visible"
        return {
            visibility: visible
        }
    }


    return (
        <div className="columns-line-operation">

            {
                operation.values.map((val, index) => {
                    return (!operation.result && index === operation.answerIndex) ?
                        <input
                            key={operation.id}
                            type="number"
                            className="form-input"
                            style={getInputStyle()}
                            value={operation.answerValue}
                            onChange={handleKeyDown}
                            onKeyDown={handleKeyDown}
                        />
                        : <div key={uuidv4()}>{val}</div>
                })
            }

            <img src={getIcon()} alt="state" />

            <button
                className="button3d button3d-flat form-input"
                style={getButtonStyle()}
                onClick={() => handleSubmit(operation.id)}
            >check</button>

        </div>

    )

}

export default Operation