import React from "react"
import ExerciseUI from "./ExerciseUI"


const Fractions = (props) => {

    return (
        <div className="content">
            <h2 className="center">Fractions</h2>
            <p>
                Welcome to <span className="special">fractions!{" "}</span>
                It's the final and the most challenging part of your basic mathematical education.
                Before you start learning <span className="special">fractions{" "}</span> you
                really need to master division, multiplication, subtraction and addition.
                Well, let's get to it!
            </p>
            <ExerciseUI selection="Fractions" />
        </div>

    )
}

export default Fractions