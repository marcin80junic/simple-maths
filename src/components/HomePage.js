import React from "react"
import "../styles/HomePage.scss"
import detective from "../media/pics/detective.png"


const HomePage = () => {

    return (
        <div className="content">
            <h1 className="center">Hello <span className="personalised special"></span>!</h1>
            <p>
                I have prepared some interactive exercises for you to practice in your free time.
                I hope they will help you to develop a logical thinking and improve your mathematical skills.
                Have fun while playing and do not forget to take a break!{" "}
                <img src={detective} alt="detective" width="35px" height="35px" />
            </p>
            <div className="content-home">
            </div>
        </div>
    )
}

export default HomePage