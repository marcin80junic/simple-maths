import React from "react"


const Radio = (props) => {

    const stringToBool = (value) => {
        return value === 'true' ? true : false
    }

    return (
        <>
            <label className="interactive">Yes
                <input 
                    type="radio"
                    name={props.name}
                    value="true"
                    checked={stringToBool(props.checked)}
                    onChange={(e) => props.handleChange("general", e)}
                />
            </label>
            &nbsp;&nbsp;
            <label className="interactive">No
                <input
                    type="radio" 
                    name={props.name} 
                    value="false" 
                    checked={!stringToBool(props.checked)}
                    onChange={(e) => props.handleChange("general", e)}
                />
            </label>
        </>
    )

}

export default Radio