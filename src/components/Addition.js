import React from "react"
import ExerciseUI from "./ExerciseUI"


const Addition = (props) => {

    return (
        <div className="content">
            <h2 className="center">Addition</h2>
            <p>
                <span className="special">Addition </span>
                is like "A" in alphabet, it's the most important mathematical operation.
                Everyone is adding when collecting things or money...
            </p>
            <ExerciseUI selection="Addition" />
        </div>
    )
}

export default Addition