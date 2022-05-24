import React from "react"
import "../../styles/utils/columns.scss"
import Operation from "./Operation"


const OperationList = ({ exercises }) => {

    return (
        <fieldset>
            <legend className="center">Exercises</legend>
            <div className="columns">
                {exercises.map((operation) => {
                    return (
                        <Operation 
                            key={operation.id}
                            operation={operation}
                        />
                    )
                })}
            </div>
        </fieldset>
    )
}

export default OperationList