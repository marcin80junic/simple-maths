import React from "react"
import ExerciseUI from "./ExerciseUI"


const Multiplication = (props) => {

    return (
        <div className="content">
            <h2 className="center">Multiplication</h2>
            <p>
                <span className="special">Multiplication{" "}</span> is used to
                make some long addition operations shorter. As a quick example 5 + 5 + 5 
                is the same as 3 &times; 5. A good practice is to learn and understand
                a multiplication table. Don't rush it though, you need a lot of exercises to 
                consolidate your knowledge...
            </p>
            <ExerciseUI selection="Multiplication" />
        </div>

    )
}

export default Multiplication