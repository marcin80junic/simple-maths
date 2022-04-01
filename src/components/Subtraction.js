import React from "react"
import ExerciseUI from "./ExerciseUI"


const Subtraction = (props) => {

    return (
        <div className="content">
            <h2 className="center">Subtraction</h2>
            <p>
                <span className="special">Subtracting{" "}</span>
                is a little bit more difficult but you should learn it quickly.
                It may not feel as natural as adding but you need to master it so you can
                calculate your due change while shopping with cash.
            </p>
            <ExerciseUI selection="Subtraction" />
        </div>

    )
}

export default Subtraction