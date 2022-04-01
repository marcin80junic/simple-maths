import React from "react"
import ExerciseUI from "./ExerciseUI"


const Division = (props) => {

    return (
        <div className="content">
            <h2 className="center">Division</h2>
            <p>
                Think of <span className="special">dividing{" "}</span>as of sharing something with your
                friends. It might be hard at first but soon you will understand that sharing will make
                you and your friends happy!
            </p>
            <ExerciseUI selection="Division" />
        </div>

    )
}

export default Division