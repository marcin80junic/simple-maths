import React, { useContext } from "react"
import "../styles/Settings.scss"
import "../styles/utils/form-input.scss"
import speaker0 from "../media/pics/speaker-mute.png"
import speaker1 from "../media/pics/speaker-low.png"
import speaker2 from "../media/pics/speaker-medium.png"
import speaker3 from "../media/pics/speaker-high.png"
import soundURL from "../media/sounds/fart.mp3"
import Radio from "./formElements/Radio"
import { AppContext } from "../App"
import { playSound } from "./utils/utils"


const Settings = ({handleSettingsChange}) => {

    const [settings] = useContext(AppContext)

    const setSpeakerIcon = () => {
        const volume = parseInt(settings.system.volume, 10)
        if (settings.system.mute || volume === 0) return speaker0
        else if (volume > 0 && volume <= 33) return speaker1
        else if (volume > 33 && volume <= 66) return speaker2
        else return speaker3
    }


    return (
        <div className="content">
            <h2 className="center">Settings</h2>
            <p>
                You can adjust any of the settings below.
                Remember no changes will take effect unless you click
                <span className="special"> "Apply" </span>button at the bottom right!
            </p>
            <div>

                <fieldset>
                    <legend className="center">System</legend>
                    <div className="settings-line">
                        <label>Volume:</label>
                        <div className="single-line">
                            <span>
                                {settings.system.volume}%
                            </span>
                            <input 
                                type="range"
                                min="0" max="100"
                                name="volume"
                                value={settings.system.volume}
                                onChange={(e) => handleSettingsChange("system", e)}
                                onMouseUp={(e) => playSound(soundURL, e.target.value)}
                            />
                            <img 
                                className="interactive"
                                src={setSpeakerIcon()}
                                alt="speaker"
                                name="mute"
                                onClick={(e) => handleSettingsChange("system", e)}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend className="center">General</legend>
                    <div className="settings-line">
                        <label>Randomize answer fields:</label>
                        <div className="single-line">
                            <Radio
                                name="randomizeAnswers"
                                checked={settings.general.randomizeAnswers}
                                handleChange={handleSettingsChange}
                            />
                        </div>
                    </div>
                    <div className="settings-line">
                        <label>Show tooltips:</label>
                        <div className="single-line">
                            <Radio 
                                name="showTooltips"
                                checked={settings.general.showTooltips}
                                handleChange={handleSettingsChange}
                            />
                        </div>
                    </div>
                </fieldset> 
            </div>
        </div>
    )
}

export default Settings