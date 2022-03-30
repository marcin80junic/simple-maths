import React from "react"
import ExerciseContent from "./ExerciseContent"


const ExerciseUI = (props) => {

    return (
        <div className="content">
            ExerciseUI {props.selection}
            <ExerciseContent selection={props.selection} />
        </div>
    )
}

export default ExerciseUI