import React from "react"
import "../styles/Test.scss"


const Test = () => {

    return (
        <div className="content">
            <h2 className="center">Test</h2>
            <p>
                So its time to test your skills, if you feel confident don't hesitate any longer
                and step on the path to excellence!! To unlock the next level you need to score
                at least 75%. Ready, steady, go!
            </p>
            <div className="content-test">
                <p className="center">
                    Dear <span className="personalized special"></span>, please choose difficulty level:
                </p>
                <div className="button-ladder">
                    <button className="button3d" value={1}>Fair</button>
                    <button className="button3d" value={2} disabled={true}>Advanced</button>
                    <button className="button3d" value={3} disabled={true}>Super Hard</button>
                </div>
            </div>
        </div>
    )
}

export default Test