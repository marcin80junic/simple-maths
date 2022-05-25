import React, { useContext } from "react"
import "../../styles/utils/form-input.scss"
import "../../styles/utils/button3d.scss"
import "../../styles/utils/fraction.scss"
import questionMark from "../../media/pics/question.png"
import tick from "../../media/pics/correct.png"
import cross from "../../media/pics/wrong.png"
import { v4 as uuidv4 } from "uuid"
import { OperationContext } from "./MathContainer"


const Operation = ({ operation }) => {
    
    const [handleAnswerChange, handleSubmit] = useContext(OperationContext)

    const getFractionLayout = (val, isAnswer) => {
        return (
            isAnswer ?
                <div className="fraction" key={operation.id}>
                    <div className="fraction-unit">
                        <div className="numerator">{getInput(operation.answerValue[0], 0)}</div>
                        <div className="denominator">{getInput(operation.answerValue[1], 1)}</div>
                    </div>
                </div>
                : <div className="fraction" key={uuidv4()}>
                    <div className="fraction-unit">
                        <div className="numerator">{val[0]}</div>
                        <div className="denominator">{val[1]}</div>
                    </div>
                </div>
        )
    }

    const getWholeNumberLayout = (val, isAnswer) => {
        return isAnswer ?
            getInput(operation.answerValue)
            : <div key={uuidv4()}>{val}</div>
    }

    const getInput = (value, inputId) => {
        const id = (inputId || inputId === 0) ? operation.id + inputId : operation.id
        return (
            <input
                key={id}
                type="number"
                className="form-input"
                style={getInputStyle()}
                value={value}
                onChange={(e) => handleKeyDown(e, inputId)}
                onKeyDown={(e) => handleKeyDown(e, inputId)}
            />
        )
    }

    const getInputStyle = () => {
        if (operation.checked && !operation.result) {
            return {
                border: "2px solid red"
            }
        }
    }
    
    const getIcon = () => {
        return (
            operation.checked ?
                operation.result ? tick : cross
                : questionMark
        )
    }

    const getButtonStyle = () => {
        const visible = operation.result? "hidden" : "visible"
        return {
            visibility: visible
        }
    }

    const handleKeyDown = (event, inputId) => {
        switch(event.key) {
            case "Enter": handleSubmit(operation.id)
                break
            case "Escape": event.target.blur()
                break
            default: handleAnswerChange(operation.id, event.target.value, inputId)
        }
    }


    return (
        <div className="columns-line-operation">

            {
                operation.values.map((val, index) => {
                    const isAnswer = (!operation.result && index === operation.answerIndex)
                    return Array.isArray(val) ?
                        getFractionLayout(val, isAnswer)
                        : getWholeNumberLayout(val, isAnswer)
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